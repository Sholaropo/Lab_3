const API = "http://localhost:3000/api/roles";

export async function getRoles(getToken: () => Promise<string | null>) {
  const token = await getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const res = await fetch(API, { headers });
  
  if (!res.ok) {
    throw new Error('Failed to fetch roles');
  }
  
  return await res.json();
}

export async function getRolesByDepartment(dept: string, getToken: () => Promise<string | null>) {
  const token = await getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const res = await fetch(`${API}?department=${encodeURIComponent(dept)}`, { headers });
  
  if (!res.ok) {
    throw new Error('Failed to fetch roles');
  }
  
  return await res.json();
}

export async function createRole(role: any, getToken: () => Promise<string | null>) {
  const token = await getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const res = await fetch(API, {
    method: 'POST',
    headers,
    body: JSON.stringify(role)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create role');
  }
  
  return await res.json();
}

export async function deleteRole(id: string, getToken: () => Promise<string | null>) {
  const token = await getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const res = await fetch(`${API}/${id}`, { 
    method: 'DELETE',
    headers
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to delete role');
  }
  
  return await res.json();
}

export async function roleExists(name: string, dept: string, getToken: () => Promise<string | null>) {
  const roles = await getRoles(getToken);
  return roles.some((r: any) => r.name === name && r.department === dept);
}