var assert = require('chai').assert,
    expect = require('chai').expect,
    webdriverjs = require('webdriverjs');
var env = GLOBAL.env = {};
var client = {};

console.log('USER: %s', process.env.USER || '-');
console.log('TRAVIS: %s', process.env.TRAVIS || 'no');

if (process.env.TRAVIS) {
    var BROWSERNAME = process.env._BROWSER || process.env.BROWSER || 'chrome';
    var BROWSERVERSION = process.env._VERSION || process.env.VERSION || '*';
    var BROWSERPLATFORM = process.env._PLATFORM || process.env.PLATFORM || 'Linux';
    console.log('BROWSERNAME: ' + BROWSERNAME);
    console.log('BROWSERVERSION: ' + BROWSERVERSION);
    console.log('BROWSERPLATFORM: ' + BROWSERPLATFORM);

    var options = { desiredCapabilities: {
            browserName: BROWSERNAME,
            version: BROWSERVERSION,
            platform: BROWSERPLATFORM,
            tags: ['examples'],
            name: 'Run single page test using webdriverjs/Selenium.',
        },
        // for w/o sauce connect
        //      host: 'ondemand.saucelabs.com',
        //      port: 80,
        // use with sauce connect:
        host: 'localhost',
        port: 4445,
        user: process.env.SAUCE_USERNAME,
        key: process.env.SAUCE_ACCESS_KEY,
        logLevel: 'silent'
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

describe('Run a simple test using webdriverjs/Selenium.', function() {

    var client = {};

    before(function(done) {
        this.timeout(10000);
        client = webdriverjs.remote(options);

        // Add a helper command
        client.addCommand('hasText', function(selector, text, callback) {
            this.getText(selector, function(err, result) {
                assert.strictEqual(err, null);
                assert.strictEqual(result, text); // TDD
                expect(result).to.have.string(text); // BDD
            })
            .call(callback);
        });

        client.init()
        .call(done);
    });

    beforeEach(function(done) {
        this.timeout(10000); // some time is needed for the browser start up, on my system 3000 should work, too.
        // Navigate to the URL for each test
        client.url('http://localhost:3000')
        .call(done);
    });

    it('should be able to view the home page', function(done) {
        client.hasText('#title', 'Library')
        .call(done);
    });

    after(function(done) {
        client.end().call(done);
    });

});
