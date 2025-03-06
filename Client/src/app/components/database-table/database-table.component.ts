import {Component, OnInit} from '@angular/core';
import {PartModel} from '../../models/part.model';
import {PartService} from '../../services/part.service';
import {DepartmentModel} from '../../models/department.model';
import {EmployeeModel} from '../../models/employee.model';
import {PermissionLevelModel} from '../../models/permission-level.model';
import {PlantModel} from '../../models/plant.model';
import {PurchasedPartModel} from '../../models/purchased-part.model';
import {RoleModel} from '../../models/role.model';
import {VendorModel} from '../../models/vendor.model';
import {VendorService} from '../../services/vendor.service';
import {DepartmentService} from '../../services/department.service';
import {EmployeeService} from '../../services/employee.service';
import {PermissionLevelService} from '../../services/permission-level.service';
import {PlantService} from '../../services/plant.service';
import {PurchasedPartService} from '../../services/purchased-part.service';
import {RoleService} from '../../services/role.service';
import {FormsModule} from '@angular/forms';
import {getCookie, setCookie} from '../../cookieShtuff';
import {Router} from '@angular/router';
import {MicroComponentModel} from '../../models/micro-component.model';
import {MicroComponentService} from '../../services/micro-component.service';
import {NgOptimizedImage} from '@angular/common';

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
  departments: DepartmentModel[] = [];
  employees: EmployeeModel[] = [];
  microComponents: MicroComponentModel[] = [];
  parts: PartModel[] = [];
  permissionLevels: PermissionLevelModel[] = [];
  plants: PlantModel[] = [];
  purchasedParts: PurchasedPartModel[] = [];
  roles: RoleModel[] = [];
  vendors: VendorModel[] = [];
  empID: number = 0;

  selectedTable: any[] = [];
  attributes: string[] = [];
  errorMessage: string = '';

  // We inject services via a constructor.
  constructor(private departmentService: DepartmentService,
              private employeeService: EmployeeService,
              private microComponentService: MicroComponentService,
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
    setCookie('record', '');
    this.empID = parseInt(getCookie('employee-id'));
    // Depending on table selection, display the database and then when it changes, call the correct function.
    this.getEmployees();
    this.getDepartments();
    this.getParts();
    this.getRoles();
    this.getMicroComponents();
    this.getPlants();
    this.getPurchasedParts();
    this.getVendors();
    // When the component loads, choose Employees from the drop down TODO
  }

  async addNewRecord() {
    setCookie('record', 'add');
    await this.router.navigate(['/record']);

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
    if (this.selectedTable === this.departments) return 'departments';
    if (this.selectedTable === this.employees) return 'employees';
    if (this.selectedTable === this.microComponents) return 'micro-components';
    if (this.selectedTable === this.parts) return 'parts';
    if (this.selectedTable === this.permissionLevels) return 'permission-levels';
    if (this.selectedTable === this.plants) return 'plants';
    if (this.selectedTable === this.purchasedParts) return 'purchased-parts';
    if (this.selectedTable === this.roles) return 'roles';
    if (this.selectedTable === this.vendors) return 'vendors';
    else {
      return "";
    }
  }


  onRowClick(record: any) {
      console.log(this.permissionLevels);
    if(this.permissionLevels.length > 1) {

      console.log(JSON.stringify(record));


      const tableName = this.getTableName().replace(/\s+/g, '-').toLowerCase();
      const recordString = JSON.stringify(record);

      setCookie('table-name', tableName);
      setCookie('record', recordString);
      console.log("Table name cookie:", tableName);
      console.log("Record id cookie:", recordString);


      this.router.navigate(['/record']).then(() => {console.log(`Navigated to ${tableName}, record=${recordString}`)});
    }
    else{
      alert("You do not have write permissions");
    }
  }


  getMicroComponents(){
    this.microComponentService.getMicroComponents(this.empID).subscribe(({
      next: (data) => {
        this.microComponents = [...data];
        console.log("Micro Components", this.microComponents);
      },
      error:(error) => {
        this.errorMessage = 'Error fetching micro components';
        console.error(`${this.errorMessage}`, error);
      }
    }))
  }

  getDepartments() {
    this.departmentService.getDepartments(this.empID).subscribe({
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
    this.employeeService.getEmployees(this.empID).subscribe({
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
    this.permissionLevelService.getPermissionLevels(this.empID).subscribe({
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
  getPermissionLevelsHigher() {
    this.permissionLevelService.getPermissionLevelHigher().subscribe({
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
    this.plantService.getPlants(this.empID).subscribe({
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
    this.purchasedPartService.getPurchasedParts(this.empID).subscribe({
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
    this.roleService.getRoles(this.empID).subscribe({
      next: (data) => {
        this.roles = [...data];
        console.log("Roles", this.roles);
        if([4, 8, 11, 12].includes(this.roles[0]["roleId"])) {
          this.getRolesHigher();
          this.getPermissionLevelsHigher();
        }
        else{
          this.getPermissionLevels();
        }
      },
      error:(error) => {
        this.errorMessage = 'Error fetching roles';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }

  getRolesHigher() {
    this.roleService.getRolesHigher().subscribe({
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
    this.vendorService.getVendors(this.empID).subscribe({
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
