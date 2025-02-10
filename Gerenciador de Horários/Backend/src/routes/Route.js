import express from 'express'
import ProfessorRoutes from './ProfessorRoutes.js';
import DiscplinaRoutes from './DisciplinaRoutes.js'
const router = express()
router.use('/api/professores', ProfessorRoutes)
router.use('/api/disciplinas', DiscplinaRoutes)


//test route
router.get('/', (req,res) => { 
    res.send('API WORKING') 
} )

export default router