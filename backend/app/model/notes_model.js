var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    user_id: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
    toJSON: {virtuals: true},
});

module.exports = mongoose.model('Notes', NoteSchema)