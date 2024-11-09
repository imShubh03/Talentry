import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.post('/register', isAuthenticated, registerCompany);
router.get('/companies', isAuthenticated, getCompany);
router.get('/company/:id', isAuthenticated, getCompanyById);
router.put('/update/:id', isAuthenticated, updateCompany);

export default router;
