const {Schema,model}= require('mongoose');

const groupSchema = new Schema({
  name: { type: String, required: true,unique: true  },
  members: [{ type: Schema.Types.ObjectId, ref: 'user' ,unique:true}],
});

const Group= model('group', groupSchema);

module.exports = Group