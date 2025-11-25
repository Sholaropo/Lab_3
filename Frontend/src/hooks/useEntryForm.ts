import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as staffService from "../services/validStaffService";

type FormType = "employee" | "role";

export function useEntryForm(formType: FormType) {
  const { getToken } = useAuth();
  
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

  const resetForm = () => {
    setFormData(emptyForm);
    setErrors(new Map());
  };

  const handleSubmit = async () => {
    // Await validation since it's now async
    const validationErrors = formType === "employee"
      ? await staffService.validateEmployee(formData, getToken)
      : await staffService.validateRole(formData, getToken);

    setErrors(validationErrors);

    if (validationErrors.size > 0) return false;

    try {
      if (formType === "employee") {
        await staffService.createEmployee(formData, getToken);
      } else {
        await staffService.createRole(formData, getToken);
      }
      setFormData(emptyForm);
      setErrors(new Map());
      return true;
    } catch (error) {
      console.error('Error submitting form:', error);
      return false;
    }
  };

  return { formData, errors, updateField, handleSubmit, resetForm };
}