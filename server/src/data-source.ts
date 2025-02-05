export { ServerData };

import {DataSource} from 'typeorm';

//Server Data Source
const ServerData = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  //username: ''
  //password: ''
  //database: ''
  synchronize: false,
  logging: true,
  //TODO: Get the database .sql file to run locally for testing
  //entities: [Employee, Department, Plant, MicroComponents, Company, Orders, PermissionLevel, Roles, Vendor, Part, ManufacturedPart]
  subscribers: [],
  migrations: []
});
