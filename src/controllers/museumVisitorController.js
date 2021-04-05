'use strict'

const globals = require('../config/globals');
const museumVisitorService = require("../services/museumVisitorService.js").MuseumVisitorService;

module.exports.MuseumVisitorController = class MuseumVisitorController {
    
    //Get Visitors basis on date passed in the request
    async getVisitors(req,res,next) {
        try
        {
            var date = req.query.date;
            var ignored_museum = null;
            if(req.query.hasOwnProperty("ignore"))
            {
                ignored_museum = req.query.ignore;
            }
            var museumVisitorServiceObj = new museumVisitorService();
            var response = await museumVisitorServiceObj.getVisitors(date,ignored_museum);
            res.status(response.status).send(response);
        }
        catch(e)
        {
            res.status(500).send({
                status : 500,
                Message: globals.GENERAL_EXCEPTION
            });
        }
    }
};