const express = require("express")
const cors = require("cors")
const errorMiddleware = require("./middleware/error.middleware")
const authRouter = require("./router/auth.routes")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

app.use(authRouter)


app.use(errorMiddleware)


app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
})
