var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var EdmEventSchema = new Schema({
  clubname: { type: String, lowercase: true, trim: true, required: true },
  artistname: { type: String, lowercase: true, trim: true, required: true },
  artistimageurl: { type: String, lowercase: false, trim: true },
  eventdate: { type: Date, lowercase: true, trim: true, required: true },
  ticketurl: { type: String, lowercase: false, trim: true },
}, {timestamps:true,});  

// Compile model from schema
// Collection in MongoDB will be EventDataModel
var EdmEvent = mongoose.model('EdmEvent', EdmEventSchema );
module.exports = EdmEvent