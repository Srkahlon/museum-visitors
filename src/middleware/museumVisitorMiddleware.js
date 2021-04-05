'use strict'
const globals = require('../config/globals');

module.exports.MuseumVisitorMiddleware = class MuseumVisitorMiddleware
{
    //Check if required field i.e. date in present in the request, in the required format. 
    async validateRequest(req,res,next) {
        if (req.query.hasOwnProperty("date") && req.query.date != null) {
            var date = new Date(parseInt(req.query.date))
            if(date == "Invalid Date" || isNaN(date))
            {
                res.status(422).send({
                    status : 422,
                    Message: globals.INVALID_DATE_FORMAT
                });
            }
            else
            {
                next();
            }
        } else {
            res.status(400).send({
                status : 400,
                Message: globals.MISSING_DATE_FIELD
            });
        }
    }
}