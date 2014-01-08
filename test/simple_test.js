var expect = require('chai').expect,
    webdriverjs = require("webdriverjs"),
    client = webdriverjs.remote();

describe('Run Selenium tests', function() {

    before(function(done) {
        // Add some helper commands
        client.addCommand('hasText', function(selector, text, callback) {
            this.getText(selector, function(result) {
                expect(result.value).to.have.string(text);
                callback();
            });
        });
        done();
    });

    beforeEach(function(done) {
        // Navigate to the URL for each test
        client.init();
        client.url('http://localhost:3000', done);
    });
    
    it('should be able to view the home page', function(done) {
        this.timeout(10000);
        client.hasText('#title', 'Library');        
        done();
        
    });
        
    afterEach(function(done) {
        client.end();
        done();
    });

});