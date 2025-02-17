/* TABLE: COMPANY
COMPANY_ID INT PRIMARY KEY,
COMPANY_NAME VARCHAR(35),
COMPANY_LOCATION VARCHAR(128) */

import {Column, PrimaryColumn, Entity} from 'typeorm';
export {Company};
@Entity("COMPANY")
class Company
{
  @PrimaryColumn({name: "COMPANY_ID", type: "int", unsigned: true})
  companyID!: number;

  @Column({name: "COMPANY_NAME", type: "varchar", length: 35})
  companyName!: string;

  @Column({name: "COMPANY_LOCATION", type: "varchar", length: 128})
  companyLocation!: string;
}
