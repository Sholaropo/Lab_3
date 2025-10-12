import { useState } from "react";

const initialEmployees = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Financial Advisor",
    department: "Investment Services",
    email: "sarah.j@pixellriver.com"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Portfolio Manager",
    department: "Wealth Management", 
    email: "mchen@pixellriver.com"
  },
  {
    id: 3,
    name: "Emily Rodriguez", 
    position: "Tax Specialist",
    department: "Tax Planning",
    email: "emily.r@pixellriver.com"
  }
];

export const EmployeeList = () => {
  const [employees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employee-section">
      <h2>Our Team</h2>
      
      <div className="employee-controls">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <ul>
        {filteredEmployees.map((employee) => (
          <li key={employee.id} className="employee">
            <h3>{employee.name}</h3>
            <p className="position">{employee.position}</p>
            <p className="department">{employee.department}</p>
            <p className="email">{employee.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};