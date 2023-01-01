import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    createdAt: string;

    @Column({nullable: true, type: "datetime"})
    updatedAt: string;
}