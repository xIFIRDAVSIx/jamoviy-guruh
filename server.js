const express = require("express")
const cors = require("cors")
const errorMiddleware = require("./middleware/error.middleware")
const authRouter = require("./router/auth.routes")
const productRouter = require("./router/products.routes")
const fruitsRouter = require("./router/fruits.routes")
const worksRouter = require("./router/works.routes")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

app.use(authRouter)
app.use(productRouter)
app.use(fruitsRouter)
app.use(worksRouter)



app.use(errorMiddleware)


app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
})
