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
    app.get('/vendors', async (req, res) => {
        const vendors = await ServerData.getRepository(Vendor).find();
        res.json(vendors);
    });

    // get vendor by id
    app.get('/vendors/:id', async (req, res) => {
        const id = Number(req.params.id);

        const vendor = await ServerData.getRepository(Vendor).findOneBy({
            vendorID: id
        });

        if (!vendor) {
            res.status(404).json({
                message: `Vendor with ID ${id} not found`
            });
        } else {
            res.json(vendor);
        }
    });

    // update a specific vendor based on an id
    app.put('/vendors/:id', async (req, res) => {
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
            res.json(vendor);
        }
    });

    // delete a specific vendor based on an id
    app.delete('/vendors/:id', async (req, res) => {
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
            res.json({
                message: `Vendor with ID ${id} has been deleted`
            });
        }
    });

    // create a new vendor
    app.post('/vendors', async (req, res) => {
        const vendorData = req.body;

        const vendorRepository = ServerData.getRepository(Vendor);
        const newVendor = vendorRepository.create({
            vendorID: vendorData.vendorID,
            vendorName: vendorData.vendorName,
            vendorAddress: vendorData.vendorAddress,
            vendorZipcode: vendorData.vendorZipcode
        });

        await vendorRepository.save(newVendor);
        res.json(newVendor);
    });

    // Employees can only view vendors that supplied parts in their plant - DONE
    app.get('/our-vendors/:id', async (req, res) => {
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
                /*res.json(parts);*/
                const vendorIDs: (number | null)[] = parts.map((part) => part.vendorId);
                const vendors: Vendor[] | null = await ServerData.getRepository(Vendor).find({
                    where: {
                        vendorID: In(vendorIDs)
                    }
                });

                if (!vendors) {
                    res.status(404).json({
                        message: `Vendors with Plant ID ${plantIdentification} not found`
                    });
                } else {
                    res.json(vendors);
                }
            }
        }
    });
}