const { Router } = require("express")
const { getAllProducts, getOneProduct, addProduct, updateProduct, deleteProduct } = require("../controller/products.ctr")
const admin_checker = require("../middleware/admin_checker")

const productRouter = Router()

productRouter.get("/get_all_products", getAllProducts)
productRouter.get("/get_one_product/:id", getOneProduct)
productRouter.post("/add_product", admin_checker, addProduct)
productRouter.put("/update_product/:id", admin_checker, updateProduct)
productRouter.delete("/delete_product/:id", admin_checker, deleteProduct)

module.exports = productRouter