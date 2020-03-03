const mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

const boardSchema = new mongoose.Schema({
    category:{type: String, required: true},
    auth:{type: String, required: true},
    date:{type: Date, required: true},
    title:{type: String, required: true},
    content:{type: String, required: true}
});

module.exports=mongoose.model("Board", boardSchema);