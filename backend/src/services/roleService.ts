import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateRoleInput {
  name: string;
  department: string;
  description?: string;
}

export class RoleService {
  async getAllRoles() {
    return await prisma.role.findMany({
      orderBy: { department: 'asc' }
    });
  }

  async getRoleById(id: string) {
    return await prisma.role.findUnique({
      where: { id }
    });
  }

  async getRolesByDepartment(department: string) {
    return await prisma.role.findMany({
      where: { department },
      orderBy: { name: 'asc' }
    });
  }

  async createRole(data: CreateRoleInput) {
    // Validation
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Role name is required');
    }
    if (!data.department || data.department.trim().length === 0) {
      throw new Error('Department is required');
    }

    // Check if role already exists in this department
    const existing = await prisma.role.findFirst({
      where: {
        name: data.name.trim(),
        department: data.department.trim()
      }
    });

    if (existing) {
      throw new Error('Role already exists in this department');
    }

    return await prisma.role.create({
      data: {
        name: data.name.trim(),
        department: data.department.trim(),
        description: data.description?.trim() || null
      }
    });
  }

  async deleteRole(id: string) {
    const role = await prisma.role.findUnique({
      where: { id }
    });

    if (!role) {
      throw new Error('Role not found');
    }

    await prisma.role.delete({
      where: { id }
    });

    return { success: true, message: 'Role deleted successfully' };
  }
}