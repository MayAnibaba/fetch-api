"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const bcrypt_1 = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findByEmail(email) {
        return await this.userRepository.findOneBy({ 'email': email });
    }
    async createUser(registerRequest) {
        return await this.userRepository.save(registerRequest);
    }
    async updateUser(user) {
        const updateResponse = await this.userRepository.createQueryBuilder()
            .update(user)
            .set({
            isActive: user.isActive,
            updatedAt: new Date().toJSON()
        })
            .where("email = :email", { email: user.email })
            .execute();
        return updateResponse;
    }
    async login(loginRequest) {
        const thisUser = await this.findByEmail(loginRequest.email);
        console.log(thisUser);
        if (thisUser == null) {
            return 'nouser';
        }
        else {
            if (thisUser.isActive) {
                if (await (0, bcrypt_1.compareSync)(loginRequest.password, thisUser.password)) {
                    this.userRepository.createQueryBuilder()
                        .update(thisUser)
                        .set({
                        failedLoginAttempt: 0,
                        lastLogin: new Date().toJSON()
                    })
                        .where("email = :email", { email: thisUser.email })
                        .execute();
                    return thisUser;
                }
                else {
                    var isActive = true;
                    if (thisUser.failedLoginAttempt >= 2) {
                        isActive = false;
                    }
                    this.userRepository.createQueryBuilder()
                        .update(thisUser)
                        .set({
                        failedLoginAttempt: thisUser.failedLoginAttempt + 1,
                        isActive: isActive,
                        updatedAt: new Date().toJSON()
                    })
                        .where("email = :email", { email: thisUser.email })
                        .execute();
                    return 'invalidLogin';
                }
            }
            else {
                return 'inactiveUser';
            }
        }
    }
    async newPassword(passwordRequest) {
        const thisUser = await this.findByEmail(passwordRequest.email);
        if (thisUser == null) {
            return 'nouser';
        }
        else {
            const salt = (0, bcrypt_1.genSaltSync)(10);
            const hash = (0, bcrypt_1.hashSync)(passwordRequest.password, salt);
            const updateResponse = await this.userRepository.createQueryBuilder()
                .update(thisUser)
                .set({
                isActive: thisUser.isActive,
                password: hash,
                salt: salt,
                failedLoginAttempt: 0,
                updatedAt: new Date().toJSON()
            })
                .where("email = :email", { email: passwordRequest.email })
                .execute();
            return updateResponse;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map