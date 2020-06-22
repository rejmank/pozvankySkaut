var mongoose = require('mongoose');

const AtendeeSchema = new mongoose.Schema({
    atendees: [
        id: mongoose.Schema.Types.ObjectId,
        rc: Number,
        name: String,
        suername: String,
        legs: String,
    ]
})

module.exports = mongoose.model('atendeeModel', AtendeeSchema);