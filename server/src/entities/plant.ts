/* TABLE: PLANT
PLANT_ID INT PRIMARY KEY,
PLANT_ADDRESS VARCHAR(92),
PLANT_ZIPCODE VARCHAR(5),
MANAGER_ID INT FOREIGN KEY */

import {Column, PrimaryColumn, Entity} from 'typeorm';
export {Plant};
@Entity("PLANT")
class Plant
{
  @PrimaryColumn({name: "PLANT_ID", type: "int", unsigned: true})
  plantId!: number;

  @Column({name: "PLANT_ADDRESS", type: "varchar", length: 92})
  plantAddress!: string;

  @Column({name: "PLANT_ZIPCODE", type: "varchar", length: 5})
  plantZipcode!: string;

  @Column({name: "MANAGER_ID", type: "int", unsigned: true, nullable: true})
  managerID!: number | null;
}
