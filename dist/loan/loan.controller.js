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
exports.LoanController = void 0;
const common_1 = require("@nestjs/common");
const loan_service_1 = require("./loan.service");
const restconfig_1 = require("../restconfig");
const loan_entity_1 = require("./loan.entity");
const mailconfig_1 = require("../mailconfig");
const nodemailer = require("nodemailer");
let LoanController = class LoanController {
    constructor(loanService) {
        this.loanService = loanService;
    }
    async getAllLoans() {
        const loans = await this.loanService.getAllLoans();
        return ({
            code: '00',
            status: 'successful',
            message: 'listing all loans',
            data: loans
        });
    }
    async getByLoanRef(loanRefRequest, res) {
        const findLoan = await this.loanService.getLoanByRef(loanRefRequest.loanRef);
        if (findLoan != null) {
            return ({
                code: '00',
                status: 'successful',
                message: 'listing loan',
                data: findLoan
            });
        }
        else {
            return ({
                code: '81',
                status: 'failure',
                message: 'loan account not found',
            });
        }
    }
    async createLoan(addRequest, res) {
        console.log('add loan request: ' + JSON.stringify(addRequest));
        const findLoan = await this.loanService.getLoanByAcc(addRequest.loanAccountNumber);
        if (findLoan == null) {
            try {
                const axios = require('axios');
                const url = restconfig_1.default.bankOneUrl + 'Loan/GetLoanByAccountNumber/' + restconfig_1.default.bankOneVersion + '?authtoken=' + restconfig_1.default.bankOneAuthToken + '&loanAccountNumber=' + addRequest.loanAccountNumber + '&institutionCode=' + restconfig_1.default.bankOneInsCode;
                console.log(url);
                const { data } = await axios.get(url);
                console.log('received: ' + JSON.stringify(data));
                if (data.IsSuccessful) {
                    const loanEntity = new loan_entity_1.LoanEntity();
                    Object.assign(loanEntity, addRequest);
                    loanEntity.loanAmount = data.LoanAmount.toString();
                    loanEntity.repaymentInstrumentType = 'card';
                    const createLoanResponse = await this.loanService.createLoan(loanEntity);
                    console.log(createLoanResponse);
                    const paystrackUrl = restconfig_1.default.webPaystackURl + createLoanResponse.loanRef;
                    let info = await mailconfig_1.default.sendMail({
                        from: '"Sofri MFB" <noreply@noreply.com>',
                        to: "codegidi@live.com, " + addRequest.email,
                        subject: "Update on your application",
                        text: "Add your replayment instrument: " + paystrackUrl,
                        html: "Add your replayment instrument: <a href='" + paystrackUrl + "'>click here</a>",
                    });
                    console.log("Message sent: %s", info.messageId);
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                    return ({
                        code: '00',
                        status: 'success',
                        message: 'loan created',
                        paystackUrl: paystrackUrl,
                        data: createLoanResponse
                    });
                }
                else {
                    res.status(common_1.HttpStatus.BAD_REQUEST);
                    return ({
                        code: '81',
                        status: 'failure',
                        message: 'loan account not found',
                    });
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            res.status(common_1.HttpStatus.BAD_REQUEST);
            return ({
                code: '82',
                status: 'failure',
                message: 'loan account already exists',
            });
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "getAllLoans", null);
__decorate([
    (0, common_1.Post)('byLoanRef'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "getByLoanRef", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "createLoan", null);
LoanController = __decorate([
    (0, common_1.Controller)('loans'),
    __metadata("design:paramtypes", [loan_service_1.LoanService])
], LoanController);
exports.LoanController = LoanController;
//# sourceMappingURL=loan.controller.js.map