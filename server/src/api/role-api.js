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
exports.roleRequests = roleRequests;
const data_source_1 = require("../data-source");
const roles_1 = require("../entities/roles");
const server_1 = require("../server");
const employee_1 = require("../entities/employee");
function roleRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        //================================= ROLES =================================
        // get all roles
        server_1.app.get('/roles', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const roles = yield data_source_1.ServerData.getRepository(roles_1.Roles).find();
            res.json(roles);
        }));
        // get role by id
        server_1.app.get('/roles/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const role = yield data_source_1.ServerData.getRepository(roles_1.Roles).findOneBy({
                roleId: id
            });
            if (!role) {
                res.status(404).json({
                    message: `Role with ID ${id} not found`
                });
            }
            else {
                res.json(role);
            }
        }));
        // update a specific role based on an id
        server_1.app.put('/roles/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const roleData = req.body;
            const roleRepository = data_source_1.ServerData.getRepository(roles_1.Roles);
            const role = yield roleRepository.findOneBy({
                roleId: id
            });
            if (!role) {
                res.status(404).json({
                    message: `Role with ID ${id} not found`
                });
            }
            else {
                role.roleId = roleData.roleId;
                role.roleTitle = roleData.roleTitle;
                role.permissionLevelId = roleData.permissionLevelId;
                yield roleRepository.save(role);
                res.json(role);
            }
        }));
        // delete a specific role based on an id
        server_1.app.delete('/roles/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const roleRepository = data_source_1.ServerData.getRepository(roles_1.Roles);
            const role = yield roleRepository.findOneBy({
                roleId: id
            });
            if (!role) {
                res.status(404).json({
                    message: `Role with ID ${id} not found`
                });
            }
            else {
                yield roleRepository.delete(role);
                res.json({
                    message: `Role with ID ${id} has been deleted`
                });
            }
        }));
        // create a new role
        server_1.app.post('/roles', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const roleData = req.body;
            const roleRepository = data_source_1.ServerData.getRepository(roles_1.Roles);
            const newRole = roleRepository.create({
                roleId: roleData.roleId,
                roleTitle: roleData.roleTitle
            });
            yield roleRepository.save(newRole);
            res.json(newRole);
        }));
        // Employees can only view their own role
        server_1.app.get('/my-role/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                const emp_roleID = employee.roleID;
                const role = yield data_source_1.ServerData.getRepository(roles_1.Roles).findOneBy({
                    roleId: emp_roleID
                });
                if (!role) {
                    res.status(404).json({
                        message: `Role with ID ${emp_roleID} not found`
                    });
                }
                else {
                    res.json([role]);
                }
            }
        }));
    });
}
