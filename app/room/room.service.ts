import { ICreateRoomRequest, IRoom, IRoomInvitePayload, IUpdateRoomRequest } from './room.dto';
import { UserRepository } from '../user/user.repository';
import { In } from 'typeorm';
import { RoomRepository } from './room.repository';
import createHttpError from 'http-errors';
import * as invitationService from '../common/jwt/invite.token.service';
export const createRoom = async (data: ICreateRoomRequest) => {
  const adminUser = await UserRepository.findOne({
    where: { _id: data.createdBy },
  });
  if (!adminUser) {
    throw new Error('No User found with this id');
  }
  const members = await UserRepository.findBy({
    _id: In(data.members),
  });

  if (!members || members.length === 0) {
    throw new Error('No members found.');
  }

  members.push(adminUser);

  const newRoom = RoomRepository.create({
    name: data.name,
    isPrivate: data.isPrivate,
    createdBy: adminUser,
    members,
  });

  return await RoomRepository.save(newRoom);
};

export const getRoomById = async (roomId: string) => {
  const room = await RoomRepository.findOne({ where: { _id: roomId } });
  return room;
};

export const editRoomById = async (roomId: string, data: IUpdateRoomRequest) => {
  const room = await RoomRepository.findOne({ where: { _id: roomId } });
  Object.assign(room, data);
  return await RoomRepository.save(room);
};

export const updateRoomMembers = async (
  roomId: string,
  members: string[],
  action: 'add' | 'remove'
) => {
  const room = await RoomRepository.findOne({
    where: { _id: roomId },
    relations: ['members'],
  });

  const usersToUpdate = await UserRepository.findBy({ _id: In(members) });

  if (action === 'add') {
    room.members = Array.from(new Set([...room.members, ...usersToUpdate]));
  } else if (action === 'remove') {
    const removeUserIds = new Set(usersToUpdate.map((user) => user._id));
    room.members = room.members.filter((member) => !removeUserIds.has(member._id));
  }

  return await RoomRepository.save(room);
};

export const getAllMembersOfAGroupForUser = async (roomId: string) => {
  const room = await RoomRepository.findOne({
    where: { _id: roomId },
    relations: ['members'],
  });
  return room?.members;
};

export const sendGroupInvitationLink = async (data: IRoomInvitePayload) => {
  const user = await UserRepository.findOne({
    where: { _id: data.userId },
    relations: ['createdRooms'],
  });
  const room = await RoomRepository.findOne({
    where: { _id: data.roomId },
    relations: ['members'],
  });
  const toBeInvitedUser = await UserRepository.findOne({ where: { _id: data.toBeInvitedId } });

  const isAdmin = user.createdRooms.some((r) => r._id === room._id);
  if (!isAdmin) {
    throw createHttpError(403, 'User does not have admin roles to send invitation');
  }

  const isAlreadyMember = room.members.some((member) => member._id === toBeInvitedUser._id);
  if (isAlreadyMember) {
    throw createHttpError(403, 'User is already a member of this group');
  } else {
    const invitationLink = invitationService.generateInviteLink(data.roomId, data.toBeInvitedId);
    return invitationLink;
  }
};

export const handleRoomInviteRequest = async (roomId: string, token: string) => {
  if (!roomId) {
    throw createHttpError(401, 'Room Id is null');
  }
  const decodedToken = invitationService.verifyInviteToken(token);
  if (decodedToken.roomId !== roomId) {
    throw createHttpError(401, 'Invalid Room Id');
  }
  const userId = decodedToken.toBeInvitedId;
  const user = await UserRepository.findOne({ where: { _id: userId } });
  if (!user) {
    throw createHttpError(400, 'User with given id does not exists');
  }
  const room = await RoomRepository.findOne({ where: { _id: roomId }, relations: ['members'] });
  if (!room) {
    throw createHttpError(400, 'Room with given id does not exists');
  }

  room.members.push(user);

  return await RoomRepository.save(room);
};
