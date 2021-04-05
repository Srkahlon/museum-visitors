const museumVisitorService = require("../services/museumVisitorService.js").MuseumVisitorService;

describe("Museum Visitor Service", () => {

    it("should check when date is passed to the getVisitor method", async () => {
      var museumVisitorServiceObj = new museumVisitorService();
      var date = '1404198000000';
      var ignored_museum = null;
      var response = await museumVisitorServiceObj.getVisitors(date,ignored_museum);
      expect(response.status).toBe(200);
      expect(typeof response.Message).toBe("object");
      expect(typeof response.Message.attendance).toBe("object");
    });

    it("should check when date and ignore param is passed to the getVisitor method", async () => {
        var museumVisitorServiceObj = new museumVisitorService();
        var date = '1404198000000';
        var ignored_museum = 'avila_adobe';
        var response = await museumVisitorServiceObj.getVisitors(date,ignored_museum);
        expect(response.status).toBe(200);
        expect(typeof response.Message).toBe("object");
        expect(typeof response.Message.attendance.ignored).toBe("object");
    });

    it("should format the date as expected", async () => {
        var museumVisitorServiceObj = new museumVisitorService();
        var date = 1404198000000;
        var response = museumVisitorServiceObj.formatDate(date);
        expect(response).toBe("2014-07-01");
    });

    it("should remove the ignored museum from the JSON Object", async () => {
        var museumVisitorServiceObj = new museumVisitorService();
        var data = {
          "month": "2019-08-01T00:00:00.000",
          "america_tropical_interpretive_center": "3410",
          "avila_adobe": "20921",
          "chinese_american_museum": "2017",
          "gateway_to_nature_center": "977",
          "firehouse_museum": "4460",
          "iamla": "1258",
          "pico_house": "120",
          "museum_of_social_justice": "1701",
          "biscailuz_gallery": "872"
        };
        var ignored_museum = "chinese_american_museum";
        var response = museumVisitorServiceObj.removeIgnoredMuseum(data,ignored_museum);
        expect(typeof response[ignored_museum]).toBe("undefined");
      });

      it("should calculate the total visitors", async () => {
        var museumVisitorServiceObj = new museumVisitorService();
        var data = {
          "month": "2019-08-01T00:00:00.000",
          "america_tropical_interpretive_center": "3410",
          "avila_adobe": "20921",
          "chinese_american_museum": "2017",
          "gateway_to_nature_center": "977",
          "firehouse_museum": "4460",
          "iamla": "1258",
          "pico_house": "120",
          "museum_of_social_justice": "1701",
          "biscailuz_gallery": "872"
        };
        var response = museumVisitorServiceObj.getTotalVisitors(data);
        expect(response).toBe(35736);
      });

      it("should get the museum with the highest visitors", async () => {
        var museumVisitorServiceObj = new museumVisitorService();
        var data = {
          "month": "2019-08-01T00:00:00.000",
          "america_tropical_interpretive_center": "3410",
          "avila_adobe": "20921",
          "chinese_american_museum": "2017",
          "gateway_to_nature_center": "977",
          "firehouse_museum": "4460",
          "iamla": "1258",
          "pico_house": "120",
          "museum_of_social_justice": "1701",
          "biscailuz_gallery": "872"
        };
        var response = museumVisitorServiceObj.getMuseumWithHighestVisitors(data);
        expect(response.museum).toBe("avila_adobe");
        expect(response.visitors).toBe(20921);
      });

      it("should get the museum with the lowest visitors", async () => {
        var museumVisitorServiceObj = new museumVisitorService();
        var data = {
          "month": "2019-08-01T00:00:00.000",
          "america_tropical_interpretive_center": "3410",
          "avila_adobe": "20921",
          "chinese_american_museum": "2017",
          "gateway_to_nature_center": "977",
          "firehouse_museum": "4460",
          "iamla": "1258",
          "pico_house": "120",
          "museum_of_social_justice": "1701",
          "biscailuz_gallery": "872"
        };
        var response = museumVisitorServiceObj.getMuseumWithLowestVisitors(data);
        expect(response.museum).toBe("pico_house");
        expect(response.visitors).toBe(120);
      });

      it("should return the month from the date", async () => {
        var museumVisitorServiceObj = new museumVisitorService();
        var date = "2014-07-01T00:00:00.000";
        var response = museumVisitorServiceObj.getMonthFromDate(date);
        expect(response).toBe("Jul");
      });

      it("should return the year from the date", async () => {
        var museumVisitorServiceObj = new museumVisitorService();
        var date = "2014-07-01T00:00:00.000";
        var response = museumVisitorServiceObj.getYearFromDate(date);
        expect(response).toBe("2014");
      });
});


