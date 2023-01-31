import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'containers-us-west-48.railway.app',
    port: 7472,
    username: 'root',
    password: 'ryqskpXqaAMTIARonco1',
    database: 'railway',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
}

// const config: MysqlConnectionOptions = {
//     type: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: 'machine',
//     password: '7600',
//     database: 'fetch',
//     entities: [__dirname + '/**/*.entity{.ts,.js}'],
//     synchronize: true,
//     logging: true,
// }

export default config;