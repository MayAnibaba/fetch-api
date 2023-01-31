"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'machine',
    password: '7600',
    database: 'fetch',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map