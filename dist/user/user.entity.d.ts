import { Timestamp } from "typeorm";
export declare class UserEntity {
    id: number;
    email: string;
    passwordHash: string;
    salt: string;
    isActive: boolean;
    lastLogin: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
