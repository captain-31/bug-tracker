import express from 'express'
import { getCreateIssue, getIssuesByProject, postCreateIssue } from '../controllers/issue.controller.js'

const issueRouter = express.Router()

issueRouter.get('/:id', getIssuesByProject)
issueRouter.get('/create/:id', getCreateIssue)
issueRouter.post('/create/:id', postCreateIssue)

export default issueRouter