import mongoose from "mongoose"

const projectSchema =  new mongoose.Schema({

    name: {
        type: String, 
        required: [true, "Please enter name"]
    },
    description: {
        type: String, 
        required: [true, "Please enter description"]
    },
    author: {
        type: String, 
        required: [true, "Please enter author"]
    },
    issues: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Issue',
        },
    ],
    timestamp: {
        type: Date,
        default: new Date()
    }
})

const projectModel = mongoose.model('Project', projectSchema)

export default projectModel