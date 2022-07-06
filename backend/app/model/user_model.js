var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    firstName: String,
    lastName: String,

    email: {
        type: String,
        unique: true,
    },

    dateOfBirth: Date,

    mobile: {
        type: Number,
        max: 0000000000,
        min: 9999999999, 
        validate: {
            validator: Number.isInteger,
            message: "Mobile Number should be an Integer.",
        }
    },

    status: Boolean,
    password: String,
    accountType: String,
    loginattempts: Number,
    Notes: [{
        type:Schema.Types.ObjectId, 
        ref:'Notes'
    }],
});

UserSchema.virtual("notes",{
    ref: "note",
    localField: "_id",
    foreignField: "owner",
});

UserSchema.method("toJSON", function(){
    const { __v, id, ...object } = this.toObject();
    object.id = id;
    return object;
});

module.exports = mongoose.model('user', UserSchema)