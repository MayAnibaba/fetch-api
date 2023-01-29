"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: 'mysql',
    host: 'containers-us-west-48.railway.app',
    port: 7472,
    username: 'root',
    password: 'ryqskpXqaAMTIARonco1',
    database: 'railway',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map