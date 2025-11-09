import { useState } from "react";
import * as staffService from "../services/validStaffService";

type FormType = "employee" | "role";

export function useEntryForm(formType: FormType) {
  const emptyForm = formType === "employee" 
    ? { name: "", department: "", position: "", email: "" }
    : { name: "", department: "", description: "" };

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState(new Map());

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors.has(field)) {
      const newErrors = new Map(errors);
      newErrors.delete(field);
      setErrors(newErrors);
    }
  };

  const handleSubmit = async () => {
    const validationErrors = formType === "employee"
      ? staffService.validateEmployee(formData)
      : staffService.validateRole(formData);

    setErrors(validationErrors);

    if (validationErrors.size > 0) return false;

    try {
      if (formType === "employee") {
        await staffService.createEmployee(formData);
      } else {
        await staffService.createRole(formData);
      }
      setFormData(emptyForm);
      setErrors(new Map());
      return true;
    } catch (error) {
      return false;
    }
  };

  return { formData, errors, updateField, handleSubmit };
}