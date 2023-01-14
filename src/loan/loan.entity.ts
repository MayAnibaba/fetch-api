import { randomUUID } from "crypto";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
    loanAmount: number;

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

    @BeforeInsert()
    async getCreatedDate() {
        this.createdAt = new Date().toJSON();
    }

    @BeforeInsert()
    async generateLoanRef() {
        this.loanRef = randomUUID().replace("-","");
    }

}