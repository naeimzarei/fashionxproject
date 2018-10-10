# Functional Specification

## User Types
1. Shopper: shoppers are the fundamental user. They can only sign in to the shopper interface. 
2. Influencer: influencers are shoppers that have the ability to post content. Influencers can log in to the shopper interface but shoppers cannot login to the influencer interface. 
3. Moderator: moderators are separate from shoppers and influencers. They have the ability to edit, approve, or reject influencer posts. Moderators cannot login to the shopper or influencer interfaces. 
4. Administrator: administrators are moderators with elevated privilege. They can grant or revoke moderator access to people.

## Access Rights
1. Shopper: 
    * Login on Shopper page
    * View posts by other influencers
    * Account flag: shopper
2. Influencer
    * Login to Influencer page
    * View their own posts 
    * Delete or modify their posts 
    * View posts by other influencers 
    * Account flag: influencer 
3. Moderator
    * Access to adminstrative panel
    * Ability to approve or reject posts made by influencers
    * Account Flag: moderator 
4. Administrator
    * Access to administrative panel 
    * Ability to approve or reject posts made by influencers 
    * Ability to remove or add moderator access to accounts 
    * Flag: administrator

## General Requirements 
1. Header
    * Header for fashionxproject should be present on all influencer pages.
    * Required Fields: total clicks, four buttons (home, profile, submit, shop).
    * Note: these fields will not be present on the home page of fashionxproject. 
2. Footer
    * Footer for fashionxproject should be present on all influencer pages. 
    * All of the following must be present in all pages except the home page: About Us, Sign Up to Newsletter, Privacy Policy, Terms of Service, Cookie Policy
3. Error pages
    * Such as 403 or 500 errors
    * Pages for each of these errors under /app/views/errors
    * Making these error messages user friendly
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
7. Device Detection
    * Must detect what device a user is using: mobile or desktop. If mobile, must ensure that dimensions of page are proper. If desktop, must ensure that the dimensions of the page span to that of the entire browser width and height. 
    * Can do this using BootStrap or plain CSS using the @media selector 
8. Caching
    * Must use server-side caching mechanism to check if user can remain signed on to the influencer login page. 
    * Controller: use Node's caching mechanism to check if user has previously authenticated to the influencer interface. The login credentials will expire after 30 days. 

## Use Cases

### Influencer
1. Visit home page of fashionxproject
    * Two buttons, one for Influencer page and the other for Shopper page
    * The influencer clicks on the Influencer page to be redirected to the login page for Influencers.
    * There is no error checking required here. One must ensure that only the button redirects to the page and that is it.
    * Route: ~/fashionxproject/home
2. Click on the Influencer link
    * Same as #1 except must update the routing to ensure that the user is redirected to the sign up or login page for Influencers. Must redirect user to the following route. 
    * Route: ~fashionxproject/influencer/login
3. Influencer sign up or login 
    * Two buttons centered on the page: Log In and Sign Up
    * Route 1: Log In button: routes to ~/fashionxproject/influencer/login
    * Route 2: Sign Up button: routes to ~/fashionxproject/influencer/signup
4. Influencer sign up page 
    * When the user has correctly filled the fields and checked the box, he or she clicks the Sign Up button. The Sign Up button sends a request to the server for validating the information. If the information is accepted, the Influencer has succesfully created a profile. If not, an error message will be presented.  
    * If more fields are required over time, they would not harm the structure of the database. The database will be fluid and accomodate extra fields being added over time. If previous users did not fill the newly required fields, then the the functionality of their account will not be compromised. Only new users signing up will be required to fill in those information. 
    * API fields (required): First Name, Email, Age, Instagram Handle, Height (ft, in), Weight (lbs), Bust (Cup), Bust (Band), Waist (in), Hips (in), Usual Jean Size, Usual T-shirt size, Leg length, password
    * API fields (not required): Blog (link) 
    * Controller 1: must check for proper data types in the fields: for instance, a letter must not be inputted in the Waist field. Must check that user has filled all required information here as well. In addition, numbers should only be used for measurements. Measurements will be strictly of number type while other fields such as the Email field will be of type string. The user must also check the Terms of Service fine print at the bottom before click the Sign Up button. Must ensure that the user checks this box. If user does not check box, a dialogue will pop up requiring the user to check the box. 
    * Controller 2: sign up controller as documented under general requirements above. 
    * Route: ~/fashionxproject/influencer/signup
5. Influencer login page 
    * API fields: Email, Password
    * The influencer must input his or her email and password to be validated on the server. 
    * Controller 1: the authentication controller is documented as a general requirement above. 
    * Controller 2: The Keep Me Logged In will use a proper caching mechanism to ensure that the user stays logged in the browser after a refresh or revisit to the page. The caching controller is a general requirement listed above. 
    * Route: ~/fashionxproject/influencer/login
6. Influencer home page 
    * The influencer is presented with a page with all of his or her posts and a link to where to buy the item. The influencer is shown how many clicks each post has gotten as well as the overall total number of clicks.
    * API fields: total clicks, clicks for each picture, links to individual post pictures
    * Controller: used to populate the posts under the Influencer page. It must check that the post exists and if it does not have all necessary API fields, then it must not be populated at all.
    * Route: ~/fashionxproject/influencer/home
