import {DataSource} from 'typeorm';
import {Department} from './entities/department';
import {Plant} from './entities/plant';
import {PermissionLevel} from './entities/permission-level';
import {Roles} from './entities/roles';
import {Vendor} from './entities/vendor';
import {Part} from './entities/part';
import {PurchasedPart} from './entities/purchased-part';
import {Employee} from './entities/employee';

export { ServerData };

//Server Data Source
const ServerData = new DataSource({
  type: "mssql",
  host: "it239-devops.database.windows.net",
  port: 1433,
  username: 'IT239',
  password: 'Devops239!@',
  database: 'DevOps239',
  synchronize: false,
  logging: true,
  entities: [Employee, Department, Plant, PermissionLevel, Roles, Vendor, Part, PurchasedPart],
  subscribers: [],
  migrations: []
});
