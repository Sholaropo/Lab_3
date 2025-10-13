import type { Role } from "../types/Role";

const STORAGE_KEY = "roles";

export function getRoles(): Role[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

export function getRoleById(id: string): Role | undefined {
  const allRoles = getRoles();
  return allRoles.find((role) => role.id === id);
}

export function getRolesByDepartment(department: string): Role[] {
  const allRoles = getRoles();
  return allRoles.filter((role) => role.department === department);
}

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

export function deleteRole(id: string): boolean {
  const allRoles = getRoles();
  const remainingRoles = allRoles.filter((role) => role.id !== id);

  if (remainingRoles.length === allRoles.length) {
    return false;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(remainingRoles));
  return true;
}

export function roleExists(roleName: string, department: string): boolean {
  const allRoles = getRoles();
  
  const alreadyExists = allRoles.some((role) => 
    role.name === roleName && role.department === department
  );
  
  return alreadyExists;
}