import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Header from "./components/header/Header";
import { EmployeeList } from "./components/Employees";
import { Organization } from "./components/organization/Organization";
import { Footer } from "./components/footer/footer";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/employees" />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/organization" element={<Organization />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;