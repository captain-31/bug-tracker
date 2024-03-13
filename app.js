import './env.js'

import express from 'express'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'
import projectRouter from './src/routes/project.routes.js'
import issueRouter from './src/routes/issue.routes.js'

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))
app.use(express.static('src/views'))

app.set('view engine', 'ejs')
app.set('views', path.join(path.resolve(), 'src', 'views') )

app.use(ejsLayouts)

// router 
app.use('/', projectRouter)
app.use('/issues', issueRouter)

// 404 route
app.use((req, res) => {
    res.status(404).render('404')
});

export default app