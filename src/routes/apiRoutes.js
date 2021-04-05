const museumVisitorController = require("../controllers/museumVisitorController.js").MuseumVisitorController;
const museumVisitorMiddleware = require("../middleware/museumVisitorMiddleware.js").MuseumVisitorMiddleware;

module.exports = (app) => {
    var museumVisitorControllerObj = new museumVisitorController();
    var museumVisitorMiddlewareObj = new museumVisitorMiddleware();
    
    //To get the museum visitors basis on date.
    app.get(`/api/visitors/`,
        museumVisitorMiddlewareObj.validateRequest,
        museumVisitorControllerObj.getVisitors,
    );
};