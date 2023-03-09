import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    }
}, {
    timestamps: {
        currentTime: () => Math.floor(Date.now() / 1000)
    },
    strict: false
})

export default mongoose.model('Form', Schema)