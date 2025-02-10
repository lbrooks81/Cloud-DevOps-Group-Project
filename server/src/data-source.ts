import {DataSource} from 'typeorm';
import {Department} from './entities/department';
import {Plant} from './entities/plant';
import {MicroComponent} from './entities/micro-component';
import {Company} from './entities/company';
import {Orders} from './entities/orders';
import {PermissionLevel} from './entities/permission-level';
import {Roles} from './entities/roles';
import {Vendor} from './entities/vendor';
import {Part} from './entities/part';
import {ManufacturedPart} from './entities/manufactured-part';
import {Employee} from './entities/employee';

export { ServerData };

//Server Data Source
const ServerData = new DataSource({
  type: "mysql",
  host: "it239-devops.database.windows.net",
  port: 1433,
  username: 'IT239',
  password: 'Devops239!@',
  database: 'it239-devops.database.windows.net',
  synchronize: false,
  logging: true,
  entities: [Employee, Department, Plant, MicroComponent, Company, Orders, PermissionLevel, Roles, Vendor, Part, ManufacturedPart],
  subscribers: [],
  migrations: []
});
