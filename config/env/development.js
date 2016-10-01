
/**
 * Expose
 */

 module.exports = {
   db: 'mongodb://localhost/teamAce',
   token: "ub3xoKYYnv5007VCzJV_HA",
   mongo: {
     uri: "mongodb://localhost:27017/teamAce"
   },
   rsmq: {
     IP: "127.0.0.1",
     port: 6379,
     ns: "rsmq",
     q1name: "trade",
     q2name: "db"
   },
   facebook: {
     clientID: 'APP_ID',
     clientSecret: 'SECRET',
     callbackURL: 'http://localhost:3000/auth/facebook/callback',
     scope: [
       'email',
       'user_about_me',
       'user_friends'
     ]
   },
   google: {
     clientID: 'APP_ID',
     clientSecret: 'SECRET',
     callbackURL: 'http://localhost:3000/auth/google/callback',
     scope: [
       'https://www.googleapis.com/auth/userinfo.profile',
       'https://www.googleapis.com/auth/userinfo.email',
       'https://www.google.com/m8/feeds',
     ]
   }
 };
