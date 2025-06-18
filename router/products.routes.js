const {Router}=require("express")
const {getAllProduct, getOneProduct, addProduct, updateProduct, deleteProduct}=require("../controller/products.ctr")
// const { adminChecking } = require("../guard/admin_checker")


const productRouter=Router()

productRouter.get("/get_all_product", getAllProduct)
productRouter.get("/get_one_product/:id", getOneProduct)
productRouter.post("/add_product", adminChecking , addProduct)  
productRouter.put("/update_product/:id", adminChecking, updateProduct)
productRouter.delete("/delete_product/:id", adminChecking, deleteProduct)

module.exports=productRouter