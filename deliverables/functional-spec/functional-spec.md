# Functional Specification

## User Types
1. Shopper: shoppers are the fundamental user. They can only sign in to the shopper interface. The shopper interface is being designed by a team at Duke University.
2. Influencer: influencers are shoppers that have the ability to post content. Influencers can log in to the shopper interface but shoppers cannot login to the influencer interface. 
3. Administrator: administrators are users who can approve/deny applicants.

## Access Rights
1. Shopper: 
    * Login on Shopper page
    * View posts by other influencers
    * Account flag: shopper
2. Influencer
    * Login to Influencer page
    * View their own posts 
    * Delete or modify their posts 
    * Account flag: influencer (0 = unverified influencer, 1 = verified influencer) 
3. Administrator
    * Access to administrative panel 
    * Ability to approve or reject influencer privilege 
    * Flag: administrator (2)

## General Requirements 
1. Header
    * Header for shopherlook should be present on all influencer pages.
    * Required Fields: total clicks, four buttons (home, profile, submit, shop).
    * Note: these fields will not be present on the home page of shopherlook. 
2. Footer
    * Footer for shopherlook should be present on all influencer pages. 
    * All of the following must be present in all pages except the home page: About Us, Sign Up to Newsletter, Privacy Policy, Terms of Service, Cookie Policy
3. Error pages
    * Making these error messages user friendly
    * Pages for each of these errors under /app/views/errors
4. MongoDB Atlas integration
    * Set up credentials for MongoDB Atlas 
    * Create collections
    * Possibly use Mongoose (ODM) and create schemas under /app/models
5. Sign Up
    * The sign up applies to both influencers and moderators. Logic will be implemented to manage both influencers and moderators. 
    * Controller: the bcrypt module will be used to save the username and password of the user on the database, along with all other required and non-required fields. Controller 2, unlike controller 1, will populate the database while controller while checks for data integrity. Updates the database with requests from people to become moderators as well. Administrators must later approve that person moderator access before he or she can approve, edit, or reject posts. The moderator can still sign in the adminstrator panel but cannot view influencer posts that need to be approved until their account has been granted access.
6. Authentication
    * Create a controller file called auth.js for authenticating the user under app/controllers
    * Use the bcrypt module to hash the passwords stored in the database. If the user's password converted to that hash matches the password hash in the database, then the user has been successfully authenticated. 
    * Passport.js is used for authenticating the user via email and password serialization.
    * Express cookies are used for persisting user credentials when the user clicks the 'Keep Me Logged In' checkbox. The keep me logged in feature is not available for administrators. They are only logged in during the course of their browser session. 
7. Device Detection
    * Must detect what device a user is using: mobile or desktop. If mobile, must ensure that dimensions of page are proper. If desktop, must ensure that the dimensions of the page span to that of the entire browser width and height. 
    * Can do this using BootStrap or plain CSS using the @media selector 

## Use Cases

### Influencer
1. Visit home page of shopherlook
    * Two buttons, one for Influencer page and the other for Shopper page
    * The influencer clicks on the Influencer page to be redirected to the login page for Influencers.
    * There is no error checking required here. One must ensure that only the button redirects to the page and that is it.
    * Route: ~/shopherlook/home
2. Click on the Influencer link
    * Same as #1 except must update the routing to ensure that the user is redirected to the sign up or login page for Influencers. Must redirect user to the following route. 
    * Route: ~shopherlook/influencer/login
3. Influencer sign up or login 
    * Two buttons centered on the page: Log In and Sign Up
    * Route 1: Log In button: routes to ~/shopherlook/influencer/login
    * Route 2: Sign Up button: routes to ~/shopherlook/influencer/signup
4. Influencer sign up page 
    * When the user has correctly filled the fields and checked the box, he or she clicks the Sign Up button. The Sign Up button sends a request to the server for validating the information. If the information is accepted, the Influencer has succesfully created a profile. If not, an error message will be presented.  
    * If more fields are required over time, they would not harm the structure of the database. The database will be fluid and accomodate extra fields being added over time. If previous users did not fill the newly required fields, then the the functionality of their account will not be compromised. Only new users signing up will be required to fill in those information. 
    * API fields: First Name, Email, Password, Date of Birth, Instagram handle, Liketoknowit profile URL, blog, zipcode, paypal account, height (ft), height (in), bust (cup), bust (band), natural waist, usual shirt size, usual jean size, usual torso length, usual leg length
    * Controllers: a validation controller to check the types and valid input for each field. This is done in ```app/controllers/signup-controller.js```. In that validation controller, a signup function is implemented that will save the user's information to the database and mark the user as an 'unverified influencer' until they are either approved or rejected by an administrator. The user is redirected to a page letting them know that their application has been submitted and they will receive an email from an administrator later on after they submit their application. 
    * Route: ~/shopherlook/influencer/signup
5. Influencer login page 
    * API fields: Email, Password
    * The influencer must input his or her email and password to be validated on the server. 
    * Controller 1: the authentication controller is documented as a general requirement above, which is done in ```app/controllers/authenticate-controller.js``` . Caching of email and password is also done in this file. 
    * Route: ~/shopherlook/influencer/login
