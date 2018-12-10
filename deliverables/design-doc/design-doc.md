# Design Document

## Architecture
![Diagram](../../app/public/images/image.png)

Source: [MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)

For the uploading interface, we will use Amazon S3, a cloud storage solution to upload the post pictures that influencers make. Amazon S3 will be called on by routes and controllers. 

For hosting, we will use Elastic Beanstalk, a hosting solution by Amazon. Elastic Beanstalk will host our Express application and manage all traffic to the server. 

## Decomposition 

This application is constructed using Express, EJS, and MnogoDB. It is a typical MVC application: MongoDB and Mongoose provide the model and scheams, EJS provides the view, and the controller directs the flow of data by using Express routes.

1. Configuration (Node): store database information and other environment related fields 
2. Controllers (Node): ask models for data and render the data using EJS. Controllers are invoked through the use of routes. In addition, controllers take care of the logic behind what is rendered on the page.
3. Models (Node): turn database information into object-oriented format to make it simple to query the database. 
4. Database (Mongoose): store user information. Models request data from the database. 
5. Routes (Node): forward requests to controllers, that will later ask models for information from databse. 
6. Tests (Jest): unit tests to ensure application is up and running 
7. Views (EJS): controllers render data obtained from models and database on a web page using a JavaScript templating engine.
8. Node modules (Node): contain all necessary packages to get the application up and running 
9. Server: Hosted on AWS. AWS runs on Elastic Beanstalk to run a Node server 24/7 and handle restarts when updating code.
10. S3: upload photos to Amazon's S3 service for post images. 

### Modules

    /bin

The entry point of the Express application. Sets up the server and gets it running on the host.

    /config

The file, [config.js](../../config/config.js), contains environmental variables to be used across the server files, such as the host and port the application will be hosted on. These variables are constants that are exported as a Node module. As a result, they can be imported from other Node files. 

    /controllers

This folder contains controllers, the Node files that obtain information from models and display the data under views.

    /deliverables

This folder contains deliverables for this course.

    /docs

This folder contains documentation, such as meeting notes and requirements for the client. 

    /models

This folder contains model files, which are responsible for hitting the database API and storing information in schemas in Node.

    /node_modules

This folder contains node modules and dependencies required to run the project.

    /public

This folder contains static files such as images, javascript files such as jquery and bootstrap, as well as stylesheets. 

    /routes

This folder contains route files which are responsible for  routing requests to controllers.

    /test

This folder contains Jest unit testing files.

    /views

This folder contains view files, which are responsible for rendering data to the browser. These files output what the user sees on the screen.

    /util

This folder contains helper functions for the various parts of the application, such as validation error enumerations. In addition, it contains helper functions to provide administrative privilege to a user. 

### Other Data
    .elasticbeanstalk

This folder contains AWS Elastic Beanstalk configuration files. 


    .gitignore

This file is used to prevent Git from commiting unwanted files to the repository.

    .ebignore

This file is used to prevent AWS Elastic Beanstalk from pushing unwanted files to the server. When the .ebignore file is created, the .gitignore file is ignored when deploying to Elastic Beanstalk.

    /bin/www

This file is used to setup the Express server. 

    app.js

This file is used to setup Expres routers, error handling, and the initial view.

    package.json

This file is used to setup the node package manager.

    README.md

This file contains documentation.

    .npmrc

Contains fields necessary for npm to run properly on Elastic Beanstalk. 

    nightwatch.conf.js

Contains necessary configuration for nightwatch functional testing to work properly. 

## Module Definitions, Data Definitions 

### Configuration (Node)

This file configures all necessary environmental variables, such as the username and password for the MongoDB connection. Of course, the password is hashed and not pushed to GitHub but it is stored on AWS Elastic Beanstalk. The file is called ```config.js``` and it is located under ```app/config/config.js```.

### Controllers 

Controllers are all coded using Node. 

