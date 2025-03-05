"use strict";
/* TABLE: PERMISSION_LEVEL
PL_ID INT PRIMARY KEY,
PERMISSION_LEVEL VARCHAR(16) */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionLevel = void 0;
const typeorm_1 = require("typeorm");
let PermissionLevel = class PermissionLevel {
};
exports.PermissionLevel = PermissionLevel;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "PL_ID", type: "int", unsigned: true })
], PermissionLevel.prototype, "permissionLevelID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PERMISSION_LEVEL", type: "varchar", length: 16 })
], PermissionLevel.prototype, "permissionLevel", void 0);
exports.PermissionLevel = PermissionLevel = __decorate([
    (0, typeorm_1.Entity)("PERMISSION_LEVEL")
], PermissionLevel);
