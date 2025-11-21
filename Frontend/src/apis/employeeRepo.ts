const API = "http://localhost:3000/api/employees";

// Helper to get token - MUST be called from a component with useAuth
export async function getEmployees(getToken: () => Promise<string | null>) {
  const token = await getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const res = await fetch(API, { headers });
  
  if (!res.ok) {
    throw new Error('Failed to fetch employees');
  }
  
  return await res.json();
}

export async function createEmployee(employee: any, getToken: () => Promise<string | null>) {
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
    body: JSON.stringify(employee)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create employee');
  }
  
  return await res.json();
}

export async function deleteEmployee(id: string, getToken: () => Promise<string | null>) {
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
    throw new Error(error.error || 'Failed to delete employee');
  }
  
  return await res.json();
}

export async function isPositionFilled(position: string, department: string, getToken: () => Promise<string | null>) {
  const employees = await getEmployees(getToken);
  return employees.some((e: any) => e.position === position && e.department === department);
}