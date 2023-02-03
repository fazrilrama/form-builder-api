import mongoose from "mongoose"

const MahasiswaSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    kelas: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number
    }
}, {
    timestamps: {
        currentTime: () => Math.floor(Date.now() / 1000)
    }
})

export default mongoose.model('mahasiswa', MahasiswaSchema);