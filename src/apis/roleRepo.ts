const STORAGE_KEY = "roles";

export function getRoles() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getRolesByDepartment(department) {
  return getRoles().filter(role => role.department === department);
}

export function createRole(role) {
  const roles = getRoles();
  const newRole = { ...role, id: crypto.randomUUID() };
  roles.push(newRole);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
  return newRole;
}

export function deleteRole(id) {
  const roles = getRoles().filter(role => role.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
  return true;
}

export function roleExists(roleName, department) {
  return getRoles().some(role => 
    role.name === roleName && role.department === department
  );
}