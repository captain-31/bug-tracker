import issueModel from "../models/issue.schema.js";
import mongoose from "mongoose";

export const getIssuesByProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        
        // build filter expression
        const search = req.query.search;
        const author = req.query.author;
        const labelToSearch = req.query.labels;
        let filterExpression = { projectId: projectId };

        if (search || author || labelToSearch) {
            filterExpression.$and = [];
        }

        if(search) {
            filterExpression.$and.push({
                $or: [
                    { name: { $regex: new RegExp(search, 'i') } },
                    { description: { $regex: new RegExp(search, 'i') } }
                ]
            });
        }

        if (author) {
            filterExpression.$and.push({ author: author });
        }

        if (labelToSearch) {
            const labels = labelToSearch.split(',');
            filterExpression.$and.push({ labels: { $in: labels } });
        }

        console.log(filterExpression)

        // get issues
        const issues = await issueModel.find( filterExpression)
        
        // get labels
        const pipeline = [
            { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
            { $unwind: "$labels" },
            { $group: { _id: "$labels" }}
        ];
        const labels = await issueModel.aggregate(pipeline);
        let issueLabels = labels.map(label => label._id)

        // get authors
        const authorsResult = await issueModel.distinct("author", { projectId: new mongoose.Types.ObjectId(projectId) });

        if(issues.length > 0) {
            res.render('issues', { 
                success: true, 
                error: null, 
                data: issues,
                labels: issueLabels,
                authors: authorsResult,
                projectId: projectId 
            })
        } else {
            return res.render('issues', { 
                success: false, 
                error: 'No issues found', 
                data: null, 
                projectId: projectId, 
                labels: null,
                authors: null 
            })
        }
    } catch (error) {
        console.log(error)
        return res.render('issues', { success: false, error: error, data: null })
    }
}

export const getCreateIssue = async (req, res) => {
    try {
        const projectId = req.params.id
        const data = {
            name: '',
            description: '',
            author: ''
        }
        // get labels
        const pipeline = [
            { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
            { $unwind: "$labels" },
            { $group: { _id: "$labels" }}
        ];
        const labels = await issueModel.aggregate(pipeline);
        let issueLabels = labels.map(label => label._id)
    
        
        res.render('createIssue', { success: false, message: null, error: null, data: data, projectId: projectId, labels: issueLabels })
    } catch (error) {
        console.log(error)
        return res.render('createIssue', { success: false, error: error, data: null,  projectId: projectId, labels: null })
    }

}

export const postCreateIssue = async (req, res) => {
    
    // save issue to db
    // in post data req.body
    const projectId = req.params.id
     // get labels
     const pipeline = [
        { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
        { $unwind: "$labels" },
        { $group: { _id: "$labels" }}
    ];
    const labels = await issueModel.aggregate(pipeline);
    let issueLabels = labels.map(label => label._id)

    try {
        const { name, description, author } = req.body
        const label = req.body.label;
        console.log(label)
        const projectId = req.params.id

        const newIssue = await issueModel.create({ name: name, description: description, author: author, labels: label, projectId: projectId })
        const data = {
            name: '',
            description: '',
            author: ''
        }
        res.render('createIssue', { success: true, message: 'Issue created successfully!', error: null,  data: data, projectId: projectId, labels: issueLabels  })
        
    } catch (error) {
        console.log(error)
        res.render('createIssue', { success: false, message: null, error: error,  data: req.body, projectId: projectId, labels: issueLabels  })
    }
}