const { Router } = require("express")
const { getAllWorks, getOneWork, addWork, updateWork, deleteWork } = require("../controller/works.ctr")
const admin_checker = require("../middleware/admin_checker")

const worksRouter = Router()

worksRouter.get("/get_all_works", getAllWorks)
worksRouter.get("/get_one_work/:id", getOneWork)
worksRouter.post("/add_work", admin_checker, addWork)
worksRouter.put("/update_work/:id", admin_checker, updateWork)
worksRouter.delete("/delete_work/:id", admin_checker, deleteWork)


module.exports = worksRouter
