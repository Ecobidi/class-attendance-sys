const router = require('express').Router()
const ApiController = require('../controllers/api-controller')

const checkAuthentication = (req, res, next) => {
  if (req.session.student) next() 
  else res.redirect('/student/login')
}

// router.get('/login', StudentController.getLoginPage)

// router.post('/login', StudentController.handleLogin)

// router.get('/logout', StudentController.handleLogout)

// router.use(checkAuthentication)

router.get('/courses', ApiController.getCourses)

router.get('/course-departments', ApiController.getCourseDepartments)

router.get('/course-students', ApiController.getCourseStudents)

router.get('/departments', ApiController.getDepartments)

router.post('/attendance/new', ApiController.processAttendance)

router.post('/login', ApiController.verifyLogin)

module.exports = router