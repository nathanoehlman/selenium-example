var chai = require('chai');
var assert = chai.assert, // TDD
    expect = chai.expect, // BDD
    webdriverjs = require('webdriverjs');

process.on('uncaughtException', function(e) {
    console.log(require('util').inspect(e, {showHidden:true}));
});

var options = {};

process.on('uncaughtException', function(e) {
    console.log(require('util').inspect(e, {showHidden:true}));
});

if ((process.env.TRAVIS === 'true') && (process.env.TEST_RUN_LOCAL !== 'true')) {
    var BROWSERNAME = (process.env._BROWSER || process.env.BROWSER || 'chrome').replace(/_/g,' ');
    var BROWSERVERSION = process.env._VERSION || process.env.VERSION || '*';
    var BROWSERPLATFORM = (process.env._PLATFORM || process.env.PLATFORM || 'Linux').replace(/_/g,' ');
    var BUILDID = process.env.TRAVIS_BUILD_ID || 'unknown-buildid';
    var TUNNELIDENTIFIER = process.env.TRAVIS_JOB_NUMBER || 'unknown-jobnumber';
    // select selenium version - for available versions see https://docs.saucelabs.com/reference/test-configuration/#specifying-a-selenium-version
    var SELENIUMVERSION = '2.47.1';

//    console.log('BROWSERNAME: ' + BROWSERNAME);
//    console.log('BROWSERVERSION: ' + BROWSERVERSION);
//    console.log('BROWSERPLATFORM: ' + BROWSERPLATFORM);
//    console.log('BUILDID: ' + BUILDID);
//    console.log('TUNNELIDENTIFIER: ' + TUNNELIDENTIFIER);

    var options = { desiredCapabilities: {
            browserName: BROWSERNAME,
            version: BROWSERVERSION,
            platform: BROWSERPLATFORM,
            tags: ['examples'],
            name: 'Run web app \'page test\' using webdriverjs/Selenium.',
            build: BUILDID,
            'tunnel-identifier': TUNNELIDENTIFIER,
            'selenium-version': SELENIUMVERSION
        },
        // for w/o sauce connect
        //      host: 'ondemand.saucelabs.com',
        //      port: 80,
        // use with sauce connect:
        host: 'localhost',
        port: 4445,
        user: process.env.SAUCE_USERNAME,
        key: process.env.SAUCE_ACCESS_KEY,
        logLevel: 'verbose'
    };
}
else
{
    options = {
        desiredCapabilities: {
            browserName: 'chrome'
        }
    };
}


describe('Run web app \'page test\' using webdriverjs/Selenium.', function() {

    var client = {};

    before(function(done) {
        // console.log('--before--');
        this.timeout(60000);

        client = webdriverjs.remote(options);

        // start the session
        client.init()
        .call(done);
    });

    after(function(done) {
        //console.log('--after--');
        client.end()
        .call(done);
    });

    beforeEach(function(done) {
        //console.log('--beforeEach--');
        this.timeout(60000); // some time is needed for the browser start up, on my system 3000 should work, too.
        // Navigate to the URL for each test
        client.url('http://localhost:3000')
        .call(done);
    });
    
    it('checks the title only - using TDD style check', function(done) {
        // uses helper command getTitle()
        client.getTitle(function(err, result) {
            assert.strictEqual(err, null);
            //console.log('1 Title was: ' + result);
            assert.strictEqual(result, 'Library'); // TDD
        })
        .call(done);
    });

    it('checks the title only, a second time - but using BDD style check', function(done) {
        client
        .getTitle(function(err, result) {
            if (err) throw err;
            //console.log('1 Title was: ' + result);
            expect(result).to.have.string('Library'); // BDD
        })
        // uses underlying protocol function title()
        .title(function(err, result) {
            if (err) throw err;
            //console.log('2 Title was: ' + result.value);
            expect(result.value).to.have.string('Library'); // BDD
        })
        .call(done);;
    });

    it('should be able to navigate between the pages', function(done) {
        client
        .getTitle(function(err, result) {
            assert.strictEqual(err, null);
            //console.log('Title was: ' + result);
            assert.strictEqual(result, 'Library');
        })
        .click('#authors')
        .pause(1000) // wait required for Win10/edge, TODO reduce time to wait, 1000 working, 100 not; rework to use waitFor from webdriverio 3.x
        .getTitle(function(err, title) {
            assert.strictEqual(err, null);
            assert.strictEqual(title, 'Authors');
        })
        .getText('#author1', function(err, result) {
            if (err) throw err;
            //console.log('#author1: ' + result);
            expect(result).to.have.string('Patrick Rothfuss');
        })
        .click('#back')
        .getTitle(function(err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(result, 'Library');
        })
        .click('#books')
        .getTitle(function(err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(result, 'Books');
        })
        .getText('#book1', function(err, result) {
            assert.strictEqual(err, null);
            //console.log('#book1: ' + result);
            assert.strictEqual(result, 'Wise Man\'s Fear');
        })
        .click('#back')
        .getTitle(function(err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(result, 'Library');
        })
        .call(done);
    });

});
