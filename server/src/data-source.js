"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerData = void 0;
const typeorm_1 = require("typeorm");
const department_1 = require("./entities/department");
const plant_1 = require("./entities/plant");
const permission_level_1 = require("./entities/permission-level");
const roles_1 = require("./entities/roles");
const vendor_1 = require("./entities/vendor");
const part_1 = require("./entities/part");
const purchased_part_1 = require("./entities/purchased-part");
const employee_1 = require("./entities/employee");
//Server Data Source
const ServerData = new typeorm_1.DataSource({
    type: "mssql",
    host: "it239-devops.database.windows.net",
    port: 1433,
    username: 'IT239',
    password: 'Devops239!@',
    database: 'DevOps239',
    synchronize: false,
    logging: true,
    entities: [employee_1.Employee, department_1.Department, plant_1.Plant, permission_level_1.PermissionLevel, roles_1.Roles, vendor_1.Vendor, part_1.Part, purchased_part_1.PurchasedPart],
    subscribers: [],
    migrations: []
});
exports.ServerData = ServerData;
