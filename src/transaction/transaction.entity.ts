import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('transactions')
export class Transactions{
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

}