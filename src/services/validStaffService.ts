import * as employeeRepo from "../apis/employeeRepo";
import * as roleRepo from "../apis/roleRepo";

export async function createEmployee(employee) {
  return await employeeRepo.createEmployee(employee);
}

export async function createRole(role) {
  return await roleRepo.createRole(role);
}

export function validateEmployee(employee) {
  const errors = new Map();

  if (!employee.name?.trim() || employee.name.trim().length < 3) {
    errors.set("name", "Name must be at least 3 characters");
  }

  if (!employee.position?.trim() || employee.position.trim().length < 3) {
    errors.set("position", "Position must be at least 3 characters");
  }

  if (employee.position && employee.department) {
    if (employeeRepo.isPositionFilled(employee.position, employee.department)) {
      errors.set("position", "Position already filled");
    }
  }

  return errors;
}

export function validateRole(role) {
  const errors = new Map();

  if (!role.name?.trim() || role.name.trim().length < 3) {
    errors.set("name", "Role name must be at least 3 characters");
  }

  if (role.name && role.department) {
    if (roleRepo.roleExists(role.name, role.department)) {
      errors.set("name", "Role already exists");
    }
  }

  return errors;
}