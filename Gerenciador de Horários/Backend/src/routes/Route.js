import express from 'express'
import ProfessorRoutes from './ProfessorRoutes.js';
const router = express()
router.use('/api/professores', ProfessorRoutes)

//test route
router.get('/', (req,res) => { 
    res.send('API WORKING') 
} )

export default router