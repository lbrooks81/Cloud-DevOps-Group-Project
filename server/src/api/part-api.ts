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
    // BUTTS
    app.get('/parts', async (req, res) => {
        try {
            const parts = await ServerData.getRepository(Part).find();
            res.json(parts);
        }
        catch (e) {
            res.status(500).json({
                message: "Error fetching all parts"
            });
        }
    });

    // get part by id
    // BUTTS
    app.get('/parts/:id', async (req, res) => {
        try {
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
        }
        catch (e) {
            res.status(500).json({
                message: "Error fetching part by ID"
            });
        }
    });

    // update a specific part based on an id
    // BUTTS
    app.put('/parts/:id', async (req, res) => {
        try {
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
        }
        catch (e) {
            res.status(500).json({
                message: "Error updating part"
            });
        }
    });

    // delete a specific part based on an id
    // BUTTS
    app.delete('/parts/:id', async (req, res) => {
        try {
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
        }
        catch (e) {
            res.status(500).json({
                message: "Error deleting part"
            });
        }
    });

    // create a new part
    // BUTTS
    app.post('/parts', async (req, res) => {
        try {
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
        }
        catch (e) {
            res.status(500).json({
                message: "Error creating new part"
            });
        }
    });

    // Employees can only view parts from their plant
    // BUTTS
    app.get('/our-parts/:id', async (req, res) => {
        // GET EMPLOYEE BY ID
        let found = true;
        let message;
        try {
            const id = Number(req.params.id);
            let plantIdentification: number | undefined;

            const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
                employeeID: id
            });

            if (!employee) {
                found = false;
                message = `Employee with ID ${id} not found`;
                /*
                res.status(404).json({
                    message: `Employee with ID ${id} not found`
                });*/
            } else {
                plantIdentification = employee.plantID;
                /*res.json(plantIdentification);*/


                // GET PURCHASED PARTS BY PLANT ID
                const purPart: PurchasedPart[] | null = await ServerData.getRepository(PurchasedPart).find({
                    where: {
                        plantID: plantIdentification
                    }
                });

                if (!purPart) {
                    found = false;
                    message = `Purchased Parts with Plant ID ${plantIdentification} not found`;
                    /*res.status(404).json({
                        message: `Purchased Parts with Plant ID ${plantIdentification} not found`
                    });*/
                } else {
                    const partIDs: number[] = purPart.map((part) => part.partID);
                    const parts: Part[] | null = await ServerData.getRepository(Part).find({
                        where: {
                            partId: In(partIDs)
                        }
                    });

                    if (!parts) {
                        found = false;
                        message = `Parts with Plant ID ${plantIdentification} not found`;
                        /*res.status(404).json({
                            message: `Parts with Plant ID ${plantIdentification} not found`
                        });*/
                    } else {
                        message = parts;
/*
                        res.json(parts);
*/
                    }
                }
            }

            if (found) {
                res.json(message);
            } else {
                res.status(404).json({
                    message: message
                });
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error fetching parts by plant ID for this employee's plant"
            });
        }
    });
}