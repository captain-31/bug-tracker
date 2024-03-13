import projectModel from "../models/project.schema.js";

// Get all projects on the index page
export const getIndex = async (req, res) => {
    try {
        const projects = await projectModel.find({})
        
        if(projects.length > 0) {
            res.render('index', { success: true, error: null, data: projects })
        } else {
            return res.render('index', { success: false, error: 'No projects found', data: null })
        }
    } catch (error) {
        return res.render('index', { success: false, error: error, data: null })
    }
}

// Get create project form
export const getCreateProject = async (req, res) => {
    const data = {
        name: '',
        description: '',
        author: ''
    }
    res.render('createProject', { success: false, message: null, error: null, data: data })
}

// Save new project
export const postCreateProject = async (req, res) => {
    try {
        const { name, description, author } = req.body;
        const newProject = await projectModel.create({ name: name, description: description, author: author})
        const data = {
            name: '',
            description: '',
            author: ''
        }
        res.render('createProject', { success: true, message: 'Project created successfully!', error: null,  data: data })
        
    } catch (error) {
        console.log(error)
        res.render('createProject', { success: false, message: null, error: error,  data: req.body })
    }
}