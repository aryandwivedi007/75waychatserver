import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsString, IsEmail, IsOptional, IsEnum } from "class-validator";
import { IUser } from "./user.dto";
import { Role } from "../common/dto/role";
import bcrypt from 'bcrypt'
import { Room } from "../room/room.schema";
@Entity("user")
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn("uuid")
  _id?: string;

  @Column()
  userName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  
  @Column({ default: true })
  @IsOptional()
  active?: boolean;

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

  @OneToMany(() => Room, (room) => room.createdBy)
  createdRooms:Room[]

   // Many-to-Many: A user can be in multiple rooms
   @ManyToMany(() => Room, (room) => room.members)
   rooms: Room[];

  @CreateDateColumn({ type: "timestamp", precision: 3, default: () => "CURRENT_TIMESTAMP(3)" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", precision: 3, default: () => "CURRENT_TIMESTAMP(3)", onUpdate: "CURRENT_TIMESTAMP(3)" })
  updatedAt!: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }
}
