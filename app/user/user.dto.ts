// import { BaseSchema } from "../common/dto/base.dto";

import { Role } from '../common/dto/role';

export interface IUser {
  userName: string;
  email: string;
  active?: boolean;
  role: Role;
  password: string;
}
