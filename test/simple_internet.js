var assert = require('chai').assert,
    webdriverjs = require('webdriverjs');
var env = GLOBAL.env = {};
var client = {};

console.log('process.env.TRAVIS: %s', process.env.TRAVIS || 'no');
console.log('TEST_RUN_LOCAL: %s', process.env.TEST_RUN_LOCAL || '-');

process.on('uncaughtException', function(e) {
    console.log(require('util').inspect(e, {showHidden:true}));
});

if ((process.env.TRAVIS === 'true') && (process.env.TEST_RUN_LOCAL !== 'true')) {
    console.log('running tests on SauceLabs using sauce connect...');

    var BROWSERNAME = process.env._BROWSER || process.env.BROWSER || 'chrome';
    var BROWSERVERSION = process.env._VERSION || process.env.VERSION || '*';
    var BROWSERPLATFORM = process.env._PLATFORM || process.env.PLATFORM || 'Linux';
    var BUILDID = process.env.TRAVIS_BUILD_ID || 'unknown-buildid';
    var TUNNELIDENTIFIER = process.env.TRAVIS_JOB_NUMBER || 'unknown-jobnumber';

    console.log('BROWSERNAME: ' + BROWSERNAME);
    console.log('BROWSERVERSION: ' + BROWSERVERSION);
    console.log('BROWSERPLATFORM: ' + BROWSERPLATFORM);
    console.log('BUILDID: ' + BUILDID);
    console.log('TUNNELIDENTIFIER: ' + TUNNELIDENTIFIER);

    var options = { desiredCapabilities: {
            browserName: BROWSERNAME,
            version: BROWSERVERSION,
            platform: BROWSERPLATFORM,
            tags: ['examples'],
            name: 'Run a \'simple internet\' test using webdriverjs/Selenium.',
            build: BUILDID,
            'tunnel-identifier': TUNNELIDENTIFIER
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
    console.log('running tests locally...');
    options = {
        desiredCapabilities: {
            browserName: 'chrome'
        },
        host: 'localhost',
        port: 4444
    };
}

describe('Run a \'simple internet\' test using webdriverjs/Selenium.', function() {

    it('should be able to view page on internet, checks the title only using TDD style check', function(done) {
        this.timeout(60000); // some time is needed for the browser start up, on my system 3000 should work, too.

        var client = webdriverjs.remote(options);
        client.init()
        .url('https://google.com')
        // uses helper command getTitle()
        .getTitle(function(err, result) {
            assert.strictEqual(err, null);
            console.log('Title was: ' + result);
            assert.strictEqual(result, 'Google');
        })
        .end()
        .call(done);
    });

});
