import { useState, useEffect } from "react";
import { useEntryForm } from "../../hooks/useEntryForm";
import * as roleRepo from "../../apis/roleRepo";
import type { Role } from "../../types/Role";

export const Organization = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const { formData, errors, updateField, handleSubmit, resetForm } = useEntryForm("role");

  const roleFormData = formData as { name: string; department: string; description: string };

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    setLoading(true);
    const data = await roleRepo.getRoles();
    setRoles(data);
    setLoading(false);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) {
      await loadRoles();
      setShowForm(false);
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    await roleRepo.deleteRole(id);
    await loadRoles();
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
  }

  return (
    <div className="organization-section">
      <h2>Leadership and Management</h2>

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
        {showForm ? "Cancel" : "Add New Role"}
      </button>

      {/* Form to add new role */}
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
          <h3 style={{ marginBottom: "20px" }}>Add New Role</h3>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="department" style={{ display: "block", marginBottom: "5px" }}>
              Department:
            </label>
            <input
              id="department"
              type="text"
              value={roleFormData.department}
              onChange={(e) => updateField("department", e.target.value)}
              placeholder="e.g., Engineering, Sales, HR"
              style={{ width: "100%", padding: "8px", fontSize: "14px" }}
            />
            {errors.has("department") && (
              <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {errors.get("department")}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
              Role Name:
            </label>
            <input
              id="name"
              type="text"
              value={roleFormData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g., Senior Developer, Sales Manager"
              style={{ width: "100%", padding: "8px", fontSize: "14px" }}
            />
            {errors.has("name") && (
              <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {errors.get("name")}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="description" style={{ display: "block", marginBottom: "5px" }}>
              Description (optional):
            </label>
            <textarea
              id="description"
              value={roleFormData.description || ""}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Role description..."
              style={{ width: "100%", padding: "8px", fontSize: "14px", minHeight: "80px" }}
            />
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
            Add Role
          </button>
        </form>
      )}

      {/* Role list */}
      <div className="org-list">
        {roles.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "#6c757d",
              fontStyle: "italic",
            }}
          >
            No roles found. Add one above!
          </div>
        ) : (
          roles.map((role) => (
            <div key={role.id} className="org-member">
              <div className="org-header" onClick={() => toggleExpand(role.id)}>
                <div>
                  <h3>{role.name}</h3>
                  <p className="org-name">{role.department}</p>
                </div>
                <button className="expand-btn" type="button">
                  {expandedId === role.id ? "−" : "+"}
                </button>
              </div>
              {expandedId === role.id && (
                <div className="org-description">
                  <p>{role.description || "No description provided."}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(role.id);
                    }}
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
                    Delete Role
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};