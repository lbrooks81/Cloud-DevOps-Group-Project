/* TABLE: VENDOR
VENDOR_ID INT PRIMARY KEY,
VENDOR_NAME VARCHAR(32),
VENDOR_ADDRESS VARCHAR(64),
VENDOR_ZIPCODE VARCHAR(5) */

import {Column, PrimaryColumn, Entity} from 'typeorm';
export {Vendor};

@Entity("VENDOR")
class Vendor
{
  @PrimaryColumn({name: "VENDOR_ID", type: "int", unsigned: true})
  vendorID!: number;

  @Column({name: "VENDOR_NAME", type: "varchar", length: 32})
  vendorName!: string;

  @Column({name: "VENDOR_ADDRESS", type: "varchar", length: 64})
  vendorAddress!: string;

  @Column({name: "VENDOR_ZIPCODE", type: "varchar", length: 5})
  vendorZipcode!: string;
}