7. Influencer profile page 
    * In this page the infleuncer has the option to edit his or her profile information, such as body dimensions, full name, and email. 
    * The influencer is given the option to save the edits to his or her profile using the Save Changes button. A logout button is also present as well so the user can logout at any time. 
    * API fields (required): same as when signing up to be an Influencer. However, if new fields are required, then the influencer cannot save his or her profile without filling out the new required fields. 
    * API fields (not required): same as when signing up to be an Influencer. 
    * Controller: must check that each required field is filled out properly when editing the profile information. If it is not, present a dialogue with an error stating which part needs to be corrected
    * Route: ~/fashionxproject/influencer/profile
8. Influencer submit picture page
    * The user must click the Upload Pic button which will present an interface to the user with the ability to crop the picture to the required dimensions. Similar to Instagram.
    * Once submitted, a post is created on the Administrative Panel for the moderator. These posts are populated on the moderator page each time the moderator refreshes the page. The moderator must approve or reject the post. More on that in the section labeled Moderator below. 
    * Required picture extensions: .png, .jpeg, gif, ...
    * Controller: a crop picture controller will be needed to ensure that the user crops the picture to the required dimensions. If not, present an error describing what needs to be fixed. The interface should already force a dimension when the picture is being uploaded, but the server must double check that the user has uploaded a proper picture with the required extension. If the extension is incorrect, reject the upload and present an error dialogue.
    * Route: ~/fashionxproject/influencer/submit
9. Influencer upload picture camera roll
    * Same process as #8 except #9 is an interface on top of the submit picture page once the user clicks the Submit Pic button. The influencer submit picture page and influencer upload picture camera roll are on the same page.
    * Controller: When user clicks Submit Pic button, this interface pops up a file browser that allows the user to select a photo from his or her device (mobile or desktop). 
    * Route: ~/fashionxproject/influencer/submit
10. Influencer shop page 
    * As a reminder, influencers are shoppers but shoppers are not influencers. As a rseult, influencers will be redirected to shopper experience by clicking the shop button. The same credentials they used to login to the influencer login will be transferred so there will be no need to login again. 
    * Influencer can click button in header to return back to the influencer experience
    * API fields: Height (ft, in), Weight (lb), Bust, Waist, Hips, Leg Length, Size
    * Controller 1: must check that each field is populated correctly. If a field does not exist, then either do not show the post or show the post but omit the field. Depending on situation, may decide to not show post at all or show with some fields omitted. 
    * Controller 2: a filter controller will be required to hit the database to obtain posts relevant to what the Influencer requested.
    * Route: TBD

### Moderator
1. Moderator sign up or login 
    * Login:
        * Moderators will use their moderator credentials to login to the administrative panel. 
        * Controller: the authentication controller documented as a general requirement above 
        * Route: ~/fashionxproject/admin/login
    * Sign Up:
        * Accounts will be marked with a moderator flag by an administrator, not other moderators. Only administrators have the ability to give or remove moderator access to influencers. 
        * API fields: full name, age, date of birth, email
        * Controller 1: check that required fields are properly filled out. 
        * Controller 2: sign up controller as documented under general requirements above. 
        * Route: ~/fashionxproject/admin/signup
2. Moderator dashboard page
    * In this page, the moderator sees a list of posts that are not yet published. Moderators can click an "Approve" button or "Reject" button
    * API fields: Photo, influencer, product name
    * Controller 1: used to populate the unpublished posts under the Moderator page. 
    * Controller 2: clicking "Approve" turns the post `published` flag to `1`. Reject turns the `published` flag to `2`. Default `published` flag is `0` indicating unpublished. Updates the database with these changes. 
    * Controller 3: generate a link to the post page for moderators to click and view what the post would look like for users.
    * Route: ~/fashionxproject/admin/dashboard

### Administrator
1. Same as Moderator except on the Administrative Panel, administrators can give moderators access on the moderator dashboard page since they have an administartive flag on their account. 
2. Administrators are moderators with elevated privileges. While moderators can only edit, remove, or approve influencer posts, administrators have the ability to provide moderator rights. They also have any other rights that moderators have.
3. Controller 1: in the moderator dashboard page, administrators are presented with an extra tab that allows them to view moderators that have requested to be moderators. The administrator can approve or reject the person's request to be a moderator. If the person's request to be a moderator is rejected, they will be removed from the database completely. That means that their account will no longer exist to prevent overflowing of moderator requests. If a person was initially granted moderator access that got removed later, their account will remain on the database. 
4. Controller 2 (optional): for scalability purposes, their needs to be a search function to find moderators to approve or reject their access. The administrator will search for a particular moderator via email or full name. Everyone who has requested access to be a moderator will be populated on the extra tab for administrators. This is an optional controller because the frontend can do this as well without the need for a controller. 
5. Route: ~/fashionxproject/admin/dashboard/rights

## Requirements by Priority 
1. Landing Page --Sprint 1
    1. Influencer Sign Up
    2. Shopper Login placeholder
2. Influencer Page
    1. Profile -- Sprint 1 & 2
        1. Registration - terms of service, general info, measurements
        2. Main feed/dashboard
    2. Submit picture
        1. Upload and crop pictures
        2. Brand, size, and link to product
    3. Login Page --Sprint 2
3. Moderator/adminstrator
    1. Approve/Reject posts to appear in shopper feed
    2. Edit feed
    3. Manage users
4. Influencer Wallet (stretch goal)
    1. Influencer submission history
    2. Track number of clicks per submission
    3. Track how much they've earned from their content
    4. In submission history, display number of clicks and revenue next to each submission
