const express = require("express")
const actionsDB = require("../data/helpers/actionModel")
const { validateActionBody, validateActionId } = require("../middleware/validate")

const router = express.Router()

//GET actions
router.get("/", (req, res) => {
    actionsDB.get()
    .then(response => {
        if(response) {
            res.status(200).json(response)
        } else {
            res.status(404).json({
                message: "Actions not found"
            })
        }
    })
    .catch(error => next(error))
})

//GET action by id
router.get("/:id", validateActionId(), (req, res, next) => {
    actionsDB.get(req.params.id)
    .then(response => {
        if(response) {
            res.status(200).json(response)
        } else {
            res.status(404).json({
                message: "Action was not found by that ID"
            })
        }
    })
    .catch(error => next(error))
})

//POST an action
router.post("/", validateActionBody(), (req, res, next) => {
    actionsDB.insert(req.body)
    .then(data => {
        res.status(201).json(data)
    })
    .catch(error => next(error))
})

//DELETE an action
router.delete("/:id", validateActionId(), (req, res, next) => {
    actionsDB.remove(req.params.id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({
                message: "Action has been deleted"
            })
        } else {
            res.status(404).json({
                message: "Action could not be found by that ID"
            })
        }
    })
    .catch(error => next(error))
})

//PUT an action
router.put("/:id", validateActionId(), (req, res, next) => {
    actionsDB.update(req.params.id, req.body)
    .then(updatedAction => {
        if(updatedAction){
            res.status(200).json({
                message: "Action has been updated"
            })
        } else {
            res.status(404).json({
                message: "Action could not be found by that ID"
            })
        }
    })
    .catch(error => next(error))
})



module.exports = router