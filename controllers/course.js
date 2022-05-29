const CourseService = require('../services/course')
const DepartmentService = require('../services/department')

class CourseController {

  static async getCoursesPage(req, res) {
    let pageNumber = Number.parseInt(req.query.page ? req.query.page : 1)
    let limit_size = Number.parseInt(req.query.limit || CourseService.QUERY_LIMIT_SIZE)
    let offset = pageNumber * limit_size - limit_size
    let search = req.query.search
    let courses, totalDocuments
    if (search) {
      courses = await CourseService.searchBy(search, {limit: limit_size, offset}) 
      totalDocuments = await CourseService.countMatchingDocuments(search)
    } else {
      courses = await CourseService.findAll({limit: limit_size, offset})
      totalDocuments = await CourseService.countMatchingDocuments()
    }
    let totalNumberOfPages = Math.ceil(await totalDocuments / limit_size)

    res.render('courses', {courses, currentPage: pageNumber, totalNumberOfPages, totalDocuments, limit_size, offset, searchTerm: search })
  }

  static async createCoursePage(req, res) {
    let departments = await DepartmentService.findAll({limit: 10000})
    res.render('courses-new', {departments})
  }

  static async createCourse(req, res) {
    let dao = req.body

    if (! Array.isArray(dao.departments)) {
      let tempArray = []
      tempArray.push(dao.departments)
      dao.departments = tempArray
    }

    let departments = await DepartmentService.findBySerialNumbers(dao.departments)

    dao.names_of_departments = []

    for (const {name} of departments) {
      dao.names_of_departments.push(name)
    }
    try {
      await CourseService.create(dao)
      req.flash('success_msg', "Course added")
      res.redirect('/courses')
    } catch (err) {
      console.log(err)
      res.redirect('/courses')
    }
  }

  static async removeCourse(req, res) {
    try {
      let doc = await CourseService.removeOne(req.params.course_id)
      req.flash('success_msg', 'Course removed')
      res.redirect('/courses')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Error removing record')
      res.redirect('/courses')
    }
  }

}

module.exports = CourseController