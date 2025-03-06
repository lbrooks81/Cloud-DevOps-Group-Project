"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRequests = vendorRequests;
const data_source_1 = require("../data-source");
const vendor_1 = require("../entities/vendor");
const server_1 = require("../server");
const employee_1 = require("../entities/employee");
const purchased_part_1 = require("../entities/purchased-part");
const part_1 = require("../entities/part");
const typeorm_1 = require("typeorm");
function vendorRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        //================================= VENDOR =================================
        // get all vendors
        server_1.app.get('/vendors', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const vendors = yield data_source_1.ServerData.getRepository(vendor_1.Vendor).find();
            res.json(vendors);
        }));
        // get vendor by id
        server_1.app.get('/vendors/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const vendor = yield data_source_1.ServerData.getRepository(vendor_1.Vendor).findOneBy({
                vendorID: id
            });
            if (!vendor) {
                res.status(404).json({
                    message: `Vendor with ID ${id} not found`
                });
            }
            else {
                res.json(vendor);
            }
        }));
        // update a specific vendor based on an id
        server_1.app.put('/vendors/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const vendorData = req.body;
            const vendorRepository = data_source_1.ServerData.getRepository(vendor_1.Vendor);
            const vendor = yield vendorRepository.findOneBy({
                vendorID: id
            });
            if (!vendor) {
                res.status(404).json({
                    message: `Vendor with ID ${id} not found`
                });
            }
            else {
                vendor.vendorID = vendorData.vendorID;
                vendor.vendorName = vendorData.vendorName;
                vendor.vendorAddress = vendorData.vendorAddress;
                vendor.vendorZipcode = vendorData.vendorZipcode;
                yield vendorRepository.save(vendor);
                res.json(vendor);
            }
        }));
        // delete a specific vendor based on an id
        server_1.app.delete('/vendors/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const vendorRepository = data_source_1.ServerData.getRepository(vendor_1.Vendor);
            const vendor = yield vendorRepository.findOneBy({
                vendorID: id
            });
            if (!vendor) {
                res.status(404).json({
                    message: `Vendor with ID ${id} not found`
                });
            }
            else {
                yield vendorRepository.delete(vendor);
                res.json({
                    message: `Vendor with ID ${id} has been deleted`
                });
            }
        }));
        // create a new vendor
        server_1.app.post('/vendors', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const vendorData = req.body;
            const vendorRepository = data_source_1.ServerData.getRepository(vendor_1.Vendor);
            const newVendor = vendorRepository.create({
                vendorID: vendorData.vendorID,
                vendorName: vendorData.vendorName,
                vendorAddress: vendorData.vendorAddress,
                vendorZipcode: vendorData.vendorZipcode
            });
            yield vendorRepository.save(newVendor);
            res.json(newVendor);
        }));
        // Employees can only view vendors that supplied parts in their plant - DONE
        server_1.app.get('/our-vendors/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            // GET EMPLOYEE BY ID
            const id = Number(req.params.id);
            let plantIdentification;
            const employee = yield data_source_1.ServerData.getRepository(employee_1.Employee).findOneBy({
                employeeID: id
            });
            if (!employee) {
                res.status(404).json({
                    message: `Employee with ID ${id} not found`
                });
            }
            else {
                plantIdentification = employee.plantID;
            }
            // GET PURCHASED PARTS BY PLANT ID
            const purPart = yield data_source_1.ServerData.getRepository(purchased_part_1.PurchasedPart).find({
                where: {
                    plantID: plantIdentification
                }
            });
            if (!purPart) {
                res.status(404).json({
                    message: `Purchased Parts with Plant ID ${plantIdentification} not found`
                });
            }
            else {
                const partIDs = purPart.map((part) => part.partID);
                /*res.json(purPart);*/
                const parts = yield data_source_1.ServerData.getRepository(part_1.Part).find({
                    where: {
                        partId: (0, typeorm_1.In)(partIDs)
                    }
                });
                if (!parts) {
                    res.status(404).json({
                        message: `Parts with Plant ID ${plantIdentification} not found`
                    });
                }
                else {
                    /*res.json(parts);*/
                    const vendorIDs = parts.map((part) => part.vendorId);
                    const vendors = yield data_source_1.ServerData.getRepository(vendor_1.Vendor).find({
                        where: {
                            vendorID: (0, typeorm_1.In)(vendorIDs)
                        }
                    });
                    if (!vendors) {
                        res.status(404).json({
                            message: `Vendors with Plant ID ${plantIdentification} not found`
                        });
                    }
                    else {
                        res.json(vendors);
                    }
                }
            }
        }));
    });
}
