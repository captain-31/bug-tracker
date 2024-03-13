import express from 'express'
import { getIndex, getCreateProject, postCreateProject} from '../controllers/project.controller.js'

const projectRouter = express.Router()

projectRouter.get('/', getIndex)
projectRouter.get('/create', getCreateProject)
projectRouter.post('/create', postCreateProject)

export default projectRouter