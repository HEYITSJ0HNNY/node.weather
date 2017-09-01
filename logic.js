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
    inquirer.prompt([{
            name: "name",
            message: "what is your name?",
        },
        {
            name: "location",
            message: "what is your location?",
        }
    ]).then(function(answers) {

        var newUser = new UserSearch(answers.name, answers.location);
        newUser.getWeather();
        var storedData = newUser.name + " " + newUser.location + "\n"
        fs.appendFile('txt.txt', storedData, function(err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });
}
if (user === "admin") {
    var adminData = fs.readFileSync('txt.txt', 'utf8');
    console.log(adminData)
}
