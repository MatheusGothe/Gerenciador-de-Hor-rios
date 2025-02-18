import express from 'express'
import ProfessorRoutes from './ProfessorRoutes.js';
import DiscplinaRoutes from './DisciplinaRoutes.js'
import ProjetoRoutes from './ProjetoRoutes.js';
import UserRoutes from './UserRoutes.js'
import TurmaRoutes from './TurmaRoutes.js'
const router = express()
router.use('/api/professores', ProfessorRoutes)
router.use('/api/disciplinas', DiscplinaRoutes)
router.use('/api/projetos', ProjetoRoutes)
router.use('/api/users', UserRoutes)
router.use('/api/turmas', TurmaRoutes)



//test route
router.get('/', (req,res) => { 
    res.send('API WORKING') 
} )

export default router