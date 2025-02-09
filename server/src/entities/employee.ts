/* TABLE: EMPLOYEE
EMP_ID INT PRIMARY KEY,
EMP_FNAME VARCHAR(32) NOT NULL,
EMP_LNAME VARCHAR(32) NOT NULL,
EMP_EMAIL VARCHAR(64),
EMP_USERNAME VARCHAR(64),
EMP_PASSWORD VARCHAR(128),
EMP_PHONE_NUM INT,
EMP_ROLE_ID INT, FOREIGN KEY
DEPT_ID INT FOREIGN KEY */

import {Column, PrimaryColumn, Entity} from 'typeorm';
export {Employee};
@Entity("EMPLOYEE")
class Employee
{
  @PrimaryColumn({name: "EMP_ID", type: "int", unsigned: true})
  employeeID!: number;

  @Column({name: "EMP_FNAME", type: "varchar", length: 32})
  employeeFirstName!: string;

  @Column({name: "EMP_LNAME", type: "varchar", length: 32})
  employeeLastName!: string;

  @Column({name: "EMP_EMAIL", type: "varchar", length: 64})
  employeeEmail!: string;

  @Column({name: "EMP_USERNAME", type: "varchar", length: 64})
  employeeUsername!: string;

  @Column({name: "EMP_PASSWORD", type: "varchar", length: 128})
  employeePassword!: string;

  @Column({name: "EMP_PHONE_NUM", type: "int", unsigned: true})
  employeePhoneNum!: number;

  @Column({name: "EMP_ROLE_ID", type: "int", unsigned: true})
  employeeRoleID!: number;

  @Column({name: "DEPT_ID", type: "int", unsigned: true, nullable: true})
  departmentID!: number | null;
}
