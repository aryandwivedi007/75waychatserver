import { IUser } from './user.dto';
import { UserRepository } from './user.repository';

export const createUser = async (data: IUser) => {
  const user = await UserRepository.create(data);
  user.active = true;
  return await UserRepository.save(user);
};
