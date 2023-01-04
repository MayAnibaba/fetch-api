export declare class UserEntity {
    id: number;
    email: string;
    password: string;
    salt: string;
    isActive: boolean;
    failedLoginAttempt: number;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    hashPassword(): Promise<void>;
    getCreatedDate(): Promise<void>;
    getUpdatedDate(): Promise<void>;
}
