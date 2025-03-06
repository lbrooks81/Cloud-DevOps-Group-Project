"use strict";
/* TABLE: PLANT
PLANT_ID INT PRIMARY KEY,
PLANT_ADDRESS VARCHAR(92),
PLANT_ZIPCODE VARCHAR(5),
MANAGER_ID INT FOREIGN KEY */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plant = void 0;
const typeorm_1 = require("typeorm");
let Plant = class Plant {
};
exports.Plant = Plant;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "PLANT_ID", type: "int", unsigned: true })
], Plant.prototype, "plantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PLANT_ADDRESS", type: "varchar", length: 92 })
], Plant.prototype, "plantAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PLANT_ZIPCODE", type: "varchar", length: 5 })
], Plant.prototype, "plantZipcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "MANAGER_ID", type: "int", unsigned: true, nullable: true })
], Plant.prototype, "managerID", void 0);
exports.Plant = Plant = __decorate([
    (0, typeorm_1.Entity)("PLANT")
], Plant);
