import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateEmployeeInput {
  name: string;
  position: string;
  department: string;
  email: string;
}

export class EmployeeService {
  async getAllEmployees() {
    return await prisma.employee.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getEmployeeById(id: string) {
    return await prisma.employee.findUnique({
      where: { id }
    });
  }

  async createEmployee(data: CreateEmployeeInput) {
    // Validation
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!data.email || !this.isValidEmail(data.email)) {
      throw new Error('Valid email is required');
    }
    if (!data.position || data.position.trim().length === 0) {
      throw new Error('Position is required');
    }
    if (!data.department || data.department.trim().length === 0) {
      throw new Error('Department is required');
    }

    // Check if email already exists
    const existing = await prisma.employee.findUnique({
      where: { email: data.email }
    });

    if (existing) {
      throw new Error('Email already exists');
    }

    return await prisma.employee.create({
      data: {
        name: data.name.trim(),
        position: data.position.trim(),
        department: data.department.trim(),
        email: data.email.trim().toLowerCase()
      }
    });
  }

  async deleteEmployee(id: string) {
    const employee = await prisma.employee.findUnique({
      where: { id }
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    await prisma.employee.delete({
      where: { id }
    });

    return { success: true, message: 'Employee deleted successfully' };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}