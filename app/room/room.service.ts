import { ICreateRoomRequest, IRoom } from './room.dto';
import { UserRepository } from '../user/user.repository';
import { In } from 'typeorm';
import { RoomRepository } from './room.repository';
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
