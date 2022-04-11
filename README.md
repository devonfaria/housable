# Housable

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Link to deployed application](https://hidden-earth-95543.herokuapp.com/)

We are a dedicated company that helps you find a trustworthy person to watch your house while you are away. We've all had the problems where we're on vacation or we need somebody to watch your house, and we just can't find anybody trustworthy to watch your house for you. We made a way which makes it easy to find trustworthy people to watch your house while you're away.

Our database keeps track of listings and their associated user, tasks, plants, pets, and the dates when the home needs sitting. We protect our users by making site visitors create an account before viewing the listing details.  

![website screenshot](./public/images/)


Table of contents
=================

   * [Links](#links)
   * [User Story](#user-story)
   * [Demo](#demo)
   * [Installation Guidelines](#installation-guidelines)
   * [Technologies](#technologies)
   * [Libraries](libraries)
   * [Authors](#authors)
   * [License](#license)
    

Links
=================   

[link to deployed Heroku website](#)

[link to GitHub repository](https://github.com/devonfaria/housable)



User Story
=================

1. As someone with pets and/or plants, I want to be able to travel while having someone take care of my house, plants, and/or animals. I want to be able to receive applications from local users interested in taking care of my house/pets/animals.

2. As someone who is looking to obtain part time work, I want to be able to find jobs for house sitting, plant sitting, and/or plant sitting. I want to be able to find jobs close to me. 


Demo
=================

tbd-- video of website goes here


Installation Guidelines
=================

To enjoy this application, you will need to install Node JS on your local computer. [Click here for links to download Node JS.](https://nodejs.org/en/download/)

Then, clone this repository to your local computer, and open up the folder in your coding software (i.e. Visual Studio Code). Once open, open up your Terminal (on Mac OS) or GitBash (on Windows OS). You will have to direct yourself to the cloned repository, and then run this command in the terminal: 

`npm install`

This will download the node modules MySQL2, Express, Nodemon, Sequelize, and DOTENV that this application needs to run on your local computer. After install, you will run the following command to open a MySQL shell in your terminal: 

`mysql -u root` 

Then you will install the schema.sql file so MySQL can format your database. The semi-colon is necessary.

`SOURCE db/schema.sql;`

You can exit the shell by entering:

`exit`

If you would like to use dummy information on deployment, run:

`npm run seed`

To initiate the server, run:

`nodemon`

If the last message in the terminal says "App listening on port (#)!", then you have installed the program correctly. If you ever need to shut down this server application use this command:

`^C`

[Click here for a video explaining installation and testing of the application](https://drive.google.com/file/d/18LL3mpnkWB_sBItLjntgRZ4OAQmvft6M/view?usp=sharing)

Technologies
=================

* Node JS
* MySQL2
* Sequelize
* Express
* Express Handlebars
* BCrypt
* Dotenv


Libraries
================= 
1. [Skeleton](http://getskeleton.com/)


Authors
=================

 - [Jack Norris](https://github.com/jacksonnorris)
 - [Guru Darji](https://github.com/Guru-Darji)
 - [Rocio Galvan](https://www.linkedin.com/in/rocio-galvan/)
 - [Devon Faria](https://github.com/devonfaria)

 License
=================

[MIT](./LICENSE)