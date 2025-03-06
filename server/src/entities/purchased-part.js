"use strict";
/* TABLE: PURCHASED_PART
PLANT_ID INT NOT NULL, FOREIGN KEY
PART_ID INT NOT NULL, FOREIGN KEY
PURCHASED_DATE DATE,
PART_QOH INT NOT NULL */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedPart = void 0;
const typeorm_1 = require("typeorm");
let PurchasedPart = class PurchasedPart {
};
exports.PurchasedPart = PurchasedPart;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "PLANT_ID", type: "int", unsigned: true })
], PurchasedPart.prototype, "plantID", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "PART_ID", type: "int", unsigned: true })
], PurchasedPart.prototype, "partID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PURCHASED_DATE", type: "date" })
], PurchasedPart.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PP_QOH", type: "int", unsigned: true })
], PurchasedPart.prototype, "quantityOnHand", void 0);
exports.PurchasedPart = PurchasedPart = __decorate([
    (0, typeorm_1.Entity)("PURCHASED_PART")
], PurchasedPart);
