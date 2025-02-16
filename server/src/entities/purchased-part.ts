/* TABLE: PURCHASED_PART
PLANT_ID INT NOT NULL, FOREIGN KEY
PART_ID INT NOT NULL, FOREIGN KEY
PURCHASED_DATE DATE,
PART_QOH INT NOT NULL */

import {Column, PrimaryColumn, Entity} from 'typeorm';
export {PurchasedPart};

@Entity("PURCHASED_PART")
class PurchasedPart
{
  @PrimaryColumn({name: "PLANT_ID", type: "int", unsigned: true})
  plantID!: number;

  @PrimaryColumn({name: "PART_ID", type: "int", unsigned: true})
  partID!: number;

  @Column({name: "PURCHASED_DATE", type: "date"})
  date!: string;

  @Column({name: "PART_QOH", type: "int", unsigned: true})
  quantityOnHand!: number;
}
