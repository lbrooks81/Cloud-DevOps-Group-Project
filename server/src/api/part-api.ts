import {ServerData} from '../data-source';
import {Part} from '../entities/part';
import {app} from '../server';
export {partRequests};
import {Employee} from '../entities/employee';
import {PurchasedPart} from "../entities/purchased-part";
import {In} from "typeorm";

async function partRequests() {
    //================================= PART =================================

    // get all parts
    app.get('/parts', async (req, res) => {
        const parts = await ServerData.getRepository(Part).find();
        res.json(parts);
    });

    // get part by id
    app.get('/parts/:id', async (req, res) => {
        const id = Number(req.params.id);

        const part = await ServerData.getRepository(Part).findOneBy({
            partId: id
        });

        if (!part) {
            res.status(404).json({
                message: `Part with ID ${id} not found`
            });
        } else {
            res.json(part);
        }
    });

    // update a specific part based on an id
    app.put('/parts/:id', async (req, res) => {
        const id = Number(req.params.id);
        const partData = req.body;

        const partRepository = ServerData.getRepository(Part);
        const part = await partRepository.findOneBy({
            partId: id
        });

        if (!part) {
            res.status(404).json({
                message: `Part with ID ${id} not found`
            });
        } else {
            part.partId = partData.partId;
            part.partName = partData.partName;
            part.partDescription = partData.partDescription;
            part.partCost = partData.partCost;
            part.partQoh = partData.partQoh;
            part.vendorId = partData.vendorId;

            await partRepository.save(part);
            res.json(part);
        }
    });

    // delete a specific part based on an id

    app.delete('/parts/:id', async (req, res) => {
        const id = Number(req.params.id);
        const partRepository = ServerData.getRepository(Part);
        const part = await partRepository.findOneBy({
            partId: id
        });

        if (!part) {
            res.status(404).json({
                message: `Part with ID ${id} not found`
            });
        } else {
            await partRepository.delete({partId: id});
            res.json({
                message: `Part with ID ${id} has been deleted`
            });
        }
    });

    // create a new part
    app.post('/parts', async (req, res) => {
        const partData = req.body;

        const partRepository = ServerData.getRepository(Part);
        const newPart = partRepository.create({
            partId: partData.partId,
            partName: partData.partName,
            partDescription: partData.partDescription,
            partCost: partData.partCost,
            partQoh: partData.partQoh,
            vendorId: partData.vendorId
        });

        await partRepository.save(newPart);
        res.json(newPart);
    });

    // Employees can only view parts from their plant
    app.get('/our-parts/:id', async (req, res) => {
        // GET EMPLOYEE BY ID
        const id = Number(req.params.id);
        let plantIdentification: number | undefined;

        const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
            employeeID: id
        });

        if (!employee) {
            res.status(404).json({
                message: `Employee with ID ${id} not found`
            });
        } else {
            plantIdentification = employee.plantID;
            /*res.json(plantIdentification);*/
        }

        // GET PURCHASED PARTS BY PLANT ID
        const purPart: PurchasedPart[] | null = await ServerData.getRepository(PurchasedPart).find({
            where: {
                plantID: plantIdentification
            }
        });

        if (!purPart) {
            res.status(404).json({
                message: `Purchased Parts with Plant ID ${plantIdentification} not found`
            });
        } else {
            const partIDs: number[] = purPart.map((part) => part.partID);
            /*res.json(purPart);*/
            const parts: Part[] | null = await ServerData.getRepository(Part).find({
                where: {
                    partId: In(partIDs)
                }
            });

            if (!parts) {
                res.status(404).json({
                    message: `Parts with Plant ID ${plantIdentification} not found`
                });
            } else {
                res.json(parts);
            }
        }
    });
}