let CourseModel = require('../models/course')
let DepartmentModel = require('../models/department')
let StudentModel = require('../models/student')
let AttendanceModel = require('../models/attendance')
let UserService = require('../services/user')

class ApiController {
  static async getCourses(req, res) {
    let courses = await CourseModel.find()
    res.json(courses)
  }

  static async getDepartments(req, res) {
    let departments = await DepartmentModel.find()
    res.json(departments)
  }

  static async getCourseDepartments(req, res) {
    let course_code = req.query.course_code
    let departments = await CourseModel.findOne({course_code})
    res.json(departments)
  }

  static async getCourseStudents(req, res) {
    let session = req.query.session
    let department = req.query.department
    let course = await CourseModel.findOne({course_code: req.query.course_code})
    let level = course.level
    let students = await StudentModel.find({department, level, session})
    res.json(students)
  }

  static async processAttendance(req, res) {
    try {
      await AttendanceModel.create(req.body)
      res.status(201).json({})
    } catch (error) {
      res.status(400).end()
    }
  }

  static async verifyLogin(req, res) {
    let dao = req.body
    try {
      let user = await UserService.findByUsername(dao.username)
      // check for password match
      if (user && user.password == dao.password && user.role == dao.loginType) {
        res.status(200).end()
      } else {
        res.status(299).json({error_msg: 'Bad login credentials'})
      }
    } catch (err) {
      console.log(err)
      res.status(400).json({error_msg: 'Error processing request'})
    }
  }


}

module.exports = ApiController