export declare class LoanEntity {
    id: number;
    loanAccountNumber: string;
    loanRef: string;
    phoneNumber: string;
    email: string;
    loanAmount: number;
    repaymentInstrumentType: string;
    repaymentInstrumentStatus: string;
    token: string;
    tokenExpiry: string;
    getLoanSchedule: boolean;
    createdAt: string;
    getCreatedDate(): Promise<void>;
    generateLoanRef(): Promise<void>;
}
