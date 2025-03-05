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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRequests = employeeRequests;
const data_source_1 = require("../data-source");
const employee_1 = require("../entities/employee");
const server_1 = require("../server");
const bcrypt_1 = __importDefault(require("bcrypt"));
function employeeRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        //================================= EMPLOYEE =================================
        // get all employees
        server_1.app.get('/employees', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const employees = yield data_source_1.ServerData.getRepository(employee_1.Employee).find();
            res.status(200).json(employees);
        }));
        // get employee by id
        server_1.app.get('/employees/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const employee = yield data_source_1.ServerData.getRepository(employee_1.Employee).findOneBy({
                employeeID: id
            });
            if (!employee) {
                res.status(404).json({
                    message: `Employee with ID ${id} not found`
                });
            }
            else {
                res.json(employee);
            }
        }));
        // update a specific employee based on an id
        server_1.app.put('/employees/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const employeeData = req.body;
            const employeeRepository = data_source_1.ServerData.getRepository(employee_1.Employee);
            const employee = yield employeeRepository.findOneBy({
                employeeID: id
            });
            if (!employee) {
                res.status(404).json({
                    message: `Employee with ID ${id} not found`
                });
            }
            else {
                let bcryptPassword = bcrypt_1.default.hashSync(employeeData.password + server_1.PEPPER, 5);
                employee.employeeID = employeeData.employeeID;
                employee.firstName = employeeData.firstName;
                employee.lastName = employeeData.lastName;
                employee.email = employeeData.email;
                employee.username = employeeData.username;
                employee.password = bcryptPassword;
                employee.phoneNum = employeeData.phoneNum;
                employee.plantID = employeeData.plantID;
                employee.roleID = employeeData.roleID;
                employee.departmentID = employeeData.departmentID;
                yield employeeRepository.save(employee);
                res.json(employee);
            }
        }));
        // delete a specific employee based on an id
        server_1.app.delete('/employees/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const employeeRepository = data_source_1.ServerData.getRepository(employee_1.Employee);
            const employee = yield employeeRepository.findOneBy({
                employeeID: id
            });
            if (!employee) {
                res.status(404).json({
                    message: `Employee with ID ${id} not found`
                });
            }
            else {
                yield employeeRepository.delete(employee);
                res.json({
                    message: `Employee with ID ${id} has been deleted`
                });
            }
        }));
        // create a new employee
        server_1.app.post('/employees', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeData = req.body;
                const bcryptPassword = bcrypt_1.default.hashSync(employeeData.password + server_1.PEPPER, 5);
                const employeeRepository = data_source_1.ServerData.getRepository(employee_1.Employee);
                const newEmployee = employeeRepository.create({
                    employeeID: employeeData.employeeID,
                    firstName: employeeData.firstName,
                    lastName: employeeData.lastName,
                    email: employeeData.email,
                    username: employeeData.username,
                    password: bcryptPassword,
                    phoneNum: employeeData.phoneNum,
                    plantID: employeeData.plantID,
                    roleID: employeeData.roleID,
                    departmentID: employeeData.departmentID
                });
                yield employeeRepository.save(newEmployee);
                res.json(newEmployee);
            }
            catch (error) {
                console.error("Error creating new employee:", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        }));
        // Validates employee login and returns employee ID
        server_1.app.put('/emp-info', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [thisUsername, thisPassword] = req.body;
            try {
                const user = yield data_source_1.ServerData.getRepository(employee_1.Employee).findOneBy({
                    username: thisUsername
                });
                // TODO THIS IS A QUICK FIX TO LOG IN WHILE DATABASE IS DOWN> DELETE ONCE DATABASE WORKS
                res.json({
                    validLogin: true,
                    empId: 105
                });
                if (user) {
                    const valid = bcrypt_1.default.compareSync(thisPassword + server_1.PEPPER, user.password);
                    if (valid) {
                        res.json({
                            validLogin: true,
                            empId: user.employeeID
                        });
                    }
                    else {
                        res.json({
                            validLogin: false,
                            empId: null
                        });
                    }
                }
                else {
                    res.json({
                        validLogin: false,
                        empId: null
                    });
                }
            }
            catch (e) {
                console.log(e);
                res.status(500).json({
                    validLogin: false,
                    empId: null,
                    error: 'Internal Server Error'
                });
            }
        }));
        // Employees can only view employees at their own plant (employee, not manager)
        server_1.app.get('/myplantemployees/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
            // GET EMPLOYEES BY PLANT ID
            if (plantIdentification) {
                const employees = yield data_source_1.ServerData.getRepository(employee_1.Employee).find({
                    where: {
                        plantID: plantIdentification
                    },
                    select: ["employeeID", "firstName", "lastName", "email", "phoneNum", "plantID", "roleID", "departmentID"]
                });
                if (!employees) {
                    res.status(404).json({
                        message: 'Employees not found from this plant'
                    });
                }
                else {
                    res.json(employees);
                }
            }
        }));
    });
}
