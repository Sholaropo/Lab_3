import { Router } from 'express';
import { RoleController } from '../controllers/roleController';

const router = Router();
const roleController = new RoleController();

router.get('/', (req, res) => {
  if (req.query.department) {
    roleController.getRolesByDepartment(req, res);
  } else {
    roleController.getAllRoles(req, res);
  }
});

router.get('/:id', (req, res) => roleController.getRoleById(req, res));

router.post('/', (req, res) => roleController.createRole(req, res));

router.delete('/:id', (req, res) => roleController.deleteRole(req, res));

export default router;