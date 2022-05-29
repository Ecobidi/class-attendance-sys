let mongoose = require('mongoose')
const DBCounterModel = require('./db_counter')

let AttendanceSchema = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  course_code: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  session: {
    type: String,
  },
  attendance_list: [{
    student_reg_no: {
      type: String,
      required: true,
    },
    student_name: String,
    attendance_status: {
      type: String,
      enum: ['absent', 'excused', 'present']
    }
  }]
})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

AttendanceSchema.pre("save", async function(next){
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue("attendance_id")
  }
  next()
})

module.exports = mongoose.model('attendance', AttendanceSchema)