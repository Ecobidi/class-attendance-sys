const mongoose = require('mongoose')
const DBCounterModel = require("./db_counter")

let CourseSchema = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  course_title: {
    type: String,
    required: true,
  },
  course_code: {
    type: String, 
    required: true
  }, 
  names_of_departments: [{
    type: String,
  }],
  departments: [{
    type: Number
  }],
  level: {
    type: String,
  },
  semester: {
    type: String,
    enum: ['First Semester', 'Second Semester']
  },
})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

CourseSchema.pre("save", async function(next){
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue("courses_id")
  }
  next()
})

module.exports = mongoose.model('course', CourseSchema)
