const router = require('express').Router()

const AttendanceController = require('../controllers/attendance')

router.get('/', AttendanceController.getAttendancesPage)

router.get('/view/:attendance_id', AttendanceController.getAttendanceDetailPage)

router.get('/remove/:attendance_id', AttendanceController.removeAttendance)

module.exports = router