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
exports.plantRequests = plantRequests;
const data_source_1 = require("../data-source");
const plant_1 = require("../entities/plant");
const server_1 = require("../server");
const employee_1 = require("../entities/employee");
function plantRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        //================================= PLANT =================================
        // get all plants
        server_1.app.get('/plants', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const plants = yield data_source_1.ServerData.getRepository(plant_1.Plant).find();
            res.json(plants);
        }));
        // get plant by id
        server_1.app.get('/plants/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const plant = yield data_source_1.ServerData.getRepository(plant_1.Plant).findOneBy({
                plantId: id
            });
            if (!plant) {
                res.status(404).json({
                    message: `Plant with ID ${id} not found`
                });
            }
            else {
                res.json(plant);
            }
        }));
        // update a specific plant based on an id
        server_1.app.put('/plants/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const plantData = req.body;
            const plantRepository = data_source_1.ServerData.getRepository(plant_1.Plant);
            const plant = yield plantRepository.findOneBy({
                plantId: id
            });
            if (!plant) {
                res.status(404).json({
                    message: `Plant with ID ${id} not found`
                });
            }
            else {
                plant.plantId = plantData.plantId;
                plant.plantAddress = plantData.plantAddress;
                plant.plantZipcode = plantData.plantZipcode;
                plant.managerID = plantData.managerID;
                yield plantRepository.save(plant);
                res.json(plant);
            }
        }));
        // delete a specific plant based on an id
        server_1.app.delete('/plants/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const plantRepository = data_source_1.ServerData.getRepository(plant_1.Plant);
            const plant = yield plantRepository.findOneBy({
                plantId: id
            });
            if (!plant) {
                res.status(404).json({
                    message: `Plant with ID ${id} not found`
                });
            }
            else {
                yield plantRepository.delete(plant);
                res.json({
                    message: `Plant with ID ${id} has been deleted`
                });
            }
        }));
        // create a new plant
        server_1.app.post('/plants', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const plantData = req.body;
            const plantRepository = data_source_1.ServerData.getRepository(plant_1.Plant);
            const newPlant = plantRepository.create({
                plantId: plantData.plantId,
                plantAddress: plantData.plantAddress,
                plantZipcode: plantData.plantZipcode,
                managerID: plantData.managerID
            });
            yield plantRepository.save(newPlant);
            res.json(newPlant);
        }));
        // Employees can view only their plant
        server_1.app.get('/myplant/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
            // GET PLANTS BY PLANT ID
            if (plantIdentification) {
                const plants = yield data_source_1.ServerData.getRepository(plant_1.Plant).find({
                    where: { plantId: plantIdentification }
                });
                if (!plants) {
                    res.status(404).json({
                        message: 'Plant not found'
                    });
                }
                else {
                    res.json(plants);
                }
            }
        }));
    });
}
