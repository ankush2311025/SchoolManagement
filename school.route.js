import express from 'express';
import { addSchool, getSchool } from './school.controller.js';

const router = express.Router();

router.post('/addSchool', addSchool);
router.get('/listSchools', getSchool);

export default router;