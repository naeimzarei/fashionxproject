# Functional Specification

## Use Cases

### Influencer
1. Visit home page of fashionxproject
    * View the home page with links to the Influencer login page.
2. Click on the Influencer link
    * Influencer link redirects to login page so that influencers can login and post content to fashionxproject. 
3. Influencer sign up or login 
    * Influencer can click on the sign up link to be redirected to the sign up page
    * Influencer can click on the login page to be redirected to the login page. 
4. Influencer sign up page 
    * Signing up requires the influencer to fill out an online form with basic information such as name, email, age, and body dimensions.
    * The influencer must agree to the Terms of Service mandated by fashionxproject.
    * A link to the Terms of Service page will be provided.
5. Influencer login page 
    * The influencer must input his or her email and password and click the login button to continue.
    * The influencer has the option to check the 'Keep me logged in' button so that the browser remembers the credentials for next time. 
6. Influencer home page 
    * The influencer is prsented with a page with all of his or her posts and a link to where to buy the item. 
    * In addition, the influencer is shown how many clicks each post has gotten as well as the overall total number of clicks.
    * At the top of the page, there are buttons to upload content as well as a link to edit one's profile.
    * At the bottom of the page, a link to the Terms of Service, Privacy Policy, Cookie Policy, and copyright information is listed.
    * Links to Instagram, Facebook, Pinterest, and email for fashionxproject are also displayed at the bottom of the page.
    * An About Us page link is presented as well as a newsletter sign up link. 
7. Influencer profile page 
    * In this page the infleuncer has the option to edit his or her profile information, such as body dimensions, full name, and email. 
    * The influencer is given the option to save the edits to his or her profile using the Save Changes button. 
    * A logout button is also present as well so the user can logout at any time. 
8. Influencer submit picture page
    * A page with an upload picture button is presented to the influencer on this page. 
    * The user uploads the picture, makes the necessary crops to the picture, inputs the size and link to the product, and clicks submit. 
    * When the user clicks submit, the post is sent to the moderator for approval. 
9. Influencer upload picture camera roll
    * A page is presented with the option for the user to crop out the uploaded picture. This occurs as the user is uploading the content. 
    * Once the influencer has cropped out his or her picture to the required dimensions, then he or she has the option to upload the picture.
10. Influencer shop page 
    * On this page, the influencer has the option to shop by choosing his or her body dimensions. 
    * Various posts will appear indicating the body dimensions that the design will look best on. 
    * The influencer has the option to filter the posts as a function of body dimensions by clicking on the Category button. 
    * Links to the brands as well as a hashtag will be provided for each post so the influencer has the option to navigate to the page where he or she will be able to buy the product. 

### Shopper
1. Visit home page of fashionxproject
    * View the home page with links to the Shopper page 
2. The shopper button will be disabled since it is outside the scope of our project. Our project will focus on the influencer page as per the requirements established by the client. 

### Moderator
1. Moderator page
    * Able to view all posts that are "pending" and not yet approved
    * Able to change each post to be flagged as "published" to display live on the site
2. Manage influencers
    * Able to edit/remove influencers at any point

## Requirements

### Requirements by Priority 
1. 

### Access Rights
1. Shopper: 
    * Login on Shopper page
    * View posts by other influencers
2. Influencer
    * Login to Influencer page
    * View their own posts 
    * Delete or modify their posts 
    * View posts by other influencers 
3. Moderator
    * Access to adminstrative panel
    * Ability to approve or reject posts made by influencers 
4. Owner
    * Access to administrative panel 
    * Ability to approve or reject posts made by influencers 
    * Ability to remove or add moderator access to accounts 

### General Requirements 
1. Header
    * Header for fashionxproject should be present on all pages, including home page.
    * Required Fields: total clicks, four buttons (home, profile, submit, shop.
    * Note: these fields will not be present on the home page of fashionxproject. 
2. Footer
    * All of the following must be present in all pages except the home page: About Us, Sign Up to Newsletter, Privacy Policy, Terms of Service, Cookie Policy
3. Error pages
    * Such as 403 or 500 errors
    * Pages for each of these errors 
4. MongoDB Atlas integration
    * Set up credentials for MongoDB Atlas 
    * Create collections
    * Possibly use Mongoose (ODM) and create schemas under /models
5. Authentication
    * Must create a controller for authenticating the user 
6. Device Detection
    * Must detect what device a user is using: mobile or desktop. If mobile, must ensure that dimensions of page are proper. If desktop, must ensure that the dimensions of the page span to that of the entire browser width and height. 
    * Can do this using BootStrap or plain CSS using the @media selector 
7. Administrative Panel
    * Must create a route with a controller that takes care of populating posts created by other Influencers. 
    * Fields created for each post and the moderator can approve or reject the posts present. 
    * If approved, keep the post in the database and allow the post to go through. 
    * If rejected, remove the post from the database and the Influencer's home page. 
    * Must check that user is indeed a moderator to access the Administrative Panel. If not, do not give access to the database. 
    * Route: ~/fashionxproject/admin

### Influencer
1. Visit home page of fashionxproject
    * Two buttons, one for Influencer page and the other for Shopper page
    * The influencer clicks on the Influencer page to be redirected to the login page for Influencers.
    * There is no error checking required here. One must ensure that only the button redirects to the page and that is it
    * The route for this page will be ~/fashionxproject/home
2. Click on the Influencer link
    * Same as #1 except must update the routing to ensure that the user is redirected to the sign up or login page for Influencers
    * Have to update the URL to ~fashionxproject/influencer/login
    * Must redirect influencer to provided route
3. Influencer sign up or login 
    * Two buttons centered on the page: Log In and Sign Up
    * Log In button: routes to ~/fashionxproject/influencer/login
    * Sign Up button: routes to ~/fashionxproject/influencer/signup
4. Influencer sign up page 
    * Required Fields: First Name, Email, Age, Instagram Handle, Height (ft, in), Weight (lbs), Bust (Cup), Bust (Band), Waist (in), Hips (in), Usual Jean Size, Usual T-shirt size, Leg length
    * Non-required fileds: Blog (link)
    * The required and non-required fields will change as the client deems fit over time. 
    * Must check for proper data types in the fields: for instance, a letter must not be inputted in the Waist field. Must check that user has filled all required information here as well. In addition, numbers should only be used for measurements. Measurements will be strictly of number type while other fields such as the Email field will be of type string. 
    * If more fields are required over time, they would not harm the structure of the database. The database will be fluid and accomodate extra fields being added over time. 
    * The user must check the Terms of Service fine print at the bottom before click the Sign Up button. Must ensure that the user checks this box. If user does not check box, a dialogue will pop up requiring the user to check the box. 
    * When the user has correctly filled the fields and checked the box, he or she clicks the Sign Up button. The Sign Up button sends a request to the server for validating the information. If the information is accepted, the Influencer has succesfully created a profile. If not, an error message will be presented. Controller files will be used to manage verification as well as request and or modify data within the database. 
5. Influencer login page 
    * Required Fields: Email, Password
    * The influencer must input his or her email and password to be validated on the server. 
    * If the user types the wrong password, present an error stating 'Incorrect password provided.' If the user types an incorrect email in the field, raise an error stating 'Incorrect email provided.' If the user types an email that does not exist in the database, raise an error that says 'Email does not exist.' 
    * Server validation: a controller file that hits the MongoDB Atlas API to ensure that the user exists. If user does not exist, present an error dialogue to the client. 
    * The Keep Me Logged In will use a proper caching mechanism to ensure that the user stays logged in the browser after a refresh or revisit to the page. This caching mechanism may or may not expire, which will discussed at a later time. 
    * This portion raised the need for an Authentication controller, which will be a general requirement listed above. 
6. Influencer home page 
    * API fields: total clicks, clicks for each picture, links to individual post pictures
    * API will be used to obtain these information and present them as posts on the Influencer home page, which is served under ~/fashionxproject/influencer/home
    * A controller file will be used to populate the posts under the Influencer page. It must check that the post exists and if it does not have all necessary API fields, then it must not be populated at all.
    * In summary, the controller for the influencer page hits the API, does the necessary validations, and populates the posts on the page. 
7. Influencer profile page 
    * In this page, the Influencer has the option to edit his or her profile details. 
    * Required Fields: same as when signing up to be an Influencer
    * Non-required fields: same as when signing up to be an Influencer
    * Must check that each required field is filled out properly when editing the profile information. If it is not, present a dialogue with an error stating which part needs to be corrected. A controller file for profile validation will be created.
    * This page will be served under ~/fashionxproject/influencer/profile
8. Influencer submit picture page
    * Ther user must click the Upload Pic button which will present an interface to the user with the ability to crop the picture to the required dimensions. Similar to Instagram.
    * A crop picture controller will be needed to ensure that the user crops the picture to the required dimensions. If not, present an error describing what needs to be fixed. The interface should already force a dimension when the picture is being uploaded, but the server must double check that the user has uploaded a proper picture with the required extension. If the extension is incorrect, reject the upload and present an error dialogue.
    * Once submitted, a post is created on the Administrative Panel for the moderator. The moderator must approve or reject the post. More on that in the section labeled Moderator below. 
    * Required picture extensions: .png, .jpeg, gif, ...
    * Route: ~/fashionxproject/influencer/submit
9. Influencer upload picture camera roll
    * Same thing as #8 except this is the interface on top of the submit picture page once the user clicks the Submit Pic button.
    * When user clicks Submit Pic button, this interface pops up a file browser that allows the user to select a photo from his or her device (mobile or desktop). 
    * This is where the validation comes in from #8. 
    * Route: same as #8
10. Influencer shop page 
    * Posts that other influencers have created will be generated on this page as a function of the Influencer's interests and body dimensions.
    * Filter controller: a filter controller will be required to hit the database to obtain posts relevant to what the Influencer requested
    * A Category dropdown will be present to allow the Influencer to choose a category of clothing. This is part of the filter controller implementation. 
    * Post fields: Height (ft, in), Weight (lb), Bust, Waist, Hips, Leg Length, Size
    * Must check that each field is populated correctly. If a field does not exist, then either do not show the post or show the post but omit the field. Depending on situation, may decide to not show post at all or show with some fields omitted. 
    * Route: ~/fashionxproject/influencer/shop

### Moderator
1. Moderator sign up or login 
    * Login:
        * Different from influencers for moderators and admins to log in
        * Route: to ~/fashionxproject/admin/login
    * Sign Up:
        * Moderators will not be able to sign-up on their own.
        * Accounts will be created by administrators 
        * API route for creating moderator and admin accounts: ~/fashionxproject/admin/signup
2. Moderator dashboard page
    * In this page, the moderator sees a list of posts that are not yet published. Moderators can click an "Approve" button or "Reject" button
        * Clicking "Approve" turns the post `published` flag to `1`. Reject turns the `published` flag to `2`. Default `published` flag is `0` indicating unpublished.
    * A controller file will be used to populate the unpublished posts under the Moderator page. 
        * API fields: Photo, influencer, product name
        * Also generate a link to the post page for moderators to click and view what the post would look like for users.
    * Route: ~/fashionxproject/admin/dashboard