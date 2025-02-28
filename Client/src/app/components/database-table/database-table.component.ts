import {Component, OnInit} from '@angular/core';
import {PartModel} from '../../models/part.model';
import {PartService} from '../../services/part.service';
import {CompanyModel} from '../../models/company.model';
import {DepartmentModel} from '../../models/department.model';
import {EmployeeModel} from '../../models/employee.model';
import {MicrocomponentModel} from '../../models/microcomponent.model';
import {OrderModel} from '../../models/order.model';
import {PermissionLevelModel} from '../../models/permission-level.model';
import {PlantModel} from '../../models/plant.model';
import {PurchasedPartModel} from '../../models/purchased-part.model';
import {RoleModel} from '../../models/role.model';
import {VendorModel} from '../../models/vendor.model';
import {VendorService} from '../../services/vendor.service';
import {CompanyService} from '../../services/company.service';
import {DepartmentService} from '../../services/department.service';
import {EmployeeService} from '../../services/employee.service';
import {MicrocomponentService} from '../../services/microcomponent.service';
import {OrderService} from '../../services/order.service';
import {PermissionLevelService} from '../../services/permission-level.service';
import {PlantService} from '../../services/plant.service';
import {PurchasedPartService} from '../../services/purchased-part.service';
import {RoleService} from '../../services/role.service';
import {FormsModule} from '@angular/forms';
import {getCookie, setCookie} from '../../cookieShtuff';
import {Router} from '@angular/router';

@Component({
  selector: 'app-database-table',
  imports: [
    FormsModule
  ],
  templateUrl: './database-table.component.html',
  standalone: true,
  styleUrl: './database-table.component.css'
})
export class DatabaseTableComponent implements OnInit {
  companies: CompanyModel[] = [];
  departments: DepartmentModel[] = [];
  employees: EmployeeModel[] = [];
  microcomponents: MicrocomponentModel[] = [];
  orders: OrderModel[] = [];
  parts: PartModel[] = [];
  permissionLevels: PermissionLevelModel[] = [];
  plants: PlantModel[] = [];
  purchasedParts: PurchasedPartModel[] = [];
  roles: RoleModel[] = [];
  vendors: VendorModel[] = [];

  selectedTable: any[] = [];
  attributes: string[] = [];
  errorMessage: string = '';

  // We inject services via a constructor.
  constructor(private companyService: CompanyService,
              private departmentService: DepartmentService,
              private employeeService: EmployeeService,
              private microcomponentService: MicrocomponentService,
              private orderService: OrderService,
              private partService: PartService,
              private permissionLevelService: PermissionLevelService,
              private plantService: PlantService,
              private purchasedPartService: PurchasedPartService,
              private roleService: RoleService,
              private vendorService: VendorService,
              private router: Router
  ) {}

  // Attach functionality to the initialization of the component.
  ngOnInit(): void{
    setCookie('table-name', '');
    setCookie('record-id', '');
    // Depending on table selection, display the database and then when it changes, call the correct function.
    this.getEmployees();
    this.getCompanies();
    this.getDepartments();
    this.getMicrocomponents();
    this.getOrders();
    this.getParts();
    this.getPermissionLevels();
    this.getPlants();
    this.getPurchasedParts();
    this.getRoles();
    this.getVendors();
  }

  /*I have an array of objects. I need the name of every one of the keys*/
  setDataBeingViewed(event: Event){
    console.log("Selected Table", this.selectedTable); //
    this.attributes = this.getKeysFromArray();
    console.log("Keys", this.attributes);
  }

  getKeysFromArray(): string[] {
    if(this.selectedTable.length > 0)
    {
      return Object.keys(this.selectedTable[0]);
    }
    return [];
  }

  getTableName(): string {
    if (this.selectedTable === this.companies) return 'Companies';
    if (this.selectedTable === this.departments) return 'Departments';
    if (this.selectedTable === this.employees) return 'Employees';
    if (this.selectedTable === this.microcomponents) return 'Micro Components';
    if (this.selectedTable === this.orders) return 'Orders';
    if (this.selectedTable === this.parts) return 'Parts';
    if (this.selectedTable === this.permissionLevels) return 'Permission Levels';
    if (this.selectedTable === this.plants) return 'Plants';
    if (this.selectedTable === this.purchasedParts) return 'Purchased Parts';
    if (this.selectedTable === this.roles) return 'Roles';
    if (this.selectedTable === this.vendors) return 'Vendors';
    return '';
  }


  onRowClick(record: any) {
    const tableName = this.getTableName();
    const recordId: string = record[this.attributes[0]];

    setCookie('table-name', tableName.replace(/\s+/g, '-').toLowerCase());
    setCookie('record-id', recordId);
    console.log("Table name cookie:", getCookie('table-name'));
    console.log("Record id cookie:", getCookie('record-id'));

    this.router.navigate(['/record']);
  }

  /* I need to invent my own language where you can use variable values in variable names because this is ridiculous*/
  getCompanies() {
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = [...data];
        console.log("Companies", this.companies);
      },
      error:(error) => {
        this.errorMessage = 'Error fetching companies';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }
  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departments = [...data];
        console.log("Departments", this.departments);
      },
      error:(error) => {
        this.errorMessage = 'Error fetching departments';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }
  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = [...data];
        console.log("Employees", this.employees);
      },
      error:(error) => {
        this.errorMessage = 'Error fetching employees';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }
  getMicrocomponents() {
    this.microcomponentService.getMicrocomponents().subscribe({
      next: (data) => {
        this.microcomponents = [...data];
        console.log("Microcomponents", this.microcomponents);
      },
      error:(error) => {
        this.errorMessage = 'Error fetching microcomponents';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }
  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = [...data];
        console.log("Orders", this.orders);
      },
      error:(error) => {
        this.errorMessage = 'Error fetching orders';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }
  getParts() {
    this.partService.getParts().subscribe({
      next: (data) => {
        this.parts = [...data];
        console.log("Parts", this.parts);
      },
      error:(error) => {
        this.errorMessage = 'Error fetching parts';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }
  getPermissionLevels() {
    this.permissionLevelService.getPermissionLevels().subscribe({
      next: (data) => {
        this.permissionLevels = [...data];
        console.log("Permission Levels", this.permissionLevels);
      },
      error:(error) => {
        this.errorMessage = 'Error fetching permission levels';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }
  getPlants() {
    this.plantService.getPlants().subscribe({
      next: (data) => {
        this.plants = [...data];
        console.log("Plants", this.plants);
      },
      error:(error) => {
        this.errorMessage = 'Error fetching plants';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }
  getPurchasedParts() {
    this.purchasedPartService.getPurchasedParts().subscribe({
      next: (data) => {
        this.purchasedParts = [...data];
        console.log("Purchased Parts", this.purchasedParts);
      },
      error:(error) => {
        this.errorMessage = 'Error fetching purchased parts';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }
  getRoles() {
    this.roleService.getRoles().subscribe({
      next: (data) => {
        this.roles = [...data];
        console.log("Roles", this.roles);
      },
      error:(error) => {
        this.errorMessage = 'Error fetching roles';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }
  getVendors() {
    this.vendorService.getVendors().subscribe({
      next: (data) => {
        this.vendors = [...data];
        console.log("Vendors", this.vendors);
      },
      error:(error) => {
        this.errorMessage = 'Error fetching vendors';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }

}