1. ```app/controllers/authenticate-controller.js```: the file that is used to ensure that the user is authenticated each time he or she visits the page. A caching mechanism will be used to store the information on the browser so that user is not required to sign in everytime. The authorization controller uses the bcrypt library to hash the password and compare it with the password the user inputs. If there is a match, the user is authenticated. It invokes the Auth model, which is the Mongoose schema used to model an authorization request to the database. 
2. ```app/controllers/credentials-controller.js```: this controller stores and obtains the user's email and password from the database. It invokes the Credentials model, which is a Mongoose schema used to model a request for credentials to the database.
3. ```app/controllers/signup-controller.js```: this controller is used to validate a sign up request from an influencer or administrator. It checks that required fields have been completed and stores the newly created user profile on the database. It invokes the Profile model, which is the Mongoose schema used to model a request for profile data. 
4. ```app/controllers/post-controller.js```: this controller is used to validate a post creation request from an influencer. It checks that required fields have been completed and stores the newly created post on the database. It invokes the Post model, which is the Mongoose schema used to model a request for post data. 
5. ```app/controllers/rights-controller.js```: this controller is used to set, remove, and find access levels for users. Access levels denote what a user can do within the app (e.g. shopper, influencer, moderator) each of which having their own rights (e.g. uploading pictures, approving them, etc.).
6. ```app/controllers/administrator-controller.js```: this controller is used to find, remove, or update administrator information on the database. 
7. ```app/controllers/profile-controller.js```: this controller is used to validate inputs from the sign up form, when a user is applying to become an influencer.

### Models

Models are all coded using Node. Models are essentially that, models of data from the database. Models are created using Mongoose schemas and exported as Node modules. Mongoose queries to MongoDB Atlas occur in model files. 

1. ```app/models/Auth.js```: model for authorization controller. Used every time a request for authorization is made to the database. 
2. ```app/models/Credentials.js```: model for credentials controller. Used when a new user is created and every time user credentials are requested. 
3. ```app/models/Profile.js```: model used in the signup controller. Used when a new user profile is being created or accessed from the database. 
4. ```app/models/Rights.js```: model used in the rights controller. Used every time a request for the user's access right is made to the database. 
5. ```app/models/Post.js```: model used in the post controller. Used every time a request for a post is made to the database. 
6. ```app/models/Administrator.js```: model for administrator controller. Used every time a new administrator is created and when other actions from the administrator-controller are called (ex/ authenticate, findAdmin, update, etc)

### Database

The database is implemented in model files as documented above. MongoDB Atlas is integrated within the web app through the use of Mongoose model files. A connection is made to the MongoDB Atlas server and credentials are validated to ensure that the user has access to the database. The MongoDB Atlas driver is injected within the model files to access the database. 

The configuration file as documented previously contains the username and password. The model files access these credentials by importing the config module. The username and password are not stored in GitHub. Rather, they are ignored by GitHub so the database does not get compromised. Furthermore, a SHA256 password is produced to make it even more difficult to reverse engineer the system. 

The schema (or collections) for our database are as follows (Email being the foreign key):  
```javascript
Profile {  
    First Name: string  
    Email: string  
    Instagram handle: string  
    Blog: string  
    Age: int  
    Height: int  
    Weight: int  
    Waist: int  
    Hips: int  
    Bust: string  
    Band: string  
    Jean Size: int  
    Shirt Size: string  
    Leg Length: string  
}
```

```javascript
Credentials {  
    Email: string  
    Password: string  
}
```

```javascript
Rights {
    Email: string  
    Rights: string  
}
```

```javascript
Post {
    Item: string,
    Size: string,
    Brand: string,
    Selling_price: number,
    Original_price: number,
    Condition: string,
    Description: string,
    Date: date,
    Email: string,
    Img_urls: array
}
```

```javascript
Administrator {
   Email: string  
   Password: string 
}
```


### Routes 

Routes are all coded using Node. They forward requests to controllers, such visiting the home page of the web app. To simplify routing, the Express module is imported within each route file. Express has 'routers', which are files that route a specific path of the web app. For instance, ~/shopherlook/influencers gets forwarded to the influencer router. Within each router, individual routes are defined. 

1. ```app/routes/index.js```: routes all requests on the main page of shopherlook using Express. 
2. ```app/routes/influencers.js```: routes all requests on the influencer page of shopherlook using Express. 
3. ```app/routes/dashboard.js```: routes all requests on the dashboard page of shopherlook using Express.
4. ```app/routes/template.js```: routes GET request to display template base used for all pages using Express.
5. ```app/routes/administrator.js```: routes all requests from administrator panel of shopherlook using Express.

### Server

The server is started using Express. For the purpose of this web app, the server is located on AWS Elastic Beanstalk. The ```eb``` command line tool is used to deploy changes to the production environment. 

1. ```.elasticbeanstalk/config.yml```: contains the configuration file for deploying the changes to Elastic Beanstalk.
2. ```app/.ebextensions/nodecommand.config```: contains the command necessary to start the server
3. ```app/.ebextensions/staticfiles.config```: set the public folder for accessing public files such as stylesheets. 
4. ```app/bin/www```: the entry point to the Express application. Imports environment variables to decide where to run the server. 
5. ```app/app.js```: the Express file that starts the server. 

### Tests

The folder, ```app/tests/unit```, contains unit test cases to ensure that every singular 'unit' of code has been tested for quality assurance. 

