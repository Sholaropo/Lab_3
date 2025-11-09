import { Request, Response } from 'express';
import { RoleService } from '../services/roleService';

const roleService = new RoleService();

export class RoleController {
  async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await roleService.getAllRoles();
      res.json(roles);
    } catch (error) {
      console.error('Error getting roles:', error);
      res.status(500).json({ error: 'Failed to fetch roles' });
    }
  }

  async getRoleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const role = await roleService.getRoleById(id);
      
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
      
      res.json(role);
    } catch (error) {
      console.error('Error getting role:', error);
      res.status(500).json({ error: 'Failed to fetch role' });
    }
  }

  async getRolesByDepartment(req: Request, res: Response) {
    try {
      const { department } = req.query;
      
      if (!department || typeof department !== 'string') {
        return res.status(400).json({ error: 'Department parameter is required' });
      }
      
      const roles = await roleService.getRolesByDepartment(department);
      res.json(roles);
    } catch (error) {
      console.error('Error getting roles by department:', error);
      res.status(500).json({ error: 'Failed to fetch roles' });
    }
  }

  async createRole(req: Request, res: Response) {
    try {
      const role = await roleService.createRole(req.body);
      res.status(201).json(role);
    } catch (error: any) {
      console.error('Error creating role:', error);
      res.status(400).json({ error: error.message || 'Failed to create role' });
    }
  }

  async deleteRole(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await roleService.deleteRole(id);
      res.json(result);
    } catch (error: any) {
      console.error('Error deleting role:', error);
      const statusCode = error.message === 'Role not found' ? 404 : 500;
      res.status(statusCode).json({ error: error.message || 'Failed to delete role' });
    }
  }
}