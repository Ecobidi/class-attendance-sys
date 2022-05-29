const router = require('express').Router()

const AttendanceRouter = require('./attendance')
const CourseRouter = require('./course')
const DepartmentRouter = require('./department')
const StudentRouter = require('./student')
const UserRouter = require('./user')
const LoginRouter = require('./login')

const getDashboard = (req, res) => {
  res.render('dashboard')
}

router.use('/login', LoginRouter)

router.use((req, res, next) => {
  if (req.session.user) next()
  else res.redirect('/login')
})

router.get('/', getDashboard)

router.get('/dashboard', getDashboard)

router.use('/attendance', AttendanceRouter)

router.use('/courses', CourseRouter)

router.use('/departments', DepartmentRouter)

router.use('/students', StudentRouter)

router.use('/users', UserRouter)

router.use('/logout', (req, res) => {
  req.session.user = null
  res.redirect('/login')
})

module.exports = router