The folder, ```app/tests/functional```, contains functional test cases to ensure the user interface is navegable each time new code is introduced to the application. This type of testing is from the user's point of view, not code side of view. 

### Views

In this web app, the views are EJS files, which are JavaScript template engine files that render what the user sees on the page. Views rely on controllers for data population. 

```views/pages/influencers```

1. ```views/pages/index.ejs```: the main page of shopherlook when navigating to ~/shopherlook 
2. ```views/pages/influencers/home.ejs```: the home page of influencers when navigating to ~/shopherlook/influencers or ~/shopherlook/influencers/home
3. ```views/pages/influencers/login.ejs```: the login page for influencers to login when navigating to ~/shopherlook/influencers/login
4. ```views/pages/influencers/manual.ejs```: the page where the shopherlook manual is stored
5. ```views/pages/influencers/signup.ejs```: the page for influencers to sign up when navigating to ~/shopherlook/influencers/signup
6. ```views/pages/influencers/applied.ejs```: the landing page once an influencer applies but hasn't been approved.
7. ```views/pages/influencers/edit.ejs```: the page where users can edit the fields/images from a selected post
8. ```views/pages/influencers/post.ejs```: the page where users can view a selected post
9. ```views/pages/influencers/profile.ejs```: the page where users can view their profile and update fields if necessary
10.```views/pages/influencers/submit.ejs```: the page where users are directed when clicking the purple "sell" button in the navigation bar. This page allows users to create new posts

```views/pages/administrators```

1.```views/pages/administrators/admin-manual.ejs```: this is the user manual for administrators
2. ```views/pages/administrators/login.ejs```: this is the login page for administrators only
3. ```views/pages/administrators/panel.ejs```: this is the main page for administrators where they can approve/deny influencers


### Node Modules

Since we are dealing with rendering pages from the server side for validation purposes, node modules are a necessity. Node modules contain the meat and bones of Node applications. Express is a Node module that is heavily used within this web app for routing. The Node modules are stored under ```~/node_modules```. NPM is a package manager while Node is a JavaScript runtime environment for server-side JavaScript programming. 

The ```package.json``` file compiles the node modules and defines scripts to run during startup. 

The ```package-lock.json``` file is the helper file for ```package.json```.

### Etcetera 

The ```.ebignore``` and ```.gitignore``` files define which files should be ignored for the production and development environments, respectively. 

## Design Descisions 

For the database, we decided to go with MongoDB Atlas for the purposes of this application. It is simple to implement and works really well with Express. MongoDB Atlas allows us to quickly make changes to the schema as the client changes requirements without needing to worry about updating relationships and old fields.

For the view, we decided to go with EJS because it is really easy to implement since Express routes support templating engines very well. 

For the model, we decided to go with Mongoose (ODM), which obtains the data from MongoDB Atlas and constructs schemas. 

For the controllers and routes, we decided to go with Express because it is a very popular module for implementing routes and middleware. In addition, it allows us to render the view using a JavaScript templating engine. 

We originally were thinking of using React.js or some other framework such as Angular for the view, but that required more work than necessary. It would have required us to brush up on an external dependency, which would increase the amount of time it takes to produce the product. As a result, we went with EJS, which is easily implemented and does not require an extensive learning curve. 

We chose to use AWS S3 to store the thumbnails for the influencer posts because it is cheap to store large amounts of data and AWS provides a reliable, well-known way handle uploading and retrieving static files.

An influencer is a shopper, but a shopper is not an influencer. An influencer can be directed to the shopping side, but a shopper cannot be directed to the influencer experience. If a person is marked as an influencer, then a button will appear on the shopping experience that will allow the influencer to go back to the influencer experience. This button will only appear on the shopping experience if and only if the user is marked as an influencer.

~~A moderator is neither an influencer nor shopper. A moderator is an independent user that checks the posts of influencers before they are published. An administrator grants moderator access and can add or remove it at any time in the administrative panel.~~

At the moment, anyone can sign up to be an influencer. Once signed up, an administrator must approve the influencer through the admin portal. Once signing up, the influencer receives an email. Once approved/rejected, the influencer then receives another email with the updated status.

For authentication, we are using bcrypt module to hash the passwords and compare the hash with the inputted password during login. 

There are no longer moderators in this application. This application is no longer called 'fashionxproject' but rather it is called 'shopherlook' after our client went through some business changes. There are only three types of users within shopherlook: administrator, influencer, and shopper. An administrator approves who gets to be an influencer within the shopherlook application, an influencer creates the posts and content and shoppers buy the content that influencers promote. 