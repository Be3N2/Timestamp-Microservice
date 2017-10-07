// server.js

var express = require('express');
var app = express();

var referenceTable = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december",];
//unnecessary but very convenient
var referenceShort = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:date", react);

//the main for the date input
function react(request, response) {
  
  var data = decodeURI(request.params.date);
  var info = data.replace(/[-,]+/g, " ").replace(/\s+/g, " ");
  info = info.split(" ");
  
  var responseObj = { "unix": null, "natural": null };
  
  if (info.length == 1) responseObj = unixToDate(info, responseObj);
  if (info.length == 3) responseObj = dateToUnix(info, responseObj);
  
  response.send(responseObj);
}

//date to unix
function dateToUnix(input, returnObj) {
  //easier to match
  var month = '' + input[0];
  month = month.toLowerCase(); 
  //loop through reference table
  for (let i = 0; i < referenceTable.length; i++) { 
    //compare to table
    if (month == referenceTable[i] || month == referenceShort[i]) { 
      //if other values are valid (could make a lookup table for month length but under 31 is fine, date fixes it anyway)
      if (!isNaN(input[1]) && input[1] <= 31 && !isNaN(input[2])) {
        var dateObj = new Date(input[2], i, input[1]); //year month day
        console.log(input[1] + " | " + input[2]);
        returnObj.natural = referenceTable[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + (dateObj.getYear() + 1900);
        returnObj.unix = Math.round(dateObj.getTime()/1000); //date object to unix time
      }
    }
  }
  
  return returnObj;
}

//unix timestamp to date
function unixToDate(input, returnObj) {
  if (!isNaN(input[0]) && input[0] >= 0) {
    returnObj.unix = input[0];
    var dateObj = new Date(input[0] * 1000);    
    returnObj.natural = referenceTable[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + (dateObj.getYear() + 1900);
    return returnObj;
  } else {
    return returnObj;
  }
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});