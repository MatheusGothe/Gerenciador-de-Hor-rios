import express from 'express'
import ProfessorRoutes from './ProfessorRoutes.js';
import DiscplinaRoutes from './DisciplinaRoutes.js'
import ProjetoRoutes from './ProjetoRoutes.js';
import UserRoutes from './UserRoutes.js'
const router = express()
router.use('/api/professores', ProfessorRoutes)
router.use('/api/disciplinas', DiscplinaRoutes)
router.use('/api/projetos', ProjetoRoutes)
router.use('/api/users', UserRoutes)



//test route
router.get('/', (req,res) => { 
    res.send('API WORKING') 
} )

export default router