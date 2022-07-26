const mongoose = require('mongoose')

const connectDB = async () => {

    try {
        await mongoose.connect("mongodb://localhost:27017/realtor");
        console.log('MongoDB connected')
    } catch (err) {
        process.exit(1)
    }
}

module.exports = connectDB