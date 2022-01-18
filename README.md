# RoadToHack

This project uses React, Node, MongoDB, Mapbox, Firebase Authencation, and Amazon S3

## App summary
The web platform allows people to host hackathons with different coding challenges. 

### Hacker Interface Functionalities
1. Management of hacker account
2. Register to a specfic hackathon from unique code and group
3. navigate a 3d city map to locate and solve challenges as a team
4. Challenges can be of the form:
    - input challenges that require the hackers to upload code file
    - Multiple choice questions
    - Multi select questions
5. See Group Members Progress
6. See Leaderboard


### Admin Interface Functionalities
1. Management of admin account
2. Create and manage hackathons by setting the following details among others:
    - start and end time of hackathon
    - challenges/ questions
    - map settings for hackathon
    - groupings
3. View solutions to hackathon challenges
4. allocate and adjust points if necessary




## Running the Project

To run the project on local server:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

For this to work properly, a config.env file would need to be added to the root folder with the following details:

NODE_ENV=developement\
PORT=5000\
DATABASE= <<MONGODB_ATLAS_URL>>\
DATABASE_PASSWORD= <<ATLAS_PASSWORD>>\
AWS_ID=<<AWS_S3_ID>>\
AWS_SECRET=<<AWS_SECRET>>\
AWS_BUCKET_NAME = <<AWS_S3_BUCKET_NAME>>\
  
  
  
The page will reload if you make edits.\
You will also see any lint errors in the console.



