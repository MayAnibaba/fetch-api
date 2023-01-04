import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hashSync, genSaltSync } from "bcrypt";

@Entity({name:'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: 0})
    failedLoginAttempt: number;

    @Column({nullable: true, type: "datetime"})
    lastLogin: string;

    @Column({type: "datetime"})
    createdAt: string;

    @Column({nullable: true, type: "datetime"})
    updatedAt: string;

    @BeforeInsert()
    async hashPassword() {
        const salt = genSaltSync(10);
        const hash = hashSync(this.password, salt);

        this.password = hash;
        this.salt = salt;
    }
    
    @BeforeInsert()
    async getCreatedDate() {
        this.createdAt = new Date().toJSON();
    }

    @BeforeUpdate()
    async getUpdatedDate() {
        this.updatedAt = new Date().toJSON();
    }

}