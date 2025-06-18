const { Router } = require("express")
const { getAllFruits, getOneFruit, addFruit, updateFruit, deleteFruit } = require("../controller/fruits.ctr")
const admin_checker = require("../middleware/admin_checker")

const fruitsRouter = Router()

fruitsRouter.get("/get_all_fruits", getAllFruits)
fruitsRouter.get("/get_one_fruit/:id", getOneFruit)
fruitsRouter.post("/add_fruit", admin_checker, addFruit)
fruitsRouter.put("/update_fruit/:id", admin_checker, updateFruit)
fruitsRouter.delete("/delete_fruit/:id", admin_checker, deleteFruit)


module.exports = fruitsRouter
