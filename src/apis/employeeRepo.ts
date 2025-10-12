import type { Employee } from "../types/Employee";

const STORAGE_KEY = "employees";

export function getEmployees(): Employee[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getEmployeeById(id: string): Employee | undefined {
  const employees = getEmployees();
  return employees.find((emp) => emp.id === id);
}

export function createEmployee(employee: Omit<Employee, "id">): Employee {
  const employees = getEmployees();
  const newEmployee: Employee = {
    ...employee,
    id: crypto.randomUUID(),
  };
  employees.push(newEmployee);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  return newEmployee;
}

export function updateEmployee(id: string, updates: Partial<Omit<Employee, "id">>): Employee | null {
  const employees = getEmployees();
  const index = employees.findIndex((emp) => emp.id === id);

  if (index === -1) return null;

  employees[index] = { ...employees[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  return employees[index];
}

export function deleteEmployee(id: string): boolean {
  const employees = getEmployees();
  const filtered = employees.filter((emp) => emp.id !== id);

  if (filtered.length === employees.length) return false;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function isPositionFilled(position: string, department: string): boolean {
  const employees = getEmployees();
  return employees.some((emp) => emp.position === position && emp.department === department);
}