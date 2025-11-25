import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useEntryForm } from "../hooks/useEntryForm";
import * as employeeRepo from "../apis/employeeRepo";
import * as roleRepo from "../apis/roleRepo";
import type { Employee } from "../types/Employee";
import type { Role } from "../types/Role";

export const EmployeeList: React.FC = () => {
  const { getToken } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const { formData, errors, updateField, handleSubmit, resetForm } = useEntryForm("employee");

  const employeeFormData = formData as { name: string; department: string; position: string; email: string };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (employeeFormData.department) {
      loadPositionsForDepartment(employeeFormData.department);
    } else {
      setPositions([]);
    }
  }, [employeeFormData.department]);

  const loadInitialData = async () => {
    setLoading(true);
    await loadEmployees();
    await loadDepartments();
    setLoading(false);
  };

  const loadEmployees = async () => {
    const data = await employeeRepo.getEmployees(getToken);
    setEmployees(data);
  };

  const loadDepartments = async () => {
    const roles = await roleRepo.getRoles(getToken);
    const uniqueDepts = Array.from(new Set(roles.map((role: Role) => role.department)));
    setDepartments(uniqueDepts);
  };

  const loadPositionsForDepartment = async (department: string) => {
    const roles = await roleRepo.getRolesByDepartment(department, getToken);
    setPositions(roles.map((role: Role) => role.name));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) {
      await loadEmployees();
      setShowForm(false);
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    await employeeRepo.deleteEmployee(id, getToken);
    await loadEmployees();
  };
  
  const filteredEmployees = employees.filter((employee) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchLower) ||
      employee.department.toLowerCase().includes(searchLower) ||
      employee.position.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
  }

  return (
    <div className="employee-section">
      <h2>Employee Directory</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#2c5282",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {showForm ? "Cancel" : "Add New Employee"}
      </button>

      {/* Form to add new employee */}
      {showForm && (
        <form
          onSubmit={onSubmit}
          style={{
            marginBottom: "30px",
            padding: "20px",
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>Add New Employee</h3>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
              Name:
            </label>
            <input
              id="name"
              type="text"
              value={employeeFormData.name}
              onChange={(e) => updateField("name", e.target.value)}
              style={{ width: "100%", padding: "8px", fontSize: "14px" }}
            />
            {errors.has("name") && (
              <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {errors.get("name")}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="department" style={{ display: "block", marginBottom: "5px" }}>
              Department:
            </label>
            <select
              id="department"
              value={employeeFormData.department}
              onChange={(e) => updateField("department", e.target.value)}
              style={{ width: "100%", padding: "8px", fontSize: "14px" }}
            >
              <option value="">-- Select Department --</option>
              <option value="computer science"> computer science </option>
              <option value="Management"> Management </option>
              <option value="IT Developer"> IT Developer </option>
              <option value="Physics"> Physics </option>
          
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.has("department") && (
              <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {errors.get("department")}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="position" style={{ display: "block", marginBottom: "5px" }}>
              Position:
            </label>
            <select
              id="position"
              value={employeeFormData.position}
              onChange={(e) => updateField("position", e.target.value)}
              style={{ width: "100%", padding: "8px", fontSize: "14px" }}
          
            >
              <option value="">-- Select Position --</option>
              <option value="professor"> professor </option>
              
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
            {errors.has("position") && (
              <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {errors.get("position")}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={employeeFormData.email}
              onChange={(e) => updateField("email", e.target.value)}
              style={{ width: "100%", padding: "8px", fontSize: "14px" }}
            />
            {errors.has("email") && (
              <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {errors.get("email")}
              </div>
            )}
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              backgroundColor: "#2c5282",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Employee
          </button>
        </form>
      )}

      {/* Search bar */}
      <input
        className="search-input"
        type="text"
        placeholder="Search by name, department, or position..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Employee list */}
      <ul>
        {filteredEmployees.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "#6c757d",
              fontStyle: "italic",
            }}
          >
            No employees found matching your search criteria.
          </div>
        ) : (
          filteredEmployees.map((employee) => (
            <li key={employee.id} className="employee">
              <h3>{employee.name}</h3>
              <p className="position">Position: {employee.position}</p>
              <p className="department">Department: {employee.department}</p>
              <p className="email">Email: {employee.email}</p>
              <button
                onClick={() => handleDelete(employee.id)}
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};