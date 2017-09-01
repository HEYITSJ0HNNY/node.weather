var inquirer = require("inquirer");
var weather = require("weather-js");
var fs = require("fs");
var user = process.argv[2];

if (user === "user") {
    function UserSearch(name, location) {
        this.name = name;
        this.location = location;
        this.getWeather = function() {
            weather.find({
                search: this.location,
                degreeType: 'F'
            }, function(err, result) {
                if (err) console.log(err);
                console.log(JSON.stringify(result, null, 2));
            });
        }
    };
