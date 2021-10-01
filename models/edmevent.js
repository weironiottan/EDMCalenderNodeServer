var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var EdmEventSchema = new Schema({
  clubName: { type: String, lowercase: true, trim: true, required: true },
  artistName: { type: String, lowercase: true, trim: true, required: true },
  artistImageURL: { type: String, lowercase: false, trim: true },
  eventDate: { type: String, lowercase: true, trim: true, required: true },
  ticketURL: { type: String, lowercase: false, trim: true },
}, {timestamps:true});  

// Compile model from schema
// Collection in MongoDB will be EventDataModel
var EdmEvent = mongoose.model('EdmEvent', EdmEventSchema );
module.exports = EdmEvent