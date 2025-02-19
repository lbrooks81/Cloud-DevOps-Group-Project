import { Entity, Column, PrimaryColumn} from 'typeorm';
export {Roles};

@Entity("ROLES")
class Roles
{
  @PrimaryColumn({name: 'ROLE_ID', type: 'int'})
  roleId!: number;

  @Column({name: 'ROLE_TITLE', type: 'varchar', length: 32})
  roleTitle!: string;

  @Column({name: 'PL_ID', type: 'int'})
  plantId!: number;
}
