import {Column, PrimaryColumn, Entity} from 'typeorm';
export {MicroComponent};

@Entity("MICRO_COMPONENTS")
class MicroComponent {

  @PrimaryColumn({name: 'MC_SKU', type: 'int', unsigned: true})
  microComponentSKU!: number;

  @Column({name: 'MC_NAME', type: 'varchar', length: 32})
  microComponentName!: string;

  @Column({name: 'MC_DESCRIPTION', type: 'varchar', length: 128})
  microComponentDescript!: string;

  @Column({name: 'MC_COST', type: 'decimal', precision: 9, scale: 2})
  microComponentCost!: number;

  @Column({name: 'MC_QOH', type: 'int'})
  microComponentQoh!: number;

  @Column({name: 'MANUFACTURE_DATE', type: 'date'})
  manufactureDate!: Date;

  @Column({name: 'PLANT_ID', type: 'int', unsigned: true, nullable: true})
  plantID!: number | null;
}
