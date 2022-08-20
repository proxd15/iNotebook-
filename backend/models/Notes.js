const mongoose= require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"name"
    },
    title:{
        type : String,
        required: true
    },
    description:{
        type : String,
        required: true,
        default: "Description"
    },
    tag:{
        type : String,
    },
    Date:{
        type : Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes',NotesSchema);