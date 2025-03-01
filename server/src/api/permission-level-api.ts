import {ServerData} from '../data-source';
import {PermissionLevel} from '../entities/permission-level';
import {app} from '../server';
export {permissionLevelRequests};
import {Employee} from '../entities/employee';
import {Roles} from '../entities/roles';

async function permissionLevelRequests() {
    //================================= PERMISSION LEVEL =================================
    // get all permission levels
    app.get('/permission-levels', async (req, res) => {
        const permissionLevels = await ServerData.getRepository(PermissionLevel).find();
        res.json(permissionLevels);
    });

    // get permission level by id
    app.get('/permission-levels/:id', async (req, res) => {
        const id = Number(req.params.id);

        const permissionLevel = await ServerData.getRepository(PermissionLevel).findOneBy({
            permissionLevelID: id
        });

        if (!permissionLevel) {
            res.status(404).json({
                message: `Permission Level with ID ${id} not found`
            });
        } else {
            res.json(permissionLevel);
        }
    });

    // update a specific permission level based on an id
    app.put('/permission-levels/:id', async (req, res) => {
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
            res.json(permissionLevel);
        }
    });

    // delete a specific permission level based on an id
    app.delete('/permission-levels/:id', async (req, res) => {
        const id = Number(req.params.id);
        const permissionLevelRepository = ServerData.getRepository(PermissionLevel);
        const permissionLevel = await permissionLevelRepository.findOneBy({
            permissionLevelID: id
        });

        if (!permissionLevel) {
            res.status(404).json({
                message: `Permission Level with ID ${id} not found`
            });
        } else {
            await permissionLevelRepository.delete(permissionLevel);
            res.json({
                message: `Permission Level with ID ${id} has been deleted`
            });
        }
    });

    // create a new permission level
    app.post('/permission-levels', async (req, res) => {
        const permissionLevelData = req.body;

        const permissionLevelRepository = ServerData.getRepository(PermissionLevel);
        const newPermissionLevel = permissionLevelRepository.create({
            permissionLevelID: permissionLevelData.permissionLevelID,
            permissionLevel: permissionLevelData.permissionLevel
        });

        await permissionLevelRepository.save(newPermissionLevel);
        res.json(newPermissionLevel);
    });

    // Employees can only view their own permission level
    app.get('/my-permission-level/:id', async (req, res) => {
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
                    res.json([permissionLevel]);
                }
            }
        }

    });


}