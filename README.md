How to set up:
Download MySQl latest version mysql-installer-community 8.0.29
Download Android-studio-2021.2.1.15-windows
https://reactnative.dev/docs/environment-setup ( here also android set up is provided)
Download vidualstudio code 

How to run the application:
open android studio
connect your device to android studio.
open mysql database. Create connection 
Open vidualstudio code
open the folder in vidual studio
makes ure the dependednts are downloaded using node.
open terminal in visual studio
cd SERVER folder ( C:\ImliGit\imli\server>) ImliGit is created through git )
run command 'node server.js' make sure the below code in INDEX.JS file in models dirrectory
for first run: This will create/alter the tables defined in the model
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log(' re-sync done')
  })

for subsquent runs: force: false should be good.
db.sequelize.sync({ force: false })
  .then(() => {
    console.log(' re-sync done')
  })

open another terminal.
  npx react-native start
open another terminal.
npx react-native run-android 

Application comes up. signup and continue
activities: 
     Add friends
     Add occasions ( without occasion/friend gifts can not be sent)
     Add your favourites from categories
     Send Gifts 
     
