import {ServerData} from '../data-source';
import {PermissionLevel} from '../entities/permission-level';
import {app} from '../server';
export {permissionLevelRequests};
import {Employee} from '../entities/employee';
import {Roles} from '../entities/roles';

async function permissionLevelRequests() {
    //================================= PERMISSION LEVEL =================================
    // get all permission levels
    // BUTTS
    app.get('/permission-levels', async (req, res) => {
        try {
            const permissionLevels = await ServerData.getRepository(PermissionLevel).find();
            res.status(200).json(permissionLevels);
        }
        catch (e) {
            res.status(500).json({
                message: "Error getting all permission levels"
            });
        }
    });

    // get permission level by id
    // BUTTS
    app.get('/permission-levels/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);

            const permissionLevel = await ServerData.getRepository(PermissionLevel).findOneBy({
                permissionLevelID: id
            });

            if (!permissionLevel) {
                res.status(404).json({
                    message: `Permission Level with ID ${id} not found`
                });
            } else {
                res.status(200).json(permissionLevel);
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error getting permission level by ID"
            });
        }
    });

    // update a specific permission level based on an id
    // BUTTS
    app.put('/permission-levels/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const permissionLevelData = req.body;

            const permissionLevelRepository = ServerData.getRepository(PermissionLevel);
            const permissionLevel = await permissionLevelRepository.findOneBy({
                permissionLevelID: id
            });

            if (!permissionLevel) {
                res.status(404).json({
                    message: `Permission Level with ID ${id} not found`
                });
            } else {
                permissionLevel.permissionLevelID = permissionLevelData.permissionLevelID;
                permissionLevel.permissionLevel = permissionLevelData.permissionLevel;

                await permissionLevelRepository.save(permissionLevel);
                res.status(204).json(permissionLevel);
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error updating permission level"
            });
        }
    });

    // delete a specific permission level based on an id
    // BUTTS
    app.delete('/permission-levels/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const permissionLevel = await ServerData.getRepository(PermissionLevel).findOneBy({
                permissionLevelID: id
            });

            if (!permissionLevel) {
                res.status(404).json({
                    message: `Permission Level with ID ${id} not found`
                });
            } else {
                await ServerData.getRepository(PermissionLevel).delete(permissionLevel);
                res.status(204).json({
                    message: `Permission Level with ID ${id} has been deleted`
                });
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error deleting permission level"
            });
        }
    });

    // create a new permission level
    // BUTTS
    app.post('/permission-levels', async (req, res) => {
        try {
            const permissionLevelData = req.body;

            const permissionLevelRepository = ServerData.getRepository(PermissionLevel);
            const newPermissionLevel = permissionLevelRepository.create({
                permissionLevelID: permissionLevelData.permissionLevelID,
                permissionLevel: permissionLevelData.permissionLevel
            });

            await permissionLevelRepository.save(newPermissionLevel);
            res.status(201).json(newPermissionLevel);
        }
        catch (e) {
            res.status(500).json({
                message: "Error creating permission level"
            });
        }
    });

    // Employees can only view their own permission level
    // BUTTS
    app.get('/my-permission-level/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
                employeeID: id
            });
            if (!employee) {
                res.status(404).json({
                    message: `Employee with ID ${id} not found`
                });
            } else {
                const emp_roleID = employee.roleID;
                const role: Roles | null = await ServerData.getRepository(Roles).findOneBy({
                    roleId: emp_roleID
                });

                if (!role) {
                    res.status(404).json({
                        message: `Role with ID ${emp_roleID} not found`
                    });
                } else {
                    /*res.json([role]);*/
                    const role_permissionLevelID = role.permissionLevelId;
                    const permissionLevel: PermissionLevel | null = await ServerData.getRepository(PermissionLevel).findOneBy({
                        permissionLevelID: role_permissionLevelID
                    });

                    if (!permissionLevel) {
                        res.status(404).json({
                            message: `Permission Level with ID ${role_permissionLevelID} not found`
                        });
                    } else {
                        res.status(200).json([permissionLevel]);
                    }
                }
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error getting permission level by ID for this employee's permissions"
            });
        }

    });
}