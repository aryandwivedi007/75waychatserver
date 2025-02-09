import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsString, IsEmail, IsOptional, IsEnum } from "class-validator";
import { IUser } from "./user.dto";
import { Role } from "../common/dto/role";
import bcrypt from 'bcrypt'
@Entity("user")
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn("uuid")
  _id?: string;

  @Column()
  userName!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;
  @Column({ default: true })
  @IsOptional()
  active?: boolean | undefined;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  @IsEnum(Role)
  role!: Role;

  @Column()
  @IsString()
  password!: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }
}
