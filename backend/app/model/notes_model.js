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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},);

NoteSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Notes', NoteSchema)