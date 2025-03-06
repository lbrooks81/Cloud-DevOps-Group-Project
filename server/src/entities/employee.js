"use strict";
/* TABLE: EMPLOYEE
EMP_ID INT PRIMARY KEY,
EMP_FNAME VARCHAR(32) NOT NULL,
EMP_LNAME VARCHAR(32) NOT NULL,
EMP_EMAIL VARCHAR(64),
EMP_USERNAME VARCHAR(64),
EMP_PASSWORD VARCHAR(128),
EMP_PHONE_NUM INT,
EMP_ROLE_ID INT, FOREIGN KEY
DEPT_ID INT FOREIGN KEY */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const typeorm_1 = require("typeorm");
let Employee = class Employee {
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "EMP_ID", type: "int", unsigned: true })
], Employee.prototype, "employeeID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "EMP_FNAME", type: "varchar", length: 32 })
], Employee.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "EMP_LNAME", type: "varchar", length: 32 })
], Employee.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "EMP_EMAIL", type: "varchar", length: 64, nullable: true })
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "EMP_USERNAME", type: "varchar", length: 64, nullable: true })
], Employee.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "EMP_HASH", type: "varchar", length: 256, nullable: true })
], Employee.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "EMP_PHONE_NUM", type: "int", unsigned: true, nullable: true })
], Employee.prototype, "phoneNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PLANT_ID", type: "int", unsigned: true })
], Employee.prototype, "plantID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ROLE_ID", type: "int", unsigned: true })
], Employee.prototype, "roleID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "DEPT_ID", type: "int", unsigned: true })
], Employee.prototype, "departmentID", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)("EMPLOYEE")
], Employee);
