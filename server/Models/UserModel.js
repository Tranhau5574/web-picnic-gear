const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        trim: true,
        unique: true
    },
    password: {
        type: String, 
        require: true,
        trim: true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
    }]

})

module.exports = mongoose.model('User', UserSchema);