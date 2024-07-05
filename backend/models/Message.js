const {Schema,model} = require('mongoose');

const messageSchema = new Schema({
  group: { type:Schema.Types.ObjectId, ref: 'group', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
});

const Message=model('message', messageSchema);

module.exports =Message
