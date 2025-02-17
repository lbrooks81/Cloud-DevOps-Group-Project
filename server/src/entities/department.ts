import {Column, PrimaryColumn, Entity} from 'typeorm';
export {Department};

@Entity("DEPARTMENT")
class Department
{
  @PrimaryColumn({name: 'DEPT_ID', type: 'int', unsigned: true})
  departmentId!: number;

  @Column({name: 'DEPT_NAME', type: 'varchar', length: 64})
  departmentName!: string

  @Column({name: 'EMP_ID', type: 'int', unsigned: true, nullable: true})
  employeeID!: number

 @Column({name: 'PLANT_ID', type: 'int', unsigned: true, nullable: true})
 plantID!: number
}
