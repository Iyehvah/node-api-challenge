const express = require("express")
const server = express()

const welcome = require("./welcome/welcome")
const projectsRouter = require("./projects/projects")
// const actionRouter = require("./actions/actions")
const helmet = require("helmet")
const logger = require("./middleware/logger")

server.use(helmet())
server.use(logger("short"))
server.use(express.json())
server.use("/", welcome)
server.use("/api/projects", projectsRouter)
// server.use("/api/actions", actionRouter)

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`Server listening at http://localhost${port}`)
})