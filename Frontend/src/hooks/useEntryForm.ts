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
  const [errors, setErrors] = useState(new Map<string, string>());

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
    // AWAIT the validation - it's async!
    let validationErrors: Map<string, string>;
    
    if (formType === "employee") {
      validationErrors = await staffService.validateEmployee(formData, getToken);
    } else {
      validationErrors = await staffService.validateRole(formData, getToken);
    }

    setErrors(validationErrors);

    if (validationErrors.size > 0) return false;

    try {
      if (formType === "employee") {
        await staffService.createEmployee(formData, getToken);
      } else {
        await staffService.createRole(formData, getToken);
      }
      resetForm();
      return true;
    } catch (error) {
      console.error('Error submitting form:', error);
      return false;
    }
  };

  return { formData, errors, updateField, handleSubmit, resetForm };
}