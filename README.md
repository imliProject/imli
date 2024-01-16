### How to set up:
-  Download MySQl latest version mysql-installer-community 8.0.29
     1. Download Android-studio-2021.2.1.15-windows <br>
               OR
     2. https://reactnative.dev/docs/environment-setup ( here also android set up is provided)
-  Download vidualstudio code 

### How to run the application:
-  Open android studio
-  Connect your device to android studio.
-  Open mysql database. Create connection 
-  Open vidualstudio code
-  Open the folder in vidual studio _(makes sure the dependednts are downloaded using node)_.
-  Open terminal in visual studio
>  cd SERVER folder (C:\ImliGit\imli\server>) ImliGit is created through git )
run command 'node server.js' make sure the below code in INDEX.JS file in models dirrectory

-  For first run: This will create/alter the tables defined in the model <br>

> db.sequelize.sync({ alter: true }).then(() => {
>
> console.log('re-sync done')
>
> })


-  For subsquent runs: force: false should be good.

>  db.sequelize.sync({ force: false }).then(() => {
>
> console.log(' re-sync done')
>
> });

-  Open another terminal.
>  npx react-native start

-  Open another terminal.
>  npx react-native run-android 

Application comes up. Signup and Continue... <br>
> *Activities:* <br>
>
> *1.  Add friends* <br>
>
> *2.  Add occasions ( without occasion/friend gifts can not be sent )* <br>
>
> *3.  Add your favourites from categories* <br>
>
> *4.  Send Gifts*
     
