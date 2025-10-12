import { useState } from "react";
import * as employeeRepo from "../apis/employeeRepo";
import * as roleRepo from "../apis/roleRepo";
import * as validStaffService from "../services/validStaffService";
import type { Employee } from "../types/Employee";
import type { Role } from "../types/Role";

type FormType = "employee" | "role";

interface EmployeeFormData {
  name: string;
  department: string;
  position: string;
  email: string;
}

interface RoleFormData {
  name: string;
  department: string;
  description: string;
}

type FormData = EmployeeFormData | RoleFormData;

export function useEntryForm(formType: FormType) {
  const emptyEmployeeForm = { name: "", department: "", position: "", email: "" };
  const emptyRoleForm = { name: "", department: "", description: "" };
  const initialForm = formType === "employee" ? emptyEmployeeForm : emptyRoleForm;

  const [formData, setFormData] = useState<FormData>(initialForm);

  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  const updateField = (fieldName: string, fieldValue: string) => {
    setFormData((currentData) => ({
      ...currentData,
      [fieldName]: fieldValue,
    }));

    if (errors.has(fieldName)) {
      setErrors((currentErrors) => {
        const updatedErrors = new Map(currentErrors);
        updatedErrors.delete(fieldName);
        return updatedErrors;
      });
    }
  };

  const handleSubmit = async (): Promise<boolean> => {
    let validationErrors: Map<string, string>;
    
    if (formType === "employee") {
      validationErrors = validStaffService.validateEmployee(formData as EmployeeFormData);
    } else {
      validationErrors = validStaffService.validateRole(formData as RoleFormData);
    }

    setErrors(validationErrors);

    if (validationErrors.size > 0) {
      return false;
    }

    try {
      if (formType === "employee") {
        employeeRepo.createEmployee(formData as Omit<Employee, "id">);
      } else {
        roleRepo.createRole(formData as Omit<Role, "id">);
      }

      resetForm();
      return true;
      
    } catch (error) {
      console.error("Error saving:", error);
      setErrors(new Map([["submit", "Something went wrong. Please try again."]]));
      return false;
    }
  };

  const resetForm = () => {
    const emptyForm = formType === "employee" ? emptyEmployeeForm : emptyRoleForm;
    setFormData(emptyForm);
    setErrors(new Map());
  };

  return {
    formData,
    errors,
    updateField,
    handleSubmit,
    resetForm,
  };
}