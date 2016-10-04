[![Build Status](https://travis-ci.com/iamacewhite/codeIT.svg?token=BhaC4XUJyMxydLADHhj2&branch=master)](https://travis-ci.com/iamacewhite/codeIT)  [![codecov](https://codecov.io/gh/iamacewhite/codeIT/branch/master/graph/badge.svg?token=BpoZAx30lO)](https://codecov.io/gh/iamacewhite/codeIT)

## First Place in CodeIT Suisse 2016 Solution, built by team Ace.

This is a Master-slave node cluster running on one machine, IPC is through message queues. Strategy is simply high frequency arbitrage. The System requires at least 4 cores CPU and 8GB memory. To boost the performance, you could consider deploying it to multiple machines and run them concurrently. The frontend is on http://codeit-ace.herkuapp.com

### Important Notes:
* If you are a team who participates this event and wanna clone this project for a head start, make sure this is allowed by the host. We do not hold responsible for anything anyone do with this project.
* We won't be explaining in detail of our architecture and strategy here to avoid plagiarism.

### To start this project:
Only Ubuntu is tested that can run this project. Make sure redis-server, nodejs(>=6.0.0) and npm are installed. To run the complete features including Travis CI, Heroku and Codecov, make sure you change the traves.yml file. Due to the deprecation of APIs, the system is not able to do anything now. If you are using this for practical reasons, read through ```trade/``` and ```config/``` to change the way of requesting the API. This solution now does not have complete testing and redundancy, feel free to contribute

Install Dependency: ```npm install```

For own backend server to show frontend webpage: ```npm start```

For start trading with regular strategy: ```npm run trade```

For start trading with a tricky strategy (we do not guarantee it earns money, not recommended): ```npm run evil```

### Enquiry
For further inquiries, contact us via issues or Github email address.
