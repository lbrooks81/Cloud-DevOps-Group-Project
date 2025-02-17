/* TABLE: PERMISSION_LEVEL
PL_ID INT PRIMARY KEY,
PERMISSION_LEVEL VARCHAR(16) */

import {Column, PrimaryColumn, Entity} from 'typeorm';
export {PermissionLevel};
@Entity("PERMISSION_LEVEL")
class PermissionLevel
{
  @PrimaryColumn({name: "PL_ID", type: "int", unsigned: true})
  permissionLevelID!: number;

  @Column({name: "PERMISSION_LEVEL", type: "varchar", length: 16})
  permissionLevel!: string;
}
