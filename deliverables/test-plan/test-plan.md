# Test Plan
The app has been tested to work correctly on Google Chrome 71.0.3578.80 and Mozilla Firefox 62.0.3.

## Platforms
1. Node files: use Jest for unit testing Node files on the server side 
2. Browser: possibly use Robot Framework to ensure functionality in browser, or use nightwatch.js for functional testing instead. As time has progressed, we have decided to use nightwatch.js for the browser functionality. 

## Test Cases
For the purpose of this project, a combination of unit and functional testing will be implemented. 

### Unit Testing
We will use the Jest framework for unit testing, a popular framework made by Facebook. This framework is designed specifically for JavaScript so it will work hand-in-hand with our Node-heavy project. Ensure that the server is running in the background (npm run start) prior to executing the unit tests.

[Unit Test Cases](../../app/tests/unit)

### Functional Testing
For functional testing, we will possibly use Robot Framework to ensure the user interface functionality is up and running during each sprint. 

After researching, we have decided we will use nightwatch.js for functional testing. It is a framework on top of Selenium that allows for easy functional testing. 

[Functional Test Cases](../../app/tests/functional/tests)

### Regression Testing
The combination of unit and functional testing make up the regression testing for each sprint. We are testing both the functional aspect (user-interface) as well as the code (unit testing) to ensure that the results of the view match that of the code. 

Unit testing will specifically focus on test cases centered around the programming side of things while the functional testing will heavily focus on the user experience. 

Regression testing will be done only when new code requires unit testing. Basic CSS changes such as changing the color of an HTML element will not require regression testing to be done. However, controllers, routes, and models need to be tested for regression each time a branch wants to merge with the master branch.

### Credentials (both administrator and influencers)
1. Create credentials with valid inputs
2. Remove credentails by ID
3. Find credentials by ID
4. Find credentials by email
5. Update existing credentials by ID
6. Update existing credentials by email
7. Delete existing credentials by ID
8. Delete existing credentials by email

### Login (both administrator and influencers)
1. Accessing influencer/administrator base URL should redirect to the respectively login view
2. Access login view
3. Incorrect login credentials display error message

### Post
1. Find all posts by user email
2. Find no posts when invalid user email
3. Create/Update Invalid inputs
    1. Size: Blank
    2. Brand: Blank
    3. Selling price: -10, 0, 20, must be greater than 40
    4. Original price: -10
    5. File: None chosen
    6. Condition: Blank
    7. Item/s: Blank
4. Must have at least one picture to upload for each post

### Profile
1. Submit form with missing required fields: all missing except first name
2. Invalid inputs
    1. Age: 15
    2. Height (ft): abc
    3. Height (in): abc
    4. Weight (lbs): abc
    5. Waist (in): abc
    6. Hips (in): abc
    7. Leg Length: abc
    8. Zip code: 00000
    9. Instagram: insta_profile
    10. Paypal: mypaypalaccount
    11. Bust (cup): None selected
    12. Bust (band): None selected
    13. Shirt size: None selected
    14. Jean size: None selected
    14. Usual torso length: None selected
    14. Usual leg length: None selected
3. Valid input test: Fill in all required fields with valid inputs
4. Find a created profile by ID
5. Find a created profile by email
6. Update by ID a previously created profile (no blog) with new data
7. Update by ID a previously created profile (with blog) with new data
8. Update by email a previously created profile (no blog) with new data
9. Update by email a previously created profile (with blog) with new data
10. Delete profile by ID
11. Delete profile by email

### Rights
1. Create rights for a user
2. Delete rights by ID
3. Find rights by ID
4. Find rights by email
5. Update rights by ID
6. Update rights by email
