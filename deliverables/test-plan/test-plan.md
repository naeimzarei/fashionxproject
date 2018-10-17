# Test Plan

## Platforms
1. Node files: use Jest for unit testing Node files on the server side 
2. Browser: possibly use Robot Framework to ensure functionality in browser 

## Test Cases
For the purpose of this project, a combination of unit and functional testing will be implemented. 

### Unit Testing
We will use the Jest framework for unit testing, a popular framework made by Facebook. This framework is designed specifically for JavaScript so it will work hand-in-hand with our Node-heavy project. 

### Functional Testing
For functional testing, we will possibly use Robot Framework to ensure the user interface functionality is up and running during each sprint. 

After researching, we have decided we will use nightwatch.js for functional testing. It is a framework on top of Selenium that allows for easy functional testing. 

### Regression Testing
The combination of unit and functional testing make up the regression testing for each sprint. We are testing both the functional aspect (user-interface) as well as the code (unit testing) to ensure that the results of the view match that of the code. 

Unit testing will specifically focus on test cases centered around the programming side of things while the functional testing will heavily focus on the user experience. 

Regression testing will be done only when new code requires unit testing. Basic CSS changes such as changing the color of an HTML element will not require regression testing to be done. However, controllers, routes, and models need to be tested for regression each time a branch wants to merge with the master branch.

### Sign-up Influencer
1. Valid input test: Fill in all fields with valid input and submit
2. Submit empty form
3. Submit form with missing required fields: all missing except first name
4. Invalid inputs
    1. Age: abc
    2. Height (ft): abc
    3. Height (in): abc
    4. Weight (lbs): abc
    5. Waist (in): abc
    6. Hips (in): abc
    7. Leg Length: abc
5. Submit form without agreeing to Terms of Service
