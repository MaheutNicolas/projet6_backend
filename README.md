# Library Project Openclassroom

#### Run server :

`node app.js`

ou 

`npm run start`


#### .env :

Create a .env file at the root of the project and define the following variables :

 - MONGO_URI 
    MongoDB connection string.
    You can get one from MongoDB Atlas: https://cloud.mongodb.com
 - JWT_SECRET
    Secret key used to sign JSON Web Tokens.
    Use a long, random, and secure string.
 - BCRYPT_SALT
    Salt value used for hashing passwords with bcrypt.

#### Project Start :

`npm install`
