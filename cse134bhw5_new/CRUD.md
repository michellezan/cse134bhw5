Analysis:
login page: 1.0MB rescourses, 425kB transferred. Finish 1.12s. DOMContentloded 1.15s.
crud page: 1.1MB recources, 505kB transferred. Finish 32.59s. DOMContentLoaded 783ms. Loaded:1.15s

pro:
Database used firebase, firestore so every document can have dynamic fields. Firebase offers some easy to use API for retriving, updating and deleting data. It can control user access to the database by defining our customer rules in the firebase console.

In my approach, letting firebase to generate post id for me dynamically, so I don't need to spend time resolving conflict issues in post id. 

I am using optimistic update such that when a post is saved in firestore, I push a copy of post into the local posts array, so I don't need to fetch all the posts each time a post gets created or updated. Same for the update and delete. 

In update, I am only updating the fields that are changed rather than setting the entire field list. 

cons:

Firebase and firestore is not a structured database. In my case, I am experience some lagging issues between fetching, updating and deleting records. 

Because of the way I am doing post creation, deletion and update, if multiple users edit the same collection at the same time, it might result in inconsistency between data stored in database and the one stored locally up to the point when one refreshes the page. 



Login Credentials:
Email:
michellezan@gmail.com
Password:
michellezan

