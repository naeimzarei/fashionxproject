* [Final Deliverables](#sprint-deliverables)
	* [Functional Specification](#functional-specification)
	* [Design Doc](#design-doc)
	* [User Manual](#user-manual)
	* [Administrator Manual](#administrator-manual)
	* [Test Plan](#test-plan)
	* [Version-Controlled Repository](#version-controlled-repository)
	* [Deployed Application](#deployed-application)
	* [Video of Working System](#video-of-working-system)
	* [Executable Code](#executable-code)

# Navigation
* [General Materials](#general-materials)
	* [Project Information](#project-introduction)
	* [Meeting Times](#meeting-times)
	* [Contact Information](#contact-information)
	* [Project Roles](#project-roles)
	* [Team Rules](#team-rules)
		* [Team Behavior](#team-behavior)
		* [Coding Practices](#coding-practices)
	* [Journal of Meetings](#journal-of-meetings)
	* [Related Links](#related-links)
* [Requirements Deliverables](#requirements-deliverables)
	* [Project Concept](#project-concept)
		* [Summary](#summary)
		* [Tweet](#tweet)
	* [User Stories](#user-stories)
	* [Personas](#personas)
	* [Platform Analysis and Selection](#platform-analysis-and-selection)
		* [Platform Selection](#platform-selection)
		* [Server Selection](#server-selection)
		* [Development Environment](#development-environment)
	* [Prototype](#prototype)
* [Final Deliverables](#sprint-deliverables)
	* [Functional Specification](#functional-specification)
	* [Design Doc](#design-doc)
	* [User Manual](#user-manual)
	* [Administrator Manual](#administrator-manual)
	* [Test Plan](#test-plan)
	* [Version-Controlled Repository](#version-controlled-repository)
	* [Deployed Application](#deployed-application)
	* [Video of Working System](#video-of-working-system)
	* [Executable Code](#executable-code)

# General Materials

## Project Introduction
The goal of this project is to add a page on the current shoperlook website to allow 'influencers' to login, create a profile, and submit photos of their fashion content. The platform, shopherlook, is a fashion start-up that finds clothing that looks good on people based on their body dimensions. As part of this project, the uploading of influencer profiles and content will be automated to reduce the amount of time it takes to process what is shown on the actual website to the shoppers. 

## Meeting Times
Team- Friday 10 AM  
Client- Friday 11 AM in-person/online   
Instructor- Wednesday 11:15 AM-12:05 PM  

## Contact Information
* Yashar Asgari: yasgari@ad.unc.edu  
* Zach Burk: zburk@live.unc.edu  
* Naeim Zarei: naeimz@live.unc.edu  
* Client: Ignacio Guerra, Ashley Rosenthal 

## Project Roles
Client and Project Manager- Yashar Asgari   
Editor- Zach Burk  
Chief Architect- Naeim Zarei  

## Team Rules

### Team Behavior
How long do you wait for someone to arrive at a meeting before you begin without them?
> For group meetings, we will wait up to 15 minutes for the members to show up. If not, we will continue working on the project with those that are present. For client meetings, we will wait up to 20 minutes for their arrival. If they do not come within that time slot, we will give them an immediate email notification of an alternative meeting time. In addition, we will ask them for their input on our current progress and offer ours as well via email. If necessary, we will consult whether or not it would be easier to meet online via Skype or another video conferencing interface. 

If you need an answer to a question and someone does not respond, what assumptions can you make?
> I assume whatever is consistent with team goals and client needs, as well as the guidelines set by the instructor of this course. Worst case scenario, I will wait for another time to prompt the question, preferably in-person.

At what point should team members give a heads-up if they are not going to meet a deadline? 
> As soon as possible is preferred, however try to aim for 24 hours in advance. Best case scenario, 48 hours in advance.

If something happens and the group needs to revert code changes, what will you do? 
> Each group member will have his own branch on GitHub for version control. A master branch will be used for stable code. If anything happens in one person's branch, it will not affect the master branch code. 

How will team members notify other group members if he will be late to meetings or will not be able to attend all together?
> It is expected for a group member to give a heads-up about their absence as soon as possible, preferably 24 hours in advance. The group member will notify other team members via text or email. 

If you reach a point where you and the group members cannot make an important decision, what will you do to move forward?
> We do not expect to ever reach this point with this group, but if the need arises, we will consult the client and the instructor for input. 

### Coding Practices
Each function and method in JavaScript will be documented using JSDoc. We will consider JavaScript testing frameworks, such as Jest, to test the code before pushing it to the master branch. This testing will be done under /test. We will consider JavaScript linting service to ensure that our code is up-to-date with current styling conventions. Each person will have his own branch on GitHub so that checking in and out files will not be an issue. Before merging with master branch, it is preferred that a Pull Request is submitted, but for small changes such as CSS changes, an automatic merge will suffice. 

## Journal of Meetings
All meetings are documented under [docs/meetings-notes](docs/meeting-notes) on GitHub page.

## Related Links
[Link](http://production.2hhw2cxiwt.us-east-2.elasticbeanstalk.com)

# Requirements Deliverables

## Project Concept

### Summary
A page will be created for Influencers to login to shoperherlook, load their profile, accept the Terms and Conditions, and continue to a page where they are prompted with the option to upload their fashion content. The goal is for the Influencers to appeal to shoppers with similar body dimensions by providing the brand and link to the clothing via a post on the shopherlook website. The program is designed to work on both mobile and desktop browsers, which means it will be a web app. 

### Tweet
>#shopherlook is all about body positivity and is centered around you, your body, and your fashion interests!

## User Stories
All user stories documented under [deliverables/user-stories](deliverables/user-stories). 

## Personas
All personas documented under [deliverables/personas](deliverables/personas).

## Platform Analysis and Selection

### Platform Selection
Possible server-side development
* [Express](https://expressjs.com/)

Possible database management
* [MongoDB Atlas](https://www.mongodb.com/what-is-mongodb)
* [Mongoose (ODM)](https://mongoosejs.com/)

Possible JavaScript templating engines
* [EJS](https://github.com/mde/ejs)
* [Mustache](https://github.com/janl/mustache.js/)
* [Handlebars](https://handlebarsjs.com/)

Possible front-side development (optional)
* [React](https://reactjs.org/)
* [Ember](https://www.emberjs.com/)
* [Vue](https://vuejs.org/)

Discussion with Duke team to discuss platform choice to keep it consistent across the board, particularly the database management component. More analysis will be posted later as update is given from Duke team. 

Update #1: our team is leaning towards using Express for the server-side development, MongoDB Atlas with Mongoose ODM (as well as the Duke team to keep consistency in database), and EJS/React for the front-end development. 

Update #2: our team will be using Express for server-side development, MongoDB Atlas for the database, possibly Mongoose (ODM), and EJS for the view. For hosting, the client has decided that AWS will be used.

Update #3: our team will be using Express for server-side development, MongoDB Atlas for the database, possibly Mongoose (ODM), and EJS for the view. For hosting, the client has decided that AWS will be used. For AWS, we are using Elastic Beanstalk to render the pages on the web. The EC2 service on AWS will be used to connect with MongoDB Atlas for database management. The S3 service will be used to upload pictures that the users upload on shopherlook. 

### Server Selection
Possible server options
* [AWS](https://aws.amazon.com)
* [Digital Ocean](https://www.digitalocean.com/)
* [Heroku](https://www.heroku.com/)

AWS will be used to host and run the code and databse. AWS credentials will be sent to each individual team member. The following AWS services will be used:
* EC2 - Run MongoDB Atlas
* ElasticBeanstalk - Run Express server and render views
* S3 - Host images that users upload

### Development Environment
Visual Studio Code

Our team will be using Express for server-side development, MongoDB Atlas for the database, possibly Mongoose (ODM), and EJS for the view. For hosting, the client has decided that AWS will be used. For AWS, we are using Elastic Beanstalk to render the pages on the web. The EC2 service on AWS will be used to connect with MongoDB Atlas for database management. The S3 service will be used to upload pictures that the users upload on shopherlook. 

## Prototype
[Prototype](https://drive.google.com/file/d/1Yt6UFAvHgwCzlnjb5xTHu6BkIHmLdmth/view?usp=sharing)  

# Sprint Deliverables

## Functional Specification
Functional specification documented under [deliverables/functional-spec](deliverables/functional-spec).

## Design Doc
Design documented under [deliverables/design-doc](deliverables/design-doc).

## User Manual
User manual documented under [deliverables/user-manual](deliverables/user-manual).

## Administrator Manual
Administrator manual documented under [deliverables/administrative-manual](deliverables/administrative-manual).

## Test Plan
Test plan documented under [deliverables/test-plan](deliverables/test-plan).

## Version-Controlled Repository
[GitHub](https://github.com/naeimzarei/fashionxproject)

## Deployed Application
[ShopHerLook-sell.app](https://shopherlook-sell.app/)

If for some reason, your browser has issues loading up the DNS records, the direct AWS server URL is [http://production.2hhw2cxiwt.us-east-2.elasticbeanstalk.com/](http://production.2hhw2cxiwt.us-east-2.elasticbeanstalk.com/)

## Video of Working System
[YouTube Link](https://www.youtube.com/watch?v=ercHKUuABR8)

## Executable Code

### Installation
``` bash
cd /fashionxproject
npm install 
```

Install any other dependencies that the terminal requires that you install. Only required dependencies need to be installed, not optional ones. 

### Running
``` bash
npm run start
```

Open browser to the port and host indicated.

### Testing
``` bash
npm run test-unit
```

This will run JavaScript unit testing. It also outputs coverage details. Ensure that the server is running prior to executing the unit tests (npm run start).

``` bash
npm install -g nightwatch
```

This will install Nightwatch globally on your machine. This is an important step, but it must only be done once. 

```bash
nightwatch --env chrome,firefox
```

Go to the root directory and run this command to commence functional testing in parallel. You must have both Firefox and Chrome installed. Make sure to type that command exactly as written above or it will not work properly. 

### AWS
```bash
pip install awsebcli --upgrade --user
```
This command installs the Elastic Beanstalk CLI tools.

```bash
eb init
```

Initialize elastic beanstalk in the directory. Must be done on all new computers.

```bash
git add *
git commit -m "Your commit message"
git push 
```
You must first push your code changes to the branch.

```javascript
var config = {};

config.DATABASE_USERNAME = '';
config.DATABASE_PASSWORD = '';

config.SESSION_SECRET = '...';

module.exports = config;
```

In order to run the application properly, one must create a folder called ```config``` under the ```app``` folder and it must contain a file called ```config.js``` within the directory. A sample ```config.js``` file is in the root directory of this web app for reference. If this part is skipped, MongoDB authentication issues will occur. Therefore, the above two variables must be defined.

```javascript
config.DATABASE_USERNAME = <mongodb-atlas-user>
```

This is the user who is accessing the MongoDB Atlas credentials. A user is not the same as username of the MongoDB Atlas dashboard. It is the authorized user of MongoDB Atlas. Users can be defined within the MongoDB Atlas dashboard. 

```javascript
config.DATABASE_PASSWORD = 'mongodb-atlas-user-password';
```

This is the password of the particular user of the MongoDB Atlas database. The password is in SHA256 format to prevent reverse engineering.

```javascript
config.SESSION_SECRET = '...';
```

```bash
echo -n <password> | openssl sha256
```

Use this CLI command to produce the SHA256 of any string of text using the UNIX terminal. Save this string of text in ```config.js```.

```javascript
config.BUCKET_NAME = 'fashionx-influencer-photos';
```

The above code is the S3 bucket name for shopherlook.

```javascript
config.REGION ='us-east-2';
```

The above code is the S3 region.

```javascript
config.ACCESS_KEY_ID = '...';
```

This is access key id for S3. You will need to configure it by yourself. 

```javascript
config.SECRET_ACCESS_KEY = '...';
```

The above code is the secret access key for S3. You will need to configure it by yourself. 

```javascript
config.EMAIL = '...';
config.PASSWORD = '...';
```

The two above fields are the credentials for the ShopHerLook email account that will be used for sending confirmation emails to newly applied influencers, and the client themselves as a notification that someone new applied.

```bash
eb deploy production
```

Deploy changes to 'production' environment on Elastic Beanstalk


```bash
eb open production
```

Opens the 'production' environment on the browser.


### Administration

```bash
node app/util/create_admin.js --email <email> --password <password>
```

Creates a new administrator with a valid email and password. 

```bash
node app/util/remove_admin.js --email <email>
```

Removes an administrator with the provided email.