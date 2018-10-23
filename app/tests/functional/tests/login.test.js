module.exports = {
    after: (browser) => {
        browser.end()
    },
    'The login page is visible': (browser) => {
        browser
        .url('http://localhost:3000/influencers/login')
        .waitForElementVisible('body', 1000)
        .expect.element('body').to.be.present
        browser.assert.urlEquals('http://localhost:3000/influencers/login');
    },
    'The email field is visible': (browser) => {
        browser.useCss()
        browser.expect.element(`input[name='email'`).to.be.present
    },
    'The email field can be populated': (browser) => {
        browser
            .click(`input[name='email']`)
            .setValue(`input[name='email']`, 'email@gmail.com')
    },
    'The email field is properly populated': (browser) => {
        browser.expect.element(`input[name='email']`).to.have.value.that.equals('email@gmail.com')
    },
    'The password field is visible': (browser) => {
        browser.expect.element(`input[name='password']`).to.be.present
    },
    'The password field can be populated': (browser) => {
        browser
            .click(`input[name='password']`)
            .setValue(`input[name='password']`, 'Password1')
    },
    'The password field is properly populated': (browser) => {
        browser.expect.element(`input[name='password']`).to.have.value.that.equals('Password1')
    }
}