6. Influencer home page 
    * The influencer is presented with a page with all of his or her posts links to where he or she can post items for sale. If there are no posts, mentions 'No posts created yet.' on the page. 
    * API fields: type, item, size, brand, selling price, original price, condition, description, date, email, image url
    * S3: load all images for each respective post that the influencer has made 
    * Controller: used to populate the posts under the Influencer page. It must check that the post exists and if it does not have all necessary API fields, then it must not be populated at all. This controller is implemented in ```app/controllers/post-controlller.js```
    * Route: ~/shopherlook/influencer/home
7. Influencer profile page 
    * In this page the infleuncer has the option to edit his or her profile information, such as body dimensions, full name, and email. 
    * The influencer is given the option to save the edits to his or her profile using the Save Changes button. A logout button is also present as well so the user can logout at any time. 
    * API fields: same as when signing up to be an Influencer. However, if new fields are required, then the influencer cannot save his or her profile without filling out the new required fields. 
    * Controller: must check that each required field is filled out properly when editing the profile information. If it is not, present a dialogue with an error stating which part needs to be corrected. This controller is implemented in ```app/controllers/profile-controller.js```
    * Route: ~/shopherlook/influencer/profile
8. Influencer submit picture page
    * The user must click the Upload Pic button which will present an interface to the user with the ability to crop the picture to the required dimensions. Similar to Instagram. We are using ```cropper.js``` to edit the photos from the frontend. There is no necessary sever-side image checking as S3 takes care of the authentication behind uploading photos. 
    * Required picture extensions: .png, .jpeg, gif, ...
    * Controller: a crop picture controller will be needed to ensure that the user crops the picture to the required dimensions. If not, present an error describing what needs to be fixed. The interface should already force a dimension when the picture is being uploaded. As a result, no server-side image checking is necessary. Only files that are images are accepted otherwise the desired upload file will be rejected. 
    * Route: ~/shopherlook/influencer/submit
9. Influencer upload picture camera roll
    * Same process as #8 except #9 is an interface on top of the submit picture page once the user clicks the Submit Pic button. The influencer submit picture page and influencer upload picture camera roll are on the same page.
    * Controller: When user clicks Submit Pic button, this interface pops up a file browser that allows the user to select a photo from his or her device (mobile or desktop). 
    * Route: ~/shopherlook/influencer/submit
10. Influencer shop page (Duke team)
    * When the influencer clicks the shop button they are redirected to the shopping experience, which is currently being implemented by the Duke team. 
    * API fields: same as those documented above in influencer home page. 
    * Controller 1: must check that each field is populated correctly. If a field does not exist, then either do not show the post or show the post but omit the field. Depending on situation, may decide to not show post at all or show with some fields omitted. 
    * Route: TBD
11. Influencer about us page 
    * When the influencer clicks the 'About Us' button, they are redirected to the about us page that the owners of shopherlook have created. This website is outside the scope of our project, but we had to link it anyways since the button that redirects to that page was requested from the client. 
    * Route: ~/shopherlook.app/about-us
12. Influencer contact page
    * When the influencer clicks the 'Contact' button, they are redirected to the contact page that the owners of shoperlook have created. This website is outside the scope of our project, but we had to link it anyways since the button that redirects to that page was requested from the client. 
    * Route: ~/shopherlook.app/contact
13. Influencer manual page 
    * When the influencer clicks the 'FAQ' button under the profile dropdown button, they are redirected to the manual page explaining how to use the interface for their needs. 
    * Route: ~/shopherlook/influencers/manual 

### Administrators
Done via the Administrative Panel, administrators can approve or reject who has applied to be an influencer. An email is sent to the owners as well as the one who has requested to be an influencer depending on whether the administrator has clicked the 'approve' or 'reject' button on the Administrative Panel. There is no way to grant administrative privilege to someone from the frontend. Granting administrative privilege is done under two utility functions in ```app/util/create_admin.js``` and ```app/util/create_admin.js```. These files will not work unless a configuration file is properly populated under ```app/config/config.js```, so security is not an issue. Administrators mark which influencers are approved and which ones are rejected by clicking the respective 'Approve' or 'Reject' buttons in the Administrative Panel. 

1. Administrator login page
    * Same as the influencer login page, requiring an email and a password.
    * API fields: email, password 
    * Route: ~/shopherlook/administrators/login
2. Administrator panel page 
    * A page that allows the administrator to approve or reject influencers.
    * Controller: the rights controller takes care of changing the rights of influencers from unverified influencer to that of verified influencer or vice versa: ```app/controllers/rights-controller.js```. It also sends an email to the user who applied to be an influencer letting them know they have been approved or rejected. 
    * A search functionality allows the administrators to search via first name or email to find a particular user more quickly. 
    * API fields: First Name, Email, Status ('Verified Influencer' or 'Unverified influencer')
    * Route: ~/shopherlook/administrators/panel
3. Administrator manual page 
    * A page that helps administrators use the administrative panel interface
    * Route: ~/shopherlook/administrators/admin-manual.

## Requirements by Priority 
1. Landing Page -- Sprint 1
    1. Influencer Sign Up
    2. Shopper Login placeholder
2. Influencer Page
    1. Profile -- Sprint 1 & 2
        1. Registration - terms of service, general info, measurements
        2. Main feed/dashboard
    2. Submit picture -- Sprint 3
        1. Upload and crop pictures
        2. Brand, size, and link to product
    3. Login Page -- Sprint 2
3. Moderator/adminstrator -- Sprint 4
    1. Approve/Reject posts to appear in shopper feed
    2. Edit feed
    3. Manage users
