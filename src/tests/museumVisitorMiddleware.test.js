const request = require("supertest");
const app = require("../../app.js");

describe("Museum Visitor Middleware", () => {

    it("should check when no date is passed in the request", async () => {
      var response = await request(app)
      .get(`/api/visitors/`);
      expect(response.statusCode).toBe(400);
      expect(response.body.Message).toEqual("Date field is required.");
    });

    it("should check when invalid date is passed in the request", async () => {
        var date = 'Invalid date';
        var response = await request(app)
        .get(`/api/visitors?date=${date}`);
        expect(response.statusCode).toBe(422);
        expect(response.body.Message).toEqual("Date is expected to be in milliseconds.");
    });
});


