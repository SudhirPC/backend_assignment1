

const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect("mongodb+srv://mongodb://127.0.0.1:27017/pagination_email")
}

module.exports = connect