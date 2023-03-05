import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('logs')
export class LogEntitiy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    repaymentsFound: number;

    @Column({type: 'datetime'})
    lastRepaymentTime: string;

    @BeforeInsert()
    async getCreatedDate() {
        this.lastRepaymentTime = new Date().toJSON();
    }

}