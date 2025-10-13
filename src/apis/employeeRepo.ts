const STORAGE_KEY = "employees";

export function getEmployees() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function createEmployee(employee) {
  const employees = getEmployees();
  const newEmployee = { ...employee, id: crypto.randomUUID() };
  employees.push(newEmployee);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  return newEmployee;
}

export function deleteEmployee(id) {
  const employees = getEmployees().filter(emp => emp.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  return true;
}

export function isPositionFilled(position, department) {
  return getEmployees().some(emp => 
    emp.position === position && emp.department === department
  );
}