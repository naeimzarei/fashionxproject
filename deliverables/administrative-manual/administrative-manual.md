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
config.EMAIL = '...';
config.PASSWORD = '...';
```

The two above fields are the credentials for the ShopHerLook email account that will be used for sending confirmation emails to newly applied influencers, and the client themselves as a notification that someone new applied.


```bash
eb deploy production
```

Deploy changes to 'production' environment on Elastic Beanstalk

```bash
eb deploy production-staging
```

Deploy changes to 'production-staging' environment on Elastic Beanstalk

```bash
eb open production
```

Opens the 'production' environment on the browser.

```bash
eb open production-staging
```

Opens the 'production-staging' environment on the browser.

### Administration

```bash
node app/util/create_admin.js --email <email> --password <password>
```

Creates a new administrator with a valid email and password. 

```bash
node app/util/remove_admin.js --email <email>
```

Removes an administrator with the provided email.