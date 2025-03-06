"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Part = void 0;
const typeorm_1 = require("typeorm");
let Part = class Part {
};
exports.Part = Part;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'PART_ID', type: 'int', unsigned: true })
], Part.prototype, "partId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'PART_NAME', type: 'varchar', length: 64 })
], Part.prototype, "partName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'PART_DESCRIPTION', type: 'varchar', length: 64 })
], Part.prototype, "partDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'PART_COST', type: 'decimal', precision: 9, scale: 2 })
], Part.prototype, "partCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'PART_QOH', type: 'int' })
], Part.prototype, "partQoh", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'VENDOR_ID', type: 'int', unsigned: true, nullable: true })
], Part.prototype, "vendorId", void 0);
exports.Part = Part = __decorate([
    (0, typeorm_1.Entity)("PART")
], Part);
