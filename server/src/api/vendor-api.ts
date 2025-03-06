import {ServerData} from '../data-source';
import {Vendor} from '../entities/vendor';
import {app} from '../server';
import {Employee} from "../entities/employee";
import {PurchasedPart} from "../entities/purchased-part";
import {Part} from "../entities/part";
import {In} from "typeorm";
export {vendorRequests};

async function vendorRequests() {
    //================================= VENDOR =================================
    // get all vendors
    // BUTTS
    app.get('/vendors', async (req, res) => {
        try {
            const vendors = await ServerData.getRepository(Vendor).find();
            res.status(200).json(vendors);
        }
        catch (e) {
            res.status(500).json({
                message: "Error fetching all vendors"
            });
        }
    });

    // get vendor by id
    // BUTTS
    app.get('/vendors/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);

            const vendor = await ServerData.getRepository(Vendor).findOneBy({
                vendorID: id
            });

            if (!vendor) {
                res.status(404).json({
                    message: `Vendor with ID ${id} not found`
                });
            } else {
                res.status(200).json(vendor);
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error fetching vendor by ID"
            });
        }
    });

    // update a specific vendor based on an id
    // BUTTS
    app.put('/vendors/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const vendorData = req.body;

            const vendorRepository = ServerData.getRepository(Vendor);
            const vendor = await vendorRepository.findOneBy({
                vendorID: id
            });

            if (!vendor) {
                res.status(404).json({
                    message: `Vendor with ID ${id} not found`
                });
            } else {
                vendor.vendorID = vendorData.vendorID;
                vendor.vendorName = vendorData.vendorName;
                vendor.vendorAddress = vendorData.vendorAddress;
                vendor.vendorZipcode = vendorData.vendorZipcode;

                await vendorRepository.save(vendor);
                res.status(204).json(vendor);
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error updating vendor by ID"
            });
        }
    });

    // delete a specific vendor based on an id
    // BUTTS
    app.delete('/vendors/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const vendorRepository = ServerData.getRepository(Vendor);
            const vendor = await vendorRepository.findOneBy({
                vendorID: id
            });

            if (!vendor) {
                res.status(404).json({
                    message: `Vendor with ID ${id} not found`
                });
            } else {
                await vendorRepository.delete(vendor);
                res.status(204).json({
                    message: `Vendor with ID ${id} has been deleted`
                });
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error deleting vendor by ID"
            });
        }
    });

    // create a new vendor
    // BUTTS
    app.post('/vendors', async (req, res) => {
        try {
            const vendorData = req.body;

            const vendorRepository = ServerData.getRepository(Vendor);
            const newVendor = vendorRepository.create({
                vendorID: vendorData.vendorID,
                vendorName: vendorData.vendorName,
                vendorAddress: vendorData.vendorAddress,
                vendorZipcode: vendorData.vendorZipcode
            });

            await vendorRepository.save(newVendor);
            res.status(201).json(newVendor);
        }
        catch (e) {
            res.status(500).json({
                message: "Error creating vendor"
            });
        }
    });

    // Employees can only view vendors that supplied parts in their plant - DONE
    // BUTTS
    app.get('/our-vendors/:id', async (req, res) => {
        let message;
        let found = true;
        try {
            // GET EMPLOYEE BY ID
            const id = Number(req.params.id);
            let plantIdentification: number | undefined;

            const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
                employeeID: id
            });

            if (!employee) {
                message = `Employee with ID ${id} not found`;
                found = false;
/*                res.status(404).json({
                    message: `Employee with ID ${id} not found`
                });*/
            } else {
                plantIdentification = employee.plantID;


                // GET PURCHASED PARTS BY PLANT ID
                const purPart: PurchasedPart[] | null = await ServerData.getRepository(PurchasedPart).find({
                    where: {
                        plantID: plantIdentification
                    }
                });

                if (!purPart) {
                    found = false;
                    message = `Purchased Parts with Plant ID ${plantIdentification} not found`;
                    /*                res.status(404).json({
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
                        /*                    res.status(404).json({
                                                message: `Parts with Plant ID ${plantIdentification} not found`
                                            });*/
                    } else {
                        /*res.json(parts);*/
                        const vendorIDs: (number | null)[] = parts.map((part) => part.vendorId);
                        const vendors: Vendor[] | null = await ServerData.getRepository(Vendor).find({
                            where: {
                                vendorID: In(vendorIDs)
                            }
                        });

                        if (!vendors) {
                            found = false;
                            message = `Vendors with Plant ID ${plantIdentification} not found`;
                            /*              res.status(404).json({
                                              message: `Vendors with Plant ID ${plantIdentification} not found`
                                          });*/
                        } else {
                            message = vendors;
                            /*
                                                    res.json(vendors);
                            */
                        }
                    }
                }
            }

            if (found) {
                res.status(200).json(message);
            } else {
                res.status(404).json({
                    message: message
                });
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error fetching vendors by plant ID for this employee's plant"
            });
        }
    });
}