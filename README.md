# TweetIndia
Site to Tweet quickly to various Indian Ministries official handle (Requires Twitter Sign-in)

###Abstract
This website (Responsive but targeted audience mobile users) acts as a twitter wrapper for communicating with various Indian Ministries twitter handles.

###Problem:
There are 50+ Ministries under Indian Government. Most of them have Twitter accounts. 

Citizens wants to Thank / Complain / Suggest to a particular Ministry face below difficulties:

Searching a particular ministries / subdivisions / Central ministers official handle.

Copy / Paste the handles in a tweet.

How to convey using officials using a tweet (Format of tweet)

It takes lot of time to do above steps and difficult to carry out these steps in a mobile.
###Solution:
Tweet India site

User can do the following:

User logs-in (using Twitter API)
###User Input:
Select Ministry

Select Subdivision (eg. Ministry of Railway has 15+ zones. There are 40+ twitter handles created for these zones GM/DRMs)

Select tweet Type (Thank-you / Complaint / Suggestion)
###Output:
A text area gets pre-filled with Selected Subdivision/Ministry official handle with selected tweet type and also including concerned Central Minister twitter handle.

User edit the pre-filled area as required.

User can also capture picture from mobile camera / select an existing picture.

User clicks Tweet button, The content in text area gets posted using Twitter API.
###Tech Stack:
* Node.js
* Express
* Gulp
* typeahead.js
* bootstrap
* spinner
###How image uploads handled
'Multer' npm package to upload the New / existing images and save it in public/uploads folder.

'fs' npm package to delete the uploaded file ones it is sent to twitter. Else it uploaded images will pile up and eat more space in server end.
###List of Twitter APIs used
1. POST oauth/request_token 
   Send request_token to sign-in screen and flow returns to callback url
2. POST oauth/access_token 
   Get access_token and pass it along subsequent calls
3. POST media/upload 
   Used to upload picture to twitter. Returns media_string_id valid which in-turn sent to Twitter update API.
4. POST statuses/update
   Creates a twitter post. Pass media_string_id from step 3 to post a tweet with media.

###Perf Impovements:
* All contents JS/CSS/html responses are compressed using gzip. (express configuration)
* For Assets max-age given as 24hrs. So once downloaded further calls will be used from cache. (express configuration).
* Custom JS/CSS minified (done with gulp)
* Merged Common.js and spin.min.js that saves an additional call also the merged and compressed js file weighs just less than 10kb.

###TODO / Could have been done:
* Have to populate handles for other ministries
* Remove the external typeahead.js and to replace with plain js. Could save the call for downloading typeahead.bundle.min.js weighs around 40kb.
* Remove JQuery and replace with plain JS. Could save downloading 84kb jquery.min.js.

Though the above 2 points are not a big perf constraints for 3G. But the goal is to make this work even better in 2G connections.
