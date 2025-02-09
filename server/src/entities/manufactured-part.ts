/* TABLE: MANUFACTURED_PART
PLANT_ID INT NOT NULL, FOREIGN KEY
PART_ID INT NOT NULL, FOREIGN KEY
MANUFACTURE_DATE DATE, */

import {Column, PrimaryColumn, Entity} from 'typeorm';
export {ManufacturedPart};

@Entity("MANUFACTURED_PART")
class ManufacturedPart
{
  @PrimaryColumn({name: "PLANT_ID", type: "int", unsigned: true})
  plantID!: number;

  @PrimaryColumn({name: "PART_ID", type: "int", unsigned: true})
  partID!: number;

  @Column({name: "MANUFACTURE_DATE", type: "date"})
  manufactureDate!: string;
}
