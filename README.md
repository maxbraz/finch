# Getting Started with This Technical challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## install dependencies
from terminal navigate to the /client directory, run npm install
navigate to the /server directory, run npm install

## start the server
from withing the server directory, run node server.js
output to terminal should read:
    Server is running on port: 5000
    Successfully connected to MongoDB

In the client directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

From Finch
Instructions:

Create a web application in your favorite language that calls Finch’s Sandbox API to get an access token based on the user-selected provider.
Use the access token to get the employer’s company information and the full employee directory and display both to the user.
Upload your code to a public Github repository and send your interviewer the link when you are done. Instructions on how to run your code locally would be helpful.
You can use Finch’s API documentation for help, but keep in mind that the API domain you will be using for this project is https://finch-sandbox-se-interview.vercel.app/.
Requirements:

Your user interface should allow each individual employee from the directory to be selected and show the employee's personal and employment data.
The access token should not be allowed to call the /payment or /pay-statement endpoint.
Do not spend a long time building a beautiful user interface; simple is perfectly fine. However, you do need to display each field individually. You cannot simply display the JSON response via <pre>{JSON.stringify(<your-data>, null, 2}</pre> even though it is helpful initially for testing.
A custom error message should be displayed in your application when a provider does not implement a certain endpoint.
Questions that will be asked during your presentation:

How does your application respond when the field returned by the provider is null?
How does your application respond when a provider does not implement an endpoint?
Where is your access token stored?
Given more time, what would you want to do to make it better?
[bonus points] Did you find the XSS vulnerability in the /api/sandbox/create endpoint?
