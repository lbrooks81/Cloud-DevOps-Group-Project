import { Column, PrimaryColumn, Entity } from 'typeorm';
export {Part};

@Entity("PART")
class Part
{
  @PrimaryColumn({name: 'PART_ID', type: 'int', unsigned: true})
  partId!: number;

  @Column({name: 'PART_NAME', type: 'varchar', length: 64})
  partName!: string;

  @Column({name: 'PART_DESCRIPTION', type: 'varchar', length: 64})
  partDescription!: string;

  @Column({name: 'PART_COST', type: 'decimal', precision: 9, scale: 2})
  partCost!: number;

  @Column({name: 'PART_QOH', type: 'int'})
  partQoh!: number;

  @Column({name: 'VENDOR_ID', type: 'int', unsigned: true, nullable: true})
  vendorId!: number | null;
}
