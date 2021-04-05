'use strict'
const globals = require('../config/globals');
const axios =  require('axios');
const moment = require('moment');
require('dotenv').config();

module.exports.MuseumVisitorService = class MuseumVisitorService {
    
    //Get Visitors basis on date 
    async getVisitors(date,ignored_museum) {
        try
        {
            var formatted_date = this.formatDate(parseInt(date));
            var api_response = await axios({
                url : `https://data.lacity.org/resource/trxm-jn3c.json?month=${formatted_date}`,
                headers: {
                    "X-App-Token" : process.env.API_TOKEN
                },
                method : "get",
            });
            var data = api_response.data;
            //If visitor data exists for the given month
            if(data.length > 0)
            {
                data = data[0];
                //Remove the ignored museum from the data
                var data_without_ignored_museum = this.removeIgnoredMuseum(data,ignored_museum);
                //Get the total visitors without counting the ignored museum
                var total_visitors = this.getTotalVisitors(data_without_ignored_museum);
                //Get the museum with the lowest visitors without counting the ignored museum
                var museum_with_lowest_visitors = this.getMuseumWithLowestVisitors(data_without_ignored_museum);
                //Get the museum with the highest visitors without counting the ignored museum
                var museum_with_highest_visitors = this.getMuseumWithHighestVisitors(data_without_ignored_museum);
                //Format the response
                var formatted_response = this.formatResponse(data,total_visitors,museum_with_lowest_visitors,museum_with_highest_visitors,ignored_museum,formatted_date);
                return {
                    status: 200,
                    Message: formatted_response
                }
            }
            else
            {
                //Return message stating that no data exists for the given month.
                return {
                    status: 200,
                    Message: globals.NO_RECORDS_FOR_THE_GIVEN_MONTH
                }
            }
        }
        catch(e)
        {
            return {
                status : 500,
                Message: globals.GENERAL_EXCEPTION
            };
        }
    }

    //Format the date as required by the external API.
    formatDate(date)
    {
        var date_without_time = moment(date).format("YYYY-MM-DD");
        return date_without_time;
    }

    //Remove the ignored museum from the JSON object
    removeIgnoredMuseum(data,ignored_museum)
    {
        if(ignored_museum)
        {
            var visitor_data = JSON.parse(JSON.stringify(data));
            delete visitor_data[ignored_museum];
            return visitor_data;
        }
        else
        {
            return data;
        }
    }

    //Calculate the total visitors for the given month
    getTotalVisitors(data)
    {
        var data_without_month = JSON.parse(JSON.stringify(data));
        delete data_without_month["month"];
        const total_visitors = Object.keys(data_without_month).reduce((total,museum_names) => {
            return total + parseInt(data_without_month[museum_names]);
        },0)
        return total_visitors;
    }

    //Find the museum with the highest number of visitors for the given month.
    getMuseumWithHighestVisitors(data)
    {
        var data_without_month = JSON.parse(JSON.stringify(data));
        delete data_without_month["month"];
        const highest_visitors = Object.keys(data_without_month).reduce((max, museum_name) => {
            return Math.max(max, parseInt(data_without_month[museum_name]));
        },0);
        var museum_name = Object.keys(data_without_month).find(key => data_without_month[key] === (highest_visitors).toString());
        
        var response = {
                        "museum": museum_name,
                        "visitors": highest_visitors
                        };
        return response;
    }

    //Finf the museum with the lowest number of visitors for the given month.
    getMuseumWithLowestVisitors(data)
    {
        var data_without_month = JSON.parse(JSON.stringify(data));
        delete data_without_month["month"];
        const lowest_visitors = Object.keys(data_without_month).reduce((min, museum_name) => {
            return Math.min(min, parseInt(data_without_month[museum_name]));
        },Infinity);
        var museum_name = Object.keys(data_without_month).find(key => data_without_month[key] === (lowest_visitors).toString());
        var response = {
                        "museum": museum_name,
                        "visitors": lowest_visitors
                        };
        return response;
    }

    //Format the response
    formatResponse(data,total_visitors,museum_with_lowest_visitors,museum_with_highest_visitors,ignored_museum,formatted_date)
    {
        var response = {
            "attendance" : {}
        };

        var month = this.getMonthFromDate(formatted_date);
        var year = this.getYearFromDate(formatted_date);
        response.attendance["month"] = month;
        response.attendance["year"] = year;
        if(total_visitors == 0)
        {
            response.attendance["highest"] = {};
            response.attendance["lowest"] = {};    
        }
        else
        {
            response.attendance["highest"] = museum_with_highest_visitors;
            response.attendance["lowest"] = museum_with_lowest_visitors;
        }
        if(ignored_museum && data[ignored_museum])
        {
            response.attendance["ignored"] = {
                    "museum" : ignored_museum,
                    "visitors" : parseInt(data[ignored_museum])
            };
        }
        response.attendance["total"] = total_visitors;
        return response;
    }

    //Get the month from the input date
    getMonthFromDate(formatted_date)
    {
        var month = moment(formatted_date).format("MMM");
        return month;
    }

    //Get the year from the input date
    getYearFromDate(formatted_date)
    {
        var year = moment(formatted_date).format("YYYY");
        return year;
    }
};