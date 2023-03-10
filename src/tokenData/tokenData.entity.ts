import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tokenData')
export class TokenDataEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    data: string;

    @Column()
    loanRef: string;

    @Column({type: 'datetime'})
    createdAt: string;

    @BeforeInsert()
    async getCreatedDate() {
        this.createdAt = new Date().toJSON();
    }

}