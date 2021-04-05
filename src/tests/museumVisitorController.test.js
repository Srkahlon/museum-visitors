const request = require("supertest");
const app = require("../../app.js");

describe("Museum Visitor Controller", () => {

    it("should check when valid date param is given", async () => {
      var date = '1404198000000';
      var response = await request(app)
      .get(`/api/visitors?date=${date}`);
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    it("should check when valid date and ignore param is given", async () => {
        var date = '1404198000000';
        var ignore = 'avila_adobe'
        var response = await request(app)
        .get(`/api/visitors?date=${date}&ignore=${ignore}`);
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe("object");
    });
});


