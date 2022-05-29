const AttendanceService = require('../services/attendance')

class AttendanceController {

  static async getAttendancesPage(req, res) {
    let pageNumber = Number.parseInt(req.query.page ? req.query.page : 1)
    let limit_size = Number.parseInt(req.query.limit || AttendanceService.QUERY_LIMIT_SIZE)
    let offset = pageNumber * limit_size - limit_size
    let search = req.query.search
    let attendances, totalDocuments
    if (search) {
      attendances = await AttendanceService.searchBy(search, {limit: limit_size, offset}) 
      totalDocuments = await AttendanceService.countMatchingDocuments(search)
    } else {
      attendances = await AttendanceService.findAll({limit: limit_size, offset})
      totalDocuments = await AttendanceService.countMatchingDocuments()
    }
    let totalNumberOfPages = Math.ceil(await totalDocuments / limit_size)

    res.render('attendance', {attendances, currentPage: pageNumber, totalNumberOfPages, totalDocuments, limit_size, offset, searchTerm: search })
  }

  static async getAttendanceDetailPage(req ,res) {
    try {
      let attendance = await AttendanceService.findById(req.params.attendance_id)
      if (!attendance) return res.redirect('/attendance')
      res.render('attendance-details', { attendance })
    } catch (error) {
      req.flash('error_msg', 'Error Retrieving Attendance Details')
      res.redirect('/attendance')
    }
  }

  static async removeAttendance(req, res) {
    try {
      await AttendanceService.removeOne(req.params.attendance_id)
      req.flash('success_msg', 'Attendance record removed')
      res.redirect('/attendance')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Error removing record')
      res.redirect('/attendance')
    }
  }

}

module.exports = AttendanceController