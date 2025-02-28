import express from 'express'
import ProfessorRoutes from './ProfessorRoutes.js';
import DiscplinaRoutes from './DisciplinaRoutes.js'
import ProjetoRoutes from './ProjetoRoutes.js';
import UserRoutes from './UserRoutes.js'
import TurmaRoutes from './TurmaRoutes.js'
import IntervaloRoutes from './IntervaloRoutes.js'
import DisponibilidadeProfessor from './DisponibilidadeProfessorRoutes.js'
import ProfessorOnDisciplina from './ProfessorOnDisciplinaRoutes.js'


const router = express()
router.use('/api/professores', ProfessorRoutes)
router.use('/api/disciplinas', DiscplinaRoutes)
router.use('/api/projetos', ProjetoRoutes)
router.use('/api/users', UserRoutes)
router.use('/api/turmas', TurmaRoutes)
router.use('/api/intervalos',IntervaloRoutes)
router.use('/api/disponibilidadeProfessor',DisponibilidadeProfessor)
router.use('/api/professorOnDisciplina',ProfessorOnDisciplina )


//test route
router.get('/', (req,res) => { 
    res.send('API WORKING') 
} )

export default router