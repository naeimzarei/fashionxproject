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

### Regression Testing
The combination of unit and functional testing make up the regression testing for each sprint. We are testing both the functional aspect (user-interface) as well as the code (unit testing) to ensure that the results of the view match that of the code. 

Unit testing will specifically focus on test cases centered around the programming side of things while the functional testing will heavily focus on the user experience. 