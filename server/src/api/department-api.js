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
exports.departmentRequests = departmentRequests;
const data_source_1 = require("../data-source");
const department_1 = require("../entities/department");
const server_1 = require("../server");
const employee_1 = require("../entities/employee");
function departmentRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        // get all departments
        server_1.app.get('/departments', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const departments = yield data_source_1.ServerData.getRepository(department_1.Department).find();
            res.json(departments);
        }));
        // get department by id
        server_1.app.get('/departments/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            console.log(id);
            const department = yield data_source_1.ServerData.getRepository(department_1.Department).findOneBy({
                departmentId: id
            });
            if (!department) {
                res.status(404).json({
                    message: `Department with ID ${id} not found`
                });
            }
            else {
                res.json(department);
            }
        }));
        // update a specific department based on an id
        server_1.app.put('/departments/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const departmentData = req.body;
            const departmentRepository = data_source_1.ServerData.getRepository(department_1.Department);
            const department = yield departmentRepository.findOneBy({
                departmentId: id
            });
            if (!department) {
                res.status(404).json({
                    message: `Department with ID ${id} not found`
                });
            }
            else {
                department.departmentName = departmentData.departmentName;
                department.employeeID = departmentData.employeeID;
                yield departmentRepository.save(department);
                res.json(department);
            }
        }));
        // delete a specific department based on an id
        server_1.app.delete('/departments/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const departmentRepository = data_source_1.ServerData.getRepository(department_1.Department);
            const department = yield departmentRepository.findOneBy({
                departmentId: id
            });
            if (!department) {
                res.status(404).json({
                    message: `Department with ID ${id} not found`
                });
            }
            else {
                yield departmentRepository.delete(department);
                res.json({
                    message: `Department with ID ${id} has been deleted`
                });
            }
        }));
        // create a new department
        server_1.app.post('/departments', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const departmentData = req.body;
            const departmentRepository = data_source_1.ServerData.getRepository(department_1.Department);
            const newDepartment = departmentRepository.create({
                departmentId: departmentData.departmentId,
                departmentName: departmentData.departmentName,
                employeeID: departmentData.employeeID,
            });
            yield departmentRepository.save(newDepartment);
            res.json(newDepartment);
        }));
        // Employees can view departments with employees from their plant.
        server_1.app.get('/our-departments/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            let plantid;
            const employee = yield data_source_1.ServerData.getRepository(employee_1.Employee).findOneBy({
                employeeID: id
            });
            if (!employee) {
                res.status(404).json({
                    message: `Employee with ID ${id} not found`
                });
            }
            else {
                plantid = employee.departmentID;
                if (plantid) {
                    const departments = yield data_source_1.ServerData.getRepository(department_1.Department).find({
                        where: { departmentId: plantid }
                    });
                    if (!departments) {
                        res.status(404).json({
                            message: 'Department not found'
                        });
                    }
                    else {
                        res.json(departments);
                    }
                }
            }
        }));
    });
}
