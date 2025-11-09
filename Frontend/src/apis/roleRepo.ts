const API = "http://localhost:3000/api/roles";

export async function getRoles() {
  const res = await fetch(API);
  return await res.json();
}

export async function getRolesByDepartment(dept: string) {
  const res = await fetch(`${API}?department=${encodeURIComponent(dept)}`);
  return await res.json();
}

export async function createRole(role: any) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(role)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create role');
  }
  
  return await res.json();
}

export async function deleteRole(id: string) {
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to delete role');
  }
  
  return await res.json();
}

export async function roleExists(name: string, dept: string) {
  const roles = await getRoles();
  return roles.some((r: any) => r.name === name && r.department === dept);
}