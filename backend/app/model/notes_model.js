var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    content: {
        type: String,
        trim: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true,
    toJSON: {virtuals: true},
});

module.exports = mongoose.model('note', NoteSchema)