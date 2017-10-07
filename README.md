# Timestamp-Microservice
Simple unix timestamp node server.

For a freecodecamp backend basejump project and the first time I have ever made a project in node and express.

Example Usage:
https://timestamp-ms.herokuapp.com/December%2015,%202015
https://timestamp-ms.herokuapp.com/1450137600

Example output: 
{ "unix": 1450137600, "natural": "December 15, 2015" }

Here are the user stories (The required parts of the project)

1) I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)
2) If it does, it returns both the Unix timestamp and the natural language form of that date.
3) If it does not contain a date or Unix timestamp, it returns null for those properties.
