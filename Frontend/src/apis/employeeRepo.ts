const API = "http://localhost:3000/api/employees";

export async function getEmployees() {
  const res = await fetch(API);
  return await res.json();
}

export async function createEmployee(employee: any) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create employee');
  }
  
  return await res.json();
}

export async function deleteEmployee(id: string) {
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to delete employee');
  }
  
  return await res.json();
}

export async function isPositionFilled(position: string, department: string) {
  const employees = await getEmployees();
  return employees.some((e: any) => e.position === position && e.department === department);
}