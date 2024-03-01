import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    impactLevel: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: String,
        required: true
    },
    businessCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
}, {
    versionKey: false
})

export default mongoose.model('company', companySchema)