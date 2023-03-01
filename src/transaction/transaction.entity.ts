import { randomUUID } from "crypto";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('transactions')
export class TransactionEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    transRef: string; 

    @Column()
    scheduleRef: string; 

    @Column()
    status: string; 

    @Column()
    message: string;

    @Column()
    code: string; 

    @Column({type: 'double'})
    amount: number;

    @Column({type: 'text'})
    data: string;

    @Column({type: 'datetime'})
    createdAt: string;

    @BeforeInsert()
    async getCreatedDate() {
        this.createdAt = new Date().toJSON();
    }

    @BeforeInsert()
    async generateTransRef() {
        this.transRef = randomUUID().split("-").join("");
    }

}