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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./user.entity");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll() {
        const userData = await this.userService.findAll();
        const response = ({
            code: '00',
            status: 'success',
            message: 'success',
            data: userData
        });
        return response;
    }
    async createUser(registerRequest, res) {
        console.log('Register request: ' + registerRequest.email);
        const userCreated = await this.userService.createUser(registerRequest);
        if (userCreated == null) {
            res.status(400);
            return ({
                code: '82',
                status: 'failure',
                message: 'customer already exists',
            });
        }
        else {
            return ({
                code: '00',
                status: 'success',
                message: 'user created succesfully',
                data: userCreated
            });
        }
    }
    async blockUser(blockRequest) {
        console.log('block user request:' + blockRequest.email);
        const blockRequestMapped = new user_entity_1.UserEntity();
        if (blockRequest.status == 'active') {
            blockRequestMapped.isActive = true;
        }
        else {
            blockRequestMapped.isActive = false;
        }
        blockRequestMapped.email = blockRequest.email;
        const blockResponse = await this.userService.updateUser(blockRequestMapped);
        console.log('Block user respose:' + blockResponse);
        return ({
            code: '00',
            status: 'success',
            message: 'user updated succesfully',
            data: blockResponse
        });
    }
    async userLogin(loginRequest, res) {
        console.log('login request:' + loginRequest.email);
        const loginResponse = await this.userService.login(loginRequest);
        console.log('loginService Resposne: ' + loginResponse);
        if (loginResponse == 'invalidLogin') {
            res.status(400);
            return ({
                code: '90',
                status: 'failure',
                message: 'invalid login details',
            });
        }
        else if (loginResponse == 'inactiveUser') {
            res.status(400);
            return ({
                code: '83',
                status: 'failure',
                message: 'user account is blocked',
            });
        }
        else if (loginResponse == 'nouser') {
            res.status(400);
            return ({
                code: '81',
                status: 'failure',
                message: 'user not found',
            });
        }
        else {
            res.status(200);
            return ({
                code: '00',
                status: 'success',
                message: 'user login succesfully',
                data: loginResponse
            });
        }
    }
    async resetPassowrd(requestbody, res) {
        const passwordResponse = await this.userService.newPassword(requestbody);
        if (passwordResponse == 'nouser') {
            res.status(400);
            return ({
                code: '81',
                status: 'failure',
                message: 'user not found',
            });
        }
        else {
            return ({
                code: '00',
                status: 'success',
                message: 'password changed succesfully',
                data: passwordResponse
            });
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('active'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "blockUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userLogin", null);
__decorate([
    (0, common_1.Post)('resetpassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassowrd", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map