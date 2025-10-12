import * as employeeRepo from "../apis/employeeRepo";
import * as roleRepo from "../apis/roleRepo";
import type { Employee } from "../types/Employee";
import type { Role } from "../types/Role";

export function validateEmployee(employeeData: Omit<Employee, "id">): Map<string, string> {
  const errors = new Map<string, string>();

  if (!employeeData.name || employeeData.name.trim().length < 3) {
    errors.set("name", "Name must be at least 3 characters");
  }

  if (!employeeData.department || employeeData.department.trim().length < 3) {
    errors.set("department", "Department must be at least 3 characters");
  }

  if (!employeeData.position || employeeData.position.trim().length < 3) {
    errors.set("position", "Position must be at least 3 characters");
  }

  if (!employeeData.email || !employeeData.email.trim()) {
    errors.set("email", "Email is required");
  } else {
    
    const hasAtSign = employeeData.email.includes("@");
    const hasDot = employeeData.email.includes(".");
    if (!hasAtSign || !hasDot) {
      errors.set("email", "Email must be valid");
    }
  }

  if (employeeData.position && employeeData.department) {
    const positionTaken = employeeRepo.isPositionFilled(
      employeeData.position, 
      employeeData.department
    );
    
    if (positionTaken) {
      errors.set("position", `The position "${employeeData.position}" is already filled in ${employeeData.department}`);
    }
  }

  return errors;
}

export function validateRole(roleData: Omit<Role, "id">): Map<string, string> {
  const errors = new Map<string, string>();

  if (!roleData.name || roleData.name.trim().length < 3) {
    errors.set("name", "Role name must be at least 3 characters");
  }


  if (!roleData.department || roleData.department.trim().length < 3) {
    errors.set("department", "Department must be at least 3 characters");
  }

  if (roleData.name && roleData.department) {
    const alreadyExists = roleRepo.roleExists(roleData.name, roleData.department);
    
    if (alreadyExists) {
      errors.set("name", `Role "${roleData.name}" already exists in ${roleData.department}`);
    }
  }

  return errors;
}