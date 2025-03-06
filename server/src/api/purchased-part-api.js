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
exports.purchasedPartRequests = purchasedPartRequests;
const data_source_1 = require("../data-source");
const purchased_part_1 = require("../entities/purchased-part");
const server_1 = require("../server");
const employee_1 = require("../entities/employee");
function purchasedPartRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        // get all purchased parts
        server_1.app.get('/purchased-parts', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const purchasedParts = yield data_source_1.ServerData.getRepository(purchased_part_1.PurchasedPart).find();
            res.json(purchasedParts);
        }));
        // get purchased part by composite key {partID, plantID}
        server_1.app.get('/purchased-parts/:partID/:plantID', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const partID = Number(req.params.partID);
            const plantID = Number(req.params.plantID);
            const purchasedPart = yield data_source_1.ServerData.getRepository(purchased_part_1.PurchasedPart).findOneBy({
                partID: partID,
                plantID: plantID
            });
            if (!purchasedPart) {
                res.status(404).json({
                    message: `Purchased Part with Part ID ${partID} and Plant ID ${plantID} not found`
                });
            }
            else {
                res.json(purchasedPart);
            }
        }));
        // update a specific purchased part based on an id
        server_1.app.put('/purchased-parts/:partID/:plantID', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const partID = Number(req.params.partID);
            const plantID = Number(req.params.plantID);
            const purchasedPartData = req.body;
            const purchasedPartRepository = data_source_1.ServerData.getRepository(purchased_part_1.PurchasedPart);
            const purchasedPart = yield data_source_1.ServerData.getRepository(purchased_part_1.PurchasedPart).findOneBy({
                partID: partID,
                plantID: plantID
            });
            if (!purchasedPart) {
                res.status(404).json({
                    message: `Purchased Part with partID ${partID} and plantID ${plantID} not found`
                });
            }
            else {
                purchasedPart.plantID = purchasedPartData.plantID;
                purchasedPart.partID = purchasedPartData.partID;
                purchasedPart.date = purchasedPartData.date;
                yield purchasedPartRepository.save(purchasedPart);
                res.json(purchasedPart);
            }
        }));
        // delete a specific purchased part based on an id
        server_1.app.delete('/purchased-parts/:partID/:plantID', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const partID = Number(req.params.partID);
            const plantID = Number(req.params.plantID);
            const purchasedPartRepository = data_source_1.ServerData.getRepository(purchased_part_1.PurchasedPart);
            const purchasedPart = yield data_source_1.ServerData.getRepository(purchased_part_1.PurchasedPart).findOneBy({
                partID: partID,
                plantID: plantID
            });
            if (!purchasedPart) {
                res.status(404).json({
                    message: `Purchased Part with partID ${partID} and plantID ${plantID} not found`
                });
            }
            else {
                yield purchasedPartRepository.delete(purchasedPart);
                res.json({
                    message: `Purchased Part with partID ${partID} and plantID ${plantID} has been deleted`
                });
            }
        }));
        // create a new purchased part
        server_1.app.post('/purchased-parts', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const purchasedPartData = req.body;
            const purchasedPartRepository = data_source_1.ServerData.getRepository(purchased_part_1.PurchasedPart);
            const newPurchasedPart = purchasedPartRepository.create({
                plantID: purchasedPartData.plantID,
                partID: purchasedPartData.partID,
                date: purchasedPartData.date
            });
            yield purchasedPartRepository.save(newPurchasedPart);
            res.json(newPurchasedPart);
        }));
        // Employees can only view purchased parts from their plant - DONE
        server_1.app.get('/our-purchased-parts/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                res.json(purPart);
            }
        }));
    });
}
