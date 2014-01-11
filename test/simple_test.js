var assert = require('chai').assert,
    expect = require('chai').expect,
    webdriverjs = require('webdriverjs');
var env = GLOBAL.env = {};
var client = {};

console.log('TRAVIS: %s', env.TRAVIS || 'no');
console.log('SELENIUM_HOST: %s', env.SELENIUM_HOST || '-');
console.log('SELENIUM_PORT: %s', env.SELENIUM_PORT || '-');

if (env.TRAVIS) {
    var BROWSERNAME = env._BROWSER || env.BROWSER || 'chrome';
    var BROWSERVERSION = env._VERSION || env.VERSION || '*';
    var BROWSERPLATFORM = env._PLATFORM || env.PLATFORM || 'Linux';
    console.log('BROWSERNAME: ' + BROWSERNAME);
    console.log('BROWSERVERSION: ' + BROWSERVERSION);
    console.log('BROWSERPLATFORM: ' + BROWSERPLATFORM);

    var options = { desiredCapabilities: {
            browserName: 'chrome',
            version: '27',
            platform: 'XP',
            tags: ['examples'],
            name: 'Run single page test using webdriverjs/Selenium.'
        },
        // for w/o sauce connect
        //      host: 'ondemand.saucelabs.com',
        //      port: 80,
        // use with sauce connect:
        host: 'localhost',
        port: 4445,
        user: env.SAUCE_USERNAME,
        key: env.SAUCE_ACCESS_KEY,
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

describe('Run single page test using webdriverjs/Selenium.', function() {

    var client = {};

    before(function(done) {
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
