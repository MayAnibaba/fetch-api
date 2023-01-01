import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity({name:'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    salt: string;

    @Column({default: true})
    isActive: boolean;

    @Column({nullable: true, type: "datetime"})
    lastLogin: string;

    @Column({type: "datetime"})
    createdAt: Timestamp;

    @Column({nullable: true, type: "datetime"})
    updatedAt: Timestamp;
}