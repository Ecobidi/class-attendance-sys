const AttendanceModel = require('../models/attendance')

class AttendanceService {

  static QUERY_LIMIT_SIZE = 10;

  static async findById(id) {
    return AttendanceModel.findById(id)
  }

  static async findBySerialNumber(serial_number) {
    return AttendanceModel.findOne({serial_number})
  }

  static async searchBy(search = '', { offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    let pattern = new RegExp(search, 'ig')
    let docs = await AttendanceModel.find({ $or: [{department: pattern}, {course_code: pattern}]}).skip(offset).limit(limit)
    return docs
  }
  
  static async findAll({ offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    return AttendanceModel.find().skip(offset).limit(limit)
  } 

  static async findSpecific({course_code = '', department = '' }) {
    return AttendanceModel.find({course_code, department})
  }

  static async countMatchingDocuments(search = '') {
    let numberOfDocs
    let pattern = new RegExp(search, 'ig')
    if (search) {
      numberOfDocs = await AttendanceModel.count({ $or:[{department: pattern}, {course_code: pattern}]})
    } else {
      numberOfDocs = await AttendanceModel.count()
    }
    return numberOfDocs
  }

  static async create(dao) {
    return AttendanceModel.create(dao)
  }

  static async removeOne(id) {
    return AttendanceModel.findByIdAndDelete({id})
  }

}

module.exports = AttendanceService