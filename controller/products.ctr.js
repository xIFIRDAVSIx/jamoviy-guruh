const { read_file, write_file} = require("../fs/data")
const { v4 } = require("uuid")


//getAll
const getAllProduct=async (req, res)=>{
    try {
        const fileData= read_file("products.json")
        res.status(200).json(fileData)
    } catch (error) {
        console.log(error);
    }
}

/// addTodo
const addProduct=async (req, res)=>{
    try {
        const {title, desc, price}=req.body
        const fileData= read_file("products.json")
        fileData.push({
          id:v4(),
          title,
          desc,
          price
        })
        write_file("products.json", fileData)
        res.status(201).json({
            msg:"Added new product "
        })
    } catch (error) {
        console.log(error);
    }
}

/// getOne 
const getOneProduct=async (req, res)=>{
    try {
        const {id}=req.params
        const fileData= read_file("products.json")
        const foundedProduct=fileData.find((item)=> item.id===id)
        if(!foundedProduct){
            return res.status(404).json({
                msg:"Product not found"
            })
        }
        res.status(200).json(foundedProduct)
    } catch (error) {
        console.log(error);
    }
}

////update 
const updateProduct=async (req, res)=>{
    try {
        const {id}=req.params
        const {title, desc, price}=req.body
        const fileData=read_file("products.json")
        const foundedProduct=fileData.find((item)=> item.id===id)
        if(!foundedProduct){
            return res.status(404).json({
                msg:"Product not found"
            })
        }

        fileData.forEach((item) => {
            if(item.id===id){
                item.title=title ? title : item.title
                item.desc=desc ? desc : item.desc
                item.price=price ? price : item.price
            }
        });
        write_file("products.json", fileData)
        res.status(201).json({
            msg:"update  product "
        })
    } catch (error) {
        console.log(error);
    }
}
 

///delete 
const deleteProduct=async (req, res)=>{
    try {
        const {id}=req.params
        const fileData=read_file("products.json")
        const foundedProduct=fileData.find((item)=> item.id===id)
        if(!foundedProduct){
            return res.status(404).json({
                msg:"Product not found"
            })
        }

        fileData.forEach((item, idx) => {
            if(item.id===id){
                fileData.splice(idx, 1)
            }
        });
        write_file("products.json", fileData)
        res.status(201).json({
            msg:"Deleted product "
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getAllProduct,
    addProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
}
