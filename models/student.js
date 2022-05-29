const mongoose = require('mongoose')
const DBCounterModel = require("./db_counter")

let StudentSchema = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  reg_no: {
    type: String, 
    unique: true,
  },
  password: {
    type: String,
    default: '1234'
  },
  surname: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: String,
  gender: String,
  department: String,
  school_faculty: String,
  programme_of_study: {
    type: String
  },
  level: String,
  session: String,
}, {timestamps: {createdAt: true}})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

StudentSchema.pre("save", async function(next){
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue("students_id")
  }
  next()
})

module.exports = mongoose.model('students', StudentSchema)
