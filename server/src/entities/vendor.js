"use strict";
/* TABLE: VENDOR
VENDOR_ID INT PRIMARY KEY,
VENDOR_NAME VARCHAR(32),
VENDOR_ADDRESS VARCHAR(64),
VENDOR_ZIPCODE VARCHAR(5) */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendor = void 0;
const typeorm_1 = require("typeorm");
let Vendor = class Vendor {
};
exports.Vendor = Vendor;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "VENDOR_ID", type: "int", unsigned: true })
], Vendor.prototype, "vendorID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "VENDOR_NAME", type: "varchar", length: 32 })
], Vendor.prototype, "vendorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "VENDOR_ADDRESS", type: "varchar", length: 64 })
], Vendor.prototype, "vendorAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "VENDOR_ZIPCODE", type: "varchar", length: 5 })
], Vendor.prototype, "vendorZipcode", void 0);
exports.Vendor = Vendor = __decorate([
    (0, typeorm_1.Entity)("VENDOR")
], Vendor);
