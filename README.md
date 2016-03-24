Selenium example
================

[![Build Status](https://travis-ci.org/leutloff/selenium-example.png?branch=master)](https://travis-ci.org/leutloff/selenium-example)
[![Dependencies](https://gemnasium.com/leutloff/selenium-example.png)](https://gemnasium.com/leutloff/selenium-example)


This project provides two complete simple examples written in JavaScript ([node.js](http://nodejs.org/)) 
using the Web Application Test Framework [Selenium](http://docs.seleniumhq.org/projects/webdriver/). 
A complete description is provided from the initial author [Nathan Oehlman](https://github.com/nathanoehlman) at 
[http://unexpectedliteral.com/2012/05/09/automated-functional-testing-with-javascript-using-mocha-and-selenium-part-2/](http://unexpectedliteral.com/2012/05/09/automated-functional-testing-with-javascript-using-mocha-and-selenium-part-2/).

The used test runner is [Mocha](http://visionmedia.github.io/mocha/). 
Two styles of result checking TDD and BDD are shown. Both styles are provided by the [Chai](http://chaijs.com/) Library. 


Install the prerequisites
========================

For locally running tests:

- Check that node.js and npm are installed, e.g. execute `node --version` and `npm --version`.
  If this is not the case install them, e.g.
        sudo apt-get install nodejs -y
        curl https://npmjs.org/install.sh > install-npm.sh && sudo sh install-npm.sh
- Install the chromedriver for your system, e.g. for Linux
        curl https://chromedriver.storage.googleapis.com/2.21/chromedriver_linux64.zip > chromedriver_linux64.zip 
        unzip chromedriver_linux64.zip 
        sudo mv chromedriver /usr/local/bin
        sudo chmod +rx /usr/local/bin/chromedriver
- Install Mocha globally:
        sudo npm install -g mocha
- To install the other Javascript related parts just execute 
        sudo npm install
- Then exceute
        make 
  or install and launch selenium server, e.g.
        curl -O https://selenium-release.storage.googleapis.com/2.50/selenium-server-standalone-2.50.1.jar
        java -jar selenium-server-standalone-2.50.1.jar &
  and start the tests with npm
        npm test


Executing the examples
======================

Just call `mocha`. Mocha will then execute all the scripts in the directory named test.


Troubleshooting
===============

1) The test 'simple internet' fails and there is this message shown:
   Only local connections are allowed.

Ensure that the chromedriver is matching the selenium-server, e.g. try 
upgrade both to the latest releases.