import { Router } from 'express';
import { EmployeeController } from '../controllers/employeeController';

const router = Router();
const employeeController = new EmployeeController();

router.get('/', (req, res) => employeeController.getAllEmployees(req, res));

router.get('/:id', (req, res) => employeeController.getEmployeeById(req, res));

router.post('/', (req, res) => employeeController.createEmployee(req, res));

router.delete('/:id', (req, res) => employeeController.deleteEmployee(req, res));

export default router;