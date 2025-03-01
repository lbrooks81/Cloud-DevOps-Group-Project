import {ServerData} from '../data-source';
import {Roles} from '../entities/roles';
import {app} from '../server';
export {roleRequests};
import {Employee} from '../entities/employee';

async function roleRequests() {
    //================================= ROLES =================================

    // get all roles
    app.get('/roles', async (req, res) => {
        const roles = await ServerData.getRepository(Roles).find();
        res.json(roles);
    });

    // get role by id
    app.get('/roles/:id', async (req, res) => {
        const id = Number(req.params.id);

        const role = await ServerData.getRepository(Roles).findOneBy({
            roleId: id
        });

        if (!role) {
            res.status(404).json({
                message: `Role with ID ${id} not found`
            });
        } else {
            res.json(role);
        }
    });

    // update a specific role based on an id
    app.put('/roles/:id', async (req, res) => {
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
            res.json(role);
        }
    });

    // delete a specific role based on an id
    app.delete('/roles/:id', async (req, res) => {
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
            res.json({
                message: `Role with ID ${id} has been deleted`
            });
        }
    });

    // create a new role
    app.post('/roles', async (req, res) => {
        const roleData = req.body;

        const roleRepository = ServerData.getRepository(Roles);
        const newRole = roleRepository.create({
            roleId: roleData.roleId,
            roleTitle: roleData.roleTitle
        });

        await roleRepository.save(newRole);
        res.json(newRole);
    });

    // Employees can only view their own role
    app.get('/my-role/:id', async (req, res) => {
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
                res.json([role]);
            }
        }

    });

}