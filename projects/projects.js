const express = require("express")

const projectDB = require("../data/helpers/projectModel")
const { validateProjectBody , validateProjectID } = require("../middleware/validate");

const router = express.Router()

router.get("/", (req, res) => {
    projectDB.get()
    .then((response) => {
        if(response) {
            return res.status(200).json(response)
        } else {
            return res.status(404).json({
                message: "No projects found"
            })
        }
    })
    .catch(error => next(error))
})

//returns a project based on ID
router.get("/:id", validateProjectID(), (req, res) => {
    res.status(200).json(req.project)
})

//POST a project
router.post("/", validateProjectBody(), (req, res, next) => {
    projectDB.insert(req.body)
    .then(data => {
        res.status(201).json(data)
    })
    .catch(error => next(error))
})

//DELETES a project
router.delete("/:id", validateProjectID(), (req, res, next) => {
    projectDB.remove(req.params.id)
    .then(count => {
        if(count > 0){
            res.status(200).json({
                message: "Project deleted"
            })
        } else {
            res.status(404).json({
                message: "Project not found"
            })
        }
    })
    .catch(error => next(error))
})

//PUTS a project
router.put("/:id", validateProjectID(), (req, res, next) => {
    projectDB.update(req.params.id, req.body)
    .then(updatedProject => {
        if(updatedProject) {
            res.status(200).json({
                message: "Project Updated"
            })
        } else {
            res.status(404).json({
                message: "Project not found"
            })
        }
    })
    .catch(error => next(error))
})



module.exports = router