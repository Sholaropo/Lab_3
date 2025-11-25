import * as employeeRepo from "../apis/employeeRepo";
import * as roleRepo from "../apis/roleRepo";

export async function createEmployee(employee: any, getToken: () => Promise<string | null>) {
  return await employeeRepo.createEmployee(employee, getToken);
}

export async function createRole(role: any, getToken: () => Promise<string | null>) {
  return await roleRepo.createRole(role, getToken);
}

export async function validateEmployee(employee: any, getToken: () => Promise<string | null>) {
  const errors = new Map<string, string>();

  if (!employee.name?.trim() || employee.name.trim().length < 3) {
    errors.set("name", "Name must be at least 3 characters");
  }

  if (!employee.position?.trim() || employee.position.trim().length < 3) {
    errors.set("position", "Position must be at least 3 characters");
  }

  if (employee.position && employee.department) {
    if (await employeeRepo.isPositionFilled(employee.position, employee.department, getToken)) {
      errors.set("position", "Position already filled");
    }
  }

  return errors;
}

export async function validateRole(role: any, getToken: () => Promise<string | null>) {
  const errors = new Map<string, string>();

  if (!role.name?.trim() || role.name.trim().length < 3) {
    errors.set("name", "Role name must be at least 3 characters");
  }

  if (role.name && role.department) {
    if (await roleRepo.roleExists(role.name, role.department, getToken)) {
      errors.set("name", "Role already exists");
    }
  }

  return errors;
}