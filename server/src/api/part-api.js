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
exports.partRequests = partRequests;
const data_source_1 = require("../data-source");
const part_1 = require("../entities/part");
const server_1 = require("../server");
const employee_1 = require("../entities/employee");
const purchased_part_1 = require("../entities/purchased-part");
const typeorm_1 = require("typeorm");
function partRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        //================================= PART =================================
        // get all parts
        server_1.app.get('/parts', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const parts = yield data_source_1.ServerData.getRepository(part_1.Part).find();
            res.json(parts);
        }));
        // get part by id
        server_1.app.get('/parts/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const part = yield data_source_1.ServerData.getRepository(part_1.Part).findOneBy({
                partId: id
            });
            if (!part) {
                res.status(404).json({
                    message: `Part with ID ${id} not found`
                });
            }
            else {
                res.json(part);
            }
        }));
        // update a specific part based on an id
        server_1.app.put('/parts/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const partData = req.body;
            const partRepository = data_source_1.ServerData.getRepository(part_1.Part);
            const part = yield partRepository.findOneBy({
                partId: id
            });
            if (!part) {
                res.status(404).json({
                    message: `Part with ID ${id} not found`
                });
            }
            else {
                part.partId = partData.partId;
                part.partName = partData.partName;
                part.partDescription = partData.partDescription;
                part.partCost = partData.partCost;
                part.partQoh = partData.partQoh;
                part.vendorId = partData.vendorId;
                yield partRepository.save(part);
                res.json(part);
            }
        }));
        // delete a specific part based on an id
        server_1.app.delete('/parts/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const partRepository = data_source_1.ServerData.getRepository(part_1.Part);
            const part = yield partRepository.findOneBy({
                partId: id
            });
            if (!part) {
                res.status(404).json({
                    message: `Part with ID ${id} not found`
                });
            }
            else {
                yield partRepository.delete({ partId: id });
                res.json({
                    message: `Part with ID ${id} has been deleted`
                });
            }
        }));
        // create a new part
        server_1.app.post('/parts', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const partData = req.body;
            const partRepository = data_source_1.ServerData.getRepository(part_1.Part);
            const newPart = partRepository.create({
                partId: partData.partId,
                partName: partData.partName,
                partDescription: partData.partDescription,
                partCost: partData.partCost,
                partQoh: partData.partQoh,
                vendorId: partData.vendorId
            });
            yield partRepository.save(newPart);
            res.json(newPart);
        }));
        // Employees can only view parts from their plant
        server_1.app.get('/our-parts/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                /*res.json(plantIdentification);*/
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
                    res.json(parts);
                }
            }
        }));
    });
}
