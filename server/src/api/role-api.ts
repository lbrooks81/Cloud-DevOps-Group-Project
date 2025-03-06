import {ServerData} from '../data-source';
import {Roles} from '../entities/roles';
import {app} from '../server';
export {roleRequests};
import {Employee} from '../entities/employee';

async function roleRequests() {
    //================================= ROLES =================================

    // get all roles
    // BUTTS
    app.get('/roles', async (req, res) => {
        try {
            const roles = await ServerData.getRepository(Roles).find();
            res.status(200).json(roles);
        }
        catch (e) {
            res.status(500).json({
                message: "Error fetching all roles"
            });
        }
    });

    // get role by id
    // BUTTS
    app.get('/roles/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);

            const role = await ServerData.getRepository(Roles).findOneBy({
                roleId: id
            });

            if (!role) {
                res.status(404).json({
                    message: `Role with ID ${id} not found`
                });
            } else {
                res.status(200).json(role);
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error fetching role by ID"
            });
        }
    });

    // update a specific role based on an id
    // BUTTS
    app.put('/roles/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const roleData = req.body;

            const roleRepository = ServerData.getRepository(Roles);
            const role = await roleRepository.findOneBy({
                roleId: id
            });

            if (!role) {
                res.status(404).json({
                    message: `Role with ID ${id} not found`
                });
            } else {
                role.roleId = roleData.roleId;
                role.roleTitle = roleData.roleTitle;
                role.permissionLevelId = roleData.permissionLevelId;

                await roleRepository.save(role);
                res.status(204).json(role);
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error updating role by ID"
            });
        }
    });

    // delete a specific role based on an id
    // BUTTS
    app.delete('/roles/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const roleRepository = ServerData.getRepository(Roles);
            const role = await roleRepository.findOneBy({
                roleId: id
            });

            if (!role) {
                res.status(404).json({
                    message: `Role with ID ${id} not found`
                });
            } else {
                await roleRepository.delete(role);
                res.status(204).json({
                    message: `Role with ID ${id} has been deleted`
                });
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error deleting role by ID"
            });
        }
    });

    // create a new role
    // BUTTS
    app.post('/roles', async (req, res) => {
        try {
            const roleData = req.body;

            const roleRepository = ServerData.getRepository(Roles);
            const newRole = roleRepository.create({
                roleId: roleData.roleId,
                roleTitle: roleData.roleTitle,
                permissionLevelId: roleData.permissionLevelId
            });

            await roleRepository.save(newRole);
            res.status(201).json(newRole);
        }
        catch (e) {
            res.status(500).json({
                message: "Error creating role"
            });
        }
    });

    // Employees can only view their own role
    // BUTTS
    app.get('/my-role/:id', async (req, res) => {
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
                    res.status(200).json([role]);
                }
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error fetching role by ID"
            });
        }
    });

}