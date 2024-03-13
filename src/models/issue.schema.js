import mongoose from "mongoose"

// Custom validator function to check if at least one label is selected
const atLeastOneLabelValidator = (value) => {
    return value.length > 0;
};

const issueSchema = new mongoose.Schema({

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
    labels: {
        type: [{
            type: String,
            trim: true
        }],
        validate: [atLeastOneLabelValidator, "Please select at least one label"]
    },
    timestamp: {
        type: Date,
        default: new Date()
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, "Project id is required"]
    }
})

const issueModel = mongoose.model('Issue', issueSchema)

export default issueModel