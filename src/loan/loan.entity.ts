import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('loans')
export class LoanEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    loanAccountNumber: string;

    @Column()
    loanRef: string;

    @Column()
    phoneNumber: string; 

    @Column()
    email: string;

    @Column()
    repaymentInstrumentType: string;

    @Column({default: 'pending' })
    repaymentInstrumentStatus: string;

    @Column({nullable: true})
    token: string;

    @Column({nullable: true, type: 'date'})
    tokenExpiry: string;

    @Column({default: false})
    getLoanSchedule: boolean;

    @Column({type: 'datetime'})
    createdAt: string

}