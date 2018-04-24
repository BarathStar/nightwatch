const assert = require('assert');
const ExpectGlobals = require('../../../lib/globals/expect.js');
const Nocks = require('../../../lib/nocks.js');

describe('expect.text', function() {
  beforeEach(function(done) {
    ExpectGlobals.beforeEach.call(this, done);
  });

  afterEach(function(done) {
    ExpectGlobals.afterEach.call(this, done);
  });

  it('text to equal [PASSED]', function(done) {
    Nocks.elementFound().text('hp vasq');
    let expect = this.client.api.expect.element('#weblogin').text.to.equal('hp vasq');
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.waitForMs, null);
      assert.equal(expect.assertion.passed, true);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to equal: "hp vasq"');
    });

    this.client.start(done);
  });

  it('text to equal [FAILED]', function(done) {
    Nocks.elementFound().text('hp vasq');

    let expect = this.client.api.expect.element('#weblogin').text.to.equal('vasq');
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.expected, 'equal \'vasq\'');
      assert.equal(expect.assertion.negate, false);
      assert.equal(expect.assertion.actual, 'hp vasq');
      assert.equal(expect.assertion.resultValue, 'hp vasq');
      assert.equal(expect.assertion.passed, false);
      assert.deepEqual(expect.assertion.messageParts, [' equal', ': "', 'vasq', '"']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to equal: "vasq"');
    });

    this.client.start(done);
  });

  it('text to NOT equal [PASSED]', function(done) {
    Nocks.elementFound().text('hp vasq');

    let expect = this.client.api.expect.element('#weblogin').text.to.not.equal('xx');
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.waitForMs, null);
      assert.equal(expect.assertion.negate, true);
      assert.equal(expect.assertion.passed, true);
      assert.equal(expect.assertion.resultValue, 'hp vasq');
      assert.deepEqual(expect.assertion.messageParts, [' not equal', ': "', 'xx', '"']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to not equal: "xx"');
    });

    this.client.start(done);
  });

  it('text to NOT equal [FAILED]', function(done) {
    Nocks.elementFound().text('hp vasq');

    let expect = this.client.api.expect.element('#weblogin').text.to.not.equal('hp vasq');
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.expected, 'not equal \'hp vasq\'');
      assert.equal(expect.assertion.negate, true);
      assert.equal(expect.assertion.actual, 'hp vasq');
      assert.equal(expect.assertion.resultValue, 'hp vasq');
      assert.equal(expect.assertion.passed, false);
      assert.deepEqual(expect.assertion.messageParts, [' not equal', ': "', 'hp vasq', '"']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to not equal: "hp vasq"');
    });

    this.client.start(done);
  });

  it('text to equal with waitFor [PASSED]', function(done) {
    this.client.api.globals.waitForConditionPollInterval = 50;
    Nocks.elementFound();

    let expect = this.client.api.expect.element('#weblogin').text.to.equal('hp vasq').before(100);
    Nocks.text(null).text('hp vasq');

    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.waitForMs, 100);
      assert.equal(expect.assertion.passed, true);
      assert.equal(expect.assertion.retries, 1);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to equal: "hp vasq" in 100ms - condition was met in ' + expect.assertion.elapsedTime + 'ms');
    });

    this.client.start(done);
  });

  it('text to equal and waitFor [FAILED] - text not equal', function(done) {
    this.client.api.globals.waitForConditionPollInterval = 10;

    Nocks.elementFound().text('xx', 3);

    let expect = this.client.api.expect.element('#weblogin').text.to.equal('hp vasq').before(25);
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.waitForMs, 25);
      assert.equal(expect.assertion.passed, false);
      assert.ok(expect.assertion.retries >= 1);
      assert.ok(expect.assertion.elapsedTime >= 25);
      assert.equal(expect.assertion.expected, 'equal \'hp vasq\'');
      //assert.equal(expect.assertion.actual, 'xx');
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to equal: "hp vasq" in 25ms');
    });

    this.client.start(done);
  });

  it('text to not equal [PASSED]', function(done) {
    Nocks.elementFound().text('xx');

    let expect = this.client.api.expect.element('#weblogin').text.to.not.equal('vasq');
    assert.equal(expect.assertion.message, 'Expected element <%s> text to');
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.expected, 'not equal \'vasq\'');
      assert.equal(expect.assertion.actual, 'xx');
      assert.equal(expect.assertion.negate, true);
      assert.equal(expect.assertion.resultValue, 'xx');
      assert.equal(expect.assertion.passed, true);
      assert.deepEqual(expect.assertion.messageParts, [' not equal', ': "', 'vasq', '"']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to not equal: "vasq"');
    });

    this.client.start(done);
  });

  it('text to not equal [FAILED]', function(done) {
    Nocks.elementFound().text('xx');

    let expect = this.client.api.expect.element('#weblogin').text.to.not.equal('xx');
    assert.equal(expect.assertion.message, 'Expected element <%s> text to');
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.expected, 'not equal \'xx\'');
      assert.equal(expect.assertion.actual, 'xx');
      assert.equal(expect.assertion.negate, true);
      assert.equal(expect.assertion.resultValue, 'xx');
      assert.equal(expect.assertion.passed, false);
      assert.deepEqual(expect.assertion.messageParts, [' not equal', ': "', 'xx', '"']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to not equal: "xx"');
    });

    this.client.start(done);
  });

  it('text to not contain [PASSED]', function(done) {
    Nocks.elementFound().text('xx');

    let expect = this.client.api.expect.element('#weblogin').text.to.not.contain('vasq');

    assert.equal(expect.assertion.message, 'Expected element <%s> text to');
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.expected, 'not contain \'vasq\'');
      assert.equal(expect.assertion.actual, 'xx');
      assert.equal(expect.assertion.negate, true);
      assert.equal(expect.assertion.resultValue, 'xx');
      assert.equal(expect.assertion.passed, true);
      assert.deepEqual(expect.assertion.messageParts, [' not contain', ': "', 'vasq', '"']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to not contain: "vasq"');
    });

    this.client.start(done);
  });

  it('text to contain [PASSED]', function(done) {
    Nocks.elementFound().text('vasq');

    let expect = this.client.api.expect.element('#weblogin').text.to.contain('vasq');

    assert.equal(expect.assertion.message, 'Expected element <%s> text to');
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.expected, 'contain \'vasq\'');
      assert.equal(expect.assertion.actual, 'vasq');
      assert.equal(expect.assertion.negate, false);
      assert.equal(expect.assertion.resultValue, 'vasq');
      assert.equal(expect.assertion.passed, true);
      assert.deepEqual(expect.assertion.messageParts, [' contain', ': "', 'vasq', '"']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to contain: "vasq"');
    });

    this.client.start(done);
  });

  it('text to not contain [FAILED]', function(done) {
    Nocks.elementFound().text('xx');

    let expect = this.client.api.expect.element('#weblogin').text.to.not.contains('xx');
    assert.equal(expect.assertion.message, 'Expected element <%s> text to');
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.expected, 'not contain \'xx\'');
      assert.equal(expect.assertion.actual, 'xx');
      assert.equal(expect.assertion.negate, true);
      assert.equal(expect.assertion.resultValue, 'xx');
      assert.equal(expect.assertion.passed, false);
      assert.deepEqual(expect.assertion.messageParts, [' not contain', ': "', 'xx', '"']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to not contain: "xx"');
    });

    this.client.start(done);
  });

  it('text to match [PASSED]', function(done) {
    Nocks.elementFound().text('vasq');

    let expect = this.client.api.expect.element('#weblogin').text.to.match(/vasq/);

    assert.equal(expect.assertion.message, 'Expected element <%s> text to');
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.expected, 'match \'/vasq/\'');
      assert.equal(expect.assertion.actual, 'vasq');
      assert.equal(expect.assertion.negate, false);
      assert.equal(expect.assertion.resultValue, 'vasq');
      assert.equal(expect.assertion.passed, true);
      assert.deepEqual(expect.assertion.messageParts, [' match', ': "', /vasq/, '"']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to match: "/vasq/"');
    });

    this.client.start(done);
  });

  it('text to not match [PASSED]', function(done) {
    Nocks.elementFound().text('xx');

    let expect = this.client.api.expect.element('#weblogin').text.to.not.match(/vasq/);

    assert.equal(expect.assertion.message, 'Expected element <%s> text to');
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.expected, 'not match \'/vasq/\'');
      assert.equal(expect.assertion.actual, 'xx');
      assert.equal(expect.assertion.negate, true);
      assert.equal(expect.assertion.resultValue, 'xx');
      assert.equal(expect.assertion.passed, true);
      assert.deepEqual(expect.assertion.messageParts, [' not match', ': "', /vasq/, '"']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to not match: "/vasq/"');
    });

    this.client.start(done);
  });

  it('text to not match [FAILED]', function(done) {
    Nocks.elementFound().text('xx');

    let expect = this.client.api.expect.element('#weblogin').text.to.not.match(/xx/);
    assert.equal(expect.assertion.message, 'Expected element <%s> text to');
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.expected, 'not match \'/xx/\'');
      assert.equal(expect.assertion.actual, 'xx');
      assert.equal(expect.assertion.negate, true);
      assert.equal(expect.assertion.resultValue, 'xx');
      assert.equal(expect.assertion.passed, false);
      assert.deepEqual(expect.assertion.messageParts, [' not match', ': "', /xx/, '"']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to not match: "/xx/"');
    });

    this.client.start(done);
  });

  it('text to equal - element not found', function(done) {
    Nocks.elementNotFound();

    let expect = this.client.api.expect.element('#weblogin').text.to.equal('vasq');
    assert.equal(expect.assertion.message, 'Expected element <%s> text to');
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.expected, 'present');
      assert.equal(expect.assertion.actual, 'not present');
      assert.equal(expect.assertion.negate, false);
      assert.equal(expect.assertion.resultValue, null);
      assert.equal(expect.assertion.passed, false);
      assert.deepEqual(expect.assertion.messageParts, [' equal', ': "', 'vasq', '"', ' - element was not found']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to equal: "vasq" - element was not found');
    });

    this.client.start(done);
  });

  it('text to contain - element not found', function(done) {
    Nocks.elementNotFound();

    let expect = this.client.api.expect.element('#weblogin').text.to.contain('vasq');

    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.expected, 'present');
      assert.equal(expect.assertion.actual, 'not present');
      assert.equal(expect.assertion.passed, false);
      assert.deepEqual(expect.assertion.messageParts, [' contain', ': "', 'vasq', '"', ' - element was not found']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to contain: "vasq" - element was not found');
    });

    this.client.start(done);
  });

  it('text to match - element not found', function(done) {
    Nocks.elementNotFound();

    let expect = this.client.api.expect.element('#weblogin').text.to.match(/vasq$/);

    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.expected, 'present');
      assert.equal(expect.assertion.actual, 'not present');
      assert.equal(expect.assertion.passed, false);
      assert.deepEqual(expect.assertion.messageParts, [' match', ': "', /vasq$/, '"', ' - element was not found']);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to match: "/vasq$/" - element was not found');
    });

    this.client.start(done);
  });

  it('text to match with waitFor - element not found', function(done) {
    this.client.api.globals.waitForConditionPollInterval = 50;

    Nocks.elementNotFound().elementNotFound().elementNotFound();

    let expect = this.client.api.expect.element('#weblogin').text.to.match(/vasq$/).before(60);
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.waitForMs, 60);
      assert.equal(expect.assertion.passed, false);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to match: "/vasq$/" in 60ms - element was not found');
    });

    this.client.start(done);
  });

  it('text to match with waitFor - element found on retry', function(done) {
    this.client.api.globals.waitForConditionPollInterval = 50;

    Nocks.elementNotFound().elementFound().text('hp vasq');

    let expect = this.client.api.expect.element('#weblogin').text.to.match(/vasq$/).before(60);
    this.client.once('nightwatch:finished', function(results, errors) {
      assert.equal(expect.assertion.waitForMs, 60);
      assert.equal(expect.assertion.passed, true);
      assert.equal(expect.assertion.message, 'Expected element <#weblogin> text to match: "/vasq$/" in 60ms - condition was met in ' + expect.assertion.elapsedTime + 'ms');
    });

    this.client.start(done);
  });

  it('text to match - throws exception on invalid regex', function(done) {
    Nocks.elementFound().text('xx');

    let expect = this.client.api.expect.element('#weblogin').text;
    assert.throws(function() {
      expect.which.matches('');
    }.bind(this));

    this.client.once('nightwatch:finished', function(results, errors) {
    });

    this.client.start(done);
  });
});
