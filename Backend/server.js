require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

//connect to database
connectToDB()

//server running
app.listen(3000, () => {
    console.log("server is running on port 3000")
})
