const projectDB = require("../data/helpers/projectModel")
// const actionDB = require("../data/helpers/actionModel")

function validateProjectBody() {
    return( req, res, next) => {
        if(!req.body) {
            res.status(400).json({
                message: "There was no project body included"
            })
        } else if(!req.body.name || !req.body.description) {
            res.status(400).json({
                message: "There was no name / description included"
            })
        } else {
            next()
        }
    }
}

function validateProjectID(id) {
    return (req, res, next) => {
        projectDB.get(req.params.id)
        .then((project) => {
            if(project) {
                req.project = project
                next()
            } else {
                res.status(404).json({
                    message: "Invalid project id"
                })
            }
        })
        .catch(error => {
            next(error)
        })
    }
}

//actions middleware
function validateActionBody(){
    return (req, res, next) => {
        if(!req.body){
            res.status(400).json({
                message: "Action body was not found"
            })
        } else if( !req.body.project_id || !req.body.description || !req.body.notes) {
            res.status(400).json({
                message: "Provide project Id, description, and note please"
            })
        } else {
            next()
        }
    }
}


module.exports = {
    validateProjectBody,
    validateProjectID,
    validateActionBody
}