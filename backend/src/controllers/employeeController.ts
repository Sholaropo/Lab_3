import { Request, Response } from 'express';
import { EmployeeService } from '../services/employeeService';

const employeeService = new EmployeeService();

export class EmployeeController {
  async getAllEmployees(req: Request, res: Response) {
    try {
      const employees = await employeeService.getAllEmployees();
      res.json(employees);
    } catch (error) {
      console.error('Error getting employees:', error);
      res.status(500).json({ error: 'Failed to fetch employees' });
    }
  }

  async getEmployeeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const employee = await employeeService.getEmployeeById(id);
      
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      
      res.json(employee);
    } catch (error) {
      console.error('Error getting employee:', error);
      res.status(500).json({ error: 'Failed to fetch employee' });
    }
  }

  async createEmployee(req: Request, res: Response) {
    try {
      const employee = await employeeService.createEmployee(req.body);
      res.status(201).json(employee);
    } catch (error: any) {
      console.error('Error creating employee:', error);
      res.status(400).json({ error: error.message || 'Failed to create employee' });
    }
  }

  async deleteEmployee(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await employeeService.deleteEmployee(id);
      res.json(result);
    } catch (error: any) {
      console.error('Error deleting employee:', error);
      const statusCode = error.message === 'Employee not found' ? 404 : 500;
      res.status(statusCode).json({ error: error.message || 'Failed to delete employee' });
    }
  }
}