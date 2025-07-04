"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
const typeorm_1 = require("typeorm");
let Department = class Department {
};
exports.Department = Department;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'DEPT_ID', type: 'int', unsigned: true })
], Department.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'DEPT_NAME', type: 'varchar', length: 64 })
], Department.prototype, "departmentName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'EMP_ID', type: 'int', unsigned: true, nullable: true })
], Department.prototype, "employeeID", void 0);
exports.Department = Department = __decorate([
    (0, typeorm_1.Entity)("DEPARTMENT")
], Department);
