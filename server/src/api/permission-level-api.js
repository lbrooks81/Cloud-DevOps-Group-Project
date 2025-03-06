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
exports.permissionLevelRequests = permissionLevelRequests;
const data_source_1 = require("../data-source");
const permission_level_1 = require("../entities/permission-level");
const server_1 = require("../server");
const employee_1 = require("../entities/employee");
const roles_1 = require("../entities/roles");
function permissionLevelRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        //================================= PERMISSION LEVEL =================================
        // get all permission levels
        server_1.app.get('/permission-levels', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const permissionLevels = yield data_source_1.ServerData.getRepository(permission_level_1.PermissionLevel).find();
            res.json(permissionLevels);
        }));
        // get permission level by id
        server_1.app.get('/permission-levels/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const permissionLevel = yield data_source_1.ServerData.getRepository(permission_level_1.PermissionLevel).findOneBy({
                permissionLevelID: id
            });
            if (!permissionLevel) {
                res.status(404).json({
                    message: `Permission Level with ID ${id} not found`
                });
            }
            else {
                res.json(permissionLevel);
            }
        }));
        // update a specific permission level based on an id
        server_1.app.put('/permission-levels/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const permissionLevelData = req.body;
            const permissionLevelRepository = data_source_1.ServerData.getRepository(permission_level_1.PermissionLevel);
            const permissionLevel = yield permissionLevelRepository.findOneBy({
                permissionLevelID: id
            });
            if (!permissionLevel) {
                res.status(404).json({
                    message: `Permission Level with ID ${id} not found`
                });
            }
            else {
                permissionLevel.permissionLevelID = permissionLevelData.permissionLevelID;
                permissionLevel.permissionLevel = permissionLevelData.permissionLevel;
                yield permissionLevelRepository.save(permissionLevel);
                res.json(permissionLevel);
            }
        }));
        // delete a specific permission level based on an id
        server_1.app.delete('/permission-levels/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const permissionLevelRepository = data_source_1.ServerData.getRepository(permission_level_1.PermissionLevel);
            const permissionLevel = yield permissionLevelRepository.findOneBy({
                permissionLevelID: id
            });
            if (!permissionLevel) {
                res.status(404).json({
                    message: `Permission Level with ID ${id} not found`
                });
            }
            else {
                yield permissionLevelRepository.delete(permissionLevel);
                res.json({
                    message: `Permission Level with ID ${id} has been deleted`
                });
            }
        }));
        // create a new permission level
        server_1.app.post('/permission-levels', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const permissionLevelData = req.body;
            const permissionLevelRepository = data_source_1.ServerData.getRepository(permission_level_1.PermissionLevel);
            const newPermissionLevel = permissionLevelRepository.create({
                permissionLevelID: permissionLevelData.permissionLevelID,
                permissionLevel: permissionLevelData.permissionLevel
            });
            yield permissionLevelRepository.save(newPermissionLevel);
            res.json(newPermissionLevel);
        }));
        // Employees can only view their own permission level
        server_1.app.get('/my-permission-level/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    /*res.json([role]);*/
                    const role_permissionLevelID = role.permissionLevelId;
                    const permissionLevel = yield data_source_1.ServerData.getRepository(permission_level_1.PermissionLevel).findOneBy({
                        permissionLevelID: role_permissionLevelID
                    });
                    if (!permissionLevel) {
                        res.status(404).json({
                            message: `Permission Level with ID ${role_permissionLevelID} not found`
                        });
                    }
                    else {
                        res.json([permissionLevel]);
                    }
                }
            }
        }));
    });
}
