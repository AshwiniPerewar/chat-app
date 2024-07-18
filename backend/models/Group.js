const {Schema,model}= require('mongoose');

const groupSchema = new Schema({
  name: { type: String, required: true },
  description:{type:String},
  admin:[{type: Schema.Types.ObjectId, ref: 'user', required:true }],
  created_by:{type: Schema.Types.ObjectId, ref: 'user', required:true },
  date_of_creation:{type:String},
  members: [{ type: Schema.Types.ObjectId, ref: 'user' ,unique:true}],
});

const Group= model('group', groupSchema);

module.exports = Group