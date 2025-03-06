export interface ProfileModel {
  employeeID: number;
  firstName: string;
  lastName: string;
  email: string | null;
  username: string | null;
  password: string | null;
  phoneNum: number | null;
  plantID: number | null;
  roleID: number;
  roleTitle: string;
  departmentID: number;
  departmentName: string;
}
