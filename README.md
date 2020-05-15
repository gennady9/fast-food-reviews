
# Assignment 3 - Full Stack Project
## "Fast food reviews"

Submission by group #95282
- Guy & Gennady

[Assignment specification](https://www.cs.bgu.ac.il/~majeek/atd/201/assignments/3/)

## Preview
![search](https://i.imgur.com/2NUsckx.jpg)
![profile](https://i.imgur.com/C4SzGeL.jpg)

## Implemented model using mongoose:
![model](https://i.imgur.com/Olb3q3Z.png)

## The design
### src/client -- the frontend
client components:
  - login // handling login page
  - register // handling register page
  - profile // handling user profile
  - profiles // handling users tab
  - restaurants // handling restaurants tab
  - review-widget // handling reviews
### src/server -- the backend
  - api folder // contains restaurants and user related api requests
  - modal // contains mongoDB schemas, as shown above
  - server.js // handling server initialization

## Flow example
![flow](https://i.imgur.com/2X47Vyd.png)




# To start the server:
1. start mongodb using mongod
2. node src/server/server.js # run backend
3. npm run dev # run frontend


This project is based on [this](https://github.com/wix-incubator/flickr-gallery-exam) code as boilerplate.
