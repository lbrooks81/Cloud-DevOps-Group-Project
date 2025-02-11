import { Component } from '@angular/core';
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
import {valueOf} from 'jasmine';

@Component({
  selector: 'app-database-table',
  imports: [],
  templateUrl: './database-table.component.html',
  standalone: true,
  styleUrl: './database-table.component.css'
})
export class DatabaseTableComponent {
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

  selectedTable: string = [];

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
              private vendorService: VendorService) {
    // Whenever we initialize this conponent
    // It gets these bitches


  }

  // Attach functionality to the initialization of the component.
  ngOnInit(): void{
    // Depending on table selection, display the database and then when it changes, call the correct function.
  }

  setSelectedTable(){
    let selectTableElement = <HTMLInputElement>document.querySelector('#database-choice-dropdown')!;
    this.selectedTable = selectTableElement.value;
  }

  /* I need to invent my own language where you can use variable values in variable names because this is ridiculous*/
  getCompanies() {
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
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
        this.departments = data;
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
        this.employees = data;
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
        this.microcomponents = data;
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
        this.orders = data;
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
        this.parts = data;
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
        this.permissionLevels = data;
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
        this.plants = data;
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
        this.purchasedParts = data;
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
        this.roles = data;
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
        this.vendors = data;
      },
      error:(error) => {
        this.errorMessage = 'Error fetching vendors';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }

}
