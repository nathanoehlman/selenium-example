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
        client.addCommand('waitUntilVisible', function(element, callback) {
            var self = this;
            function checkElement() {
                self.isVisible(element, function(result) {
                    if (result === true) {
                        callback();
                    } else {
                        setTimeout(checkElement, 500);
                    }
                });
            }
            checkElement();
        });
        done();
    });

    beforeEach(function(done) {
        // Navigate to the URL for each test
        client.init();
        client.url('http://localhost:3000', done);
    });
    
    it('should be able to navigate betwen the pages', function(done) {
        this.timeout(10000);
        client
            .hasText('#title', 'Library')
            .click('#authors')
            .waitUntilVisible("#authorList", function() {
                client
                    .hasText('#author1', 'Patrick Rothfuss')
                    .click('#back')
                    .waitUntilVisible('#books', function() {
                        client
                            .click('#books')
                            .waitUntilVisible('#bookList', function() {
                                client.hasText('book1', "Wise Man's Fear");
                                done();
                            });
                    });
            });        
    });
        
    afterEach(function(done) {
        client.end();
        done();
    });

});