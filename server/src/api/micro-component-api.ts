import {ServerData} from '../data-source';
import {app} from '../server';
import {Employee} from "../entities/employee";
import {MicroComponent} from "../entities/micro-component";

export {microComponentRequests};

async function microComponentRequests() {
    //================================= PLANT =================================
    // get all plants
    //BUTTS
    app.get('/micro-components', async (req, res) => {
        try {
            const microComps = await ServerData.getRepository(MicroComponent).find();
            res.json(microComps);
        } catch (e) {
            res.status(500).json({
                message: "Error getting all micro-components"
            });
        }
    });

    // get plant by id
    // BUTTS
    app.get('/micro-components/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);

            const microComp = await ServerData.getRepository(MicroComponent).findOneBy({
                microComponentSKU: id
            });

            if (!microComp) {
                res.status(404).json({
                    message: `MicroComponent with ID ${id} not found`
                });
            } else {
                res.json(microComp);
            }
        } catch (e) {
            res.status(500).json({
                message: "Error getting microcomponent by ID"
            });
        }
    });

    // update a specific plant based on an id
    // BUTTS
    app.put('/micro-components/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const microCompData = req.body;

            const microCompRepo = ServerData.getRepository(MicroComponent);
            const microComp = await microCompRepo.findOneBy({
                microComponentSKU: id,
            });

            if (!microComp) {
                res.status(404).json({
                    message: `Microcomponent with ID ${id} not found`
                });
            } else {
                microComp.microComponentName = microCompData.microComponentName;
                microComp.microComponentDescription = microCompData.microComponentDescription;
                microComp.microComponentCost = microCompData.microComponentCost;
                microComp.microComponentQuantityOnHand = microCompData.microComponentQuantityOnHand;
                microComp.microComponentManufactureDate = microCompData.microComponentManufactureDate;
                microComp.microCompPlantId = microCompData.microCompPlantId;

                await microCompRepo.save(microComp);
                res.json(microComp);
            }
        } catch (e) {
            res.status(500).json({
                message: "Error updating microcomponent by ID"
            });
        }
    });

    // delete a specific plant based on an id
    // BUTTS
    app.delete('/micro-components/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const microComp = await ServerData.getRepository(MicroComponent).findOneBy({
                microComponentSKU: id
            });

            if (!microComp) {
                res.status(404).json({
                    message: `Micro-component with ID ${id} not found`
                });
            } else {
                // @ts-ignore
                await ServerData.getRepository(MicroComponent).delete(microComp);
                res.json({
                    message: `MicroComponent with ID ${id} has been deleted`
                });
            }
        } catch (e) {
            res.status(500).json({
                message: "Error deleting MicroComponent by ID"
            });
        }
    });

    // create a new plant
    // BUTTS
    app.post('/micro-components', async (req, res) => {
        try {
            const microCompData = req.body;

            const microCompRepo = ServerData.getRepository(MicroComponent);
            const newMicroComp = microCompRepo.create({
                microComponentSKU: microCompData.microComponentSKU,
                microComponentName: microCompData.microComponentName,
                microComponentDescription: microCompData.microComponentDescription,
                microComponentCost: microCompData.microComponentCost,
                microComponentQuantityOnHand: microCompData.microComponentQuantityOnHand,
                microComponentManufactureDate: microCompData.microComponentManufactureDate,
                microCompPlantId: microCompData.microCompPlantId
            });

            await microCompRepo.save(newMicroComp);
            res.json(newMicroComp);
        } catch (e) {
            res.status(500).json({
                message: "Error creating MicroComponent"
            });
        }
    });

    // Employees can only get microComponents from their plant
    // BUTTS
    app.get('/my-micro-components/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({employeeID: id});

            if (!employee) {
                res.status(404).json({message: `Employee with ID ${id} not found`});
            }

            const microComps = await ServerData.getRepository(MicroComponent).find({
                where: {microCompPlantId: employee?.plantID}
            });

            if (!microComps || microComps.length === 0) {
                res.status(404).json({message: `Micro-Components with plantID ${employee?.plantID} not found`});
            }

            res.json(microComps);
        } catch (e) {
            res.status(500).json({message: "Error getting micro components"});
        }
    });
}