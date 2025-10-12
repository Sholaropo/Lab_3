// This file handles saving and loading roles from storage

import type { Role } from "../types/Role";

const STORAGE_KEY = "roles";

// Get all roles from storage
export function getRoles(): Role[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

// Find one role by its ID
export function getRoleById(id: string): Role | undefined {
  const allRoles = getRoles();
  return allRoles.find((role) => role.id === id);
}

// Get all roles for a specific department
export function getRolesByDepartment(department: string): Role[] {
  const allRoles = getRoles();
  return allRoles.filter((role) => role.department === department);
}

// Add a new role
export function createRole(roleData: Omit<Role, "id">): Role {
  const allRoles = getRoles();
  
  const newRole: Role = {
    ...roleData,
    id: crypto.randomUUID(),
  };
  
  allRoles.push(newRole);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allRoles));
  
  return newRole;
}

// Update an existing role
export function updateRole(id: string, changes: Partial<Omit<Role, "id">>): Role | null {
  const allRoles = getRoles();
  const roleIndex = allRoles.findIndex((role) => role.id === id);

  if (roleIndex === -1) {
    return null;
  }

  allRoles[roleIndex] = { 
    ...allRoles[roleIndex], 
    ...changes 
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allRoles));
  return allRoles[roleIndex];
}

// Remove a role
export function deleteRole(id: string): boolean {
  const allRoles = getRoles();
  const remainingRoles = allRoles.filter((role) => role.id !== id);

  if (remainingRoles.length === allRoles.length) {
    return false;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(remainingRoles));
  return true;
}

// Check if this role already exists in this department
export function roleExists(roleName: string, department: string): boolean {
  const allRoles = getRoles();
  
  const alreadyExists = allRoles.some((role) => 
    role.name === roleName && role.department === department
  );
  
  return alreadyExists;
}