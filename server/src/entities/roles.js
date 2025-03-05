"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const typeorm_1 = require("typeorm");
let Roles = class Roles {
};
exports.Roles = Roles;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'ROLE_ID', type: 'int' })
], Roles.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ROLE_TITLE', type: 'varchar', length: 32 })
], Roles.prototype, "roleTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'PL_ID', type: 'int' })
], Roles.prototype, "permissionLevelId", void 0);
exports.Roles = Roles = __decorate([
    (0, typeorm_1.Entity)("ROLES")
], Roles);
