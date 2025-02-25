import {Column, PrimaryColumn, Entity} from 'typeorm';
export {Orders};

@Entity("ORDERS")
class Orders
{
  @PrimaryColumn({name: 'MC_SKU', type: 'int', unsigned: true})
  microComponentSKU!: number;

  @PrimaryColumn({name: 'COMPANY_ID', type: 'int', unsigned: true})
  companyId!: number;

  @Column({name: 'ORDER_DATE', type: 'date'})
  orderDate!: Date;

  @Column({name: 'ORDER_QUANTITY', type: 'int'})
  orderQuantity!: number;
}
