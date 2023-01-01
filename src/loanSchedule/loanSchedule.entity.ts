import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('loanSchedule')
export class LoanScheduleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    scheduleRef: string;

    @Column()
    loanId: string;

    @Column({type: 'date'})
    dueDate: string; 

    @Column({type: 'double'})
    dueAmount: number; 

    @Column()
    status: string; 

    @Column({default: false})
    enablePartialPayment: boolean;

    @Column({default: 'pending'})
    collectionStatus: string;

    @Column({default: 0, type:'double'})
    collectedAmount: string;

    @Column({type: 'datetime'})
    createdAt: string;

}