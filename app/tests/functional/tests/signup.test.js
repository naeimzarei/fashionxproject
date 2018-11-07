module.exports = {
    after: (browser) => {
        browser
            .end()
    },
    'The sign up page is visible': (browser) => {
        browser
            .url('http://localhost:3000/influencers/signup')
            .waitForElementVisible('body', 1000)
            .expect.element('body').to.be.present
        browser.assert.urlContains('influencers/signup');
    },
    'The sign up form is visible': (browser) => {
        browser
            .waitForElementVisible('form', 1000)
            .expect.element('form').to.be.present
    },
    'The sign up form fields can be populated': (browser) => {
        browser
            .click(`input[placeholder='First Name *']`)
            .setValue(`input[placeholder='First Name *']`, 'Carolyn')
            .click(`input[placeholder='Password *'`)
            .setValue(`input[placeholder='Password *']`, 'Password1')
            .click(`input[placeholder='Email *']`)
            .setValue(`input[placeholder='Email *']`, 'email@gmail.com')
            .click(`input[placeholder='Instagram Handle *']`)
            .setValue(`input[placeholder='Instagram Handle *']`, 'handle')
            .click(`input[placeholder='Height (ft) *']`)
            .setValue(`input[placeholder='Height (ft) *']`, '5')
            .click(`input[placeholder='(in) *']`)
            .setValue(`input[placeholder='(in) *']`, '8')
            .click(`select[name='bust_cup'] option[value='C']`)
    },
    'The sign up form fields are properly populated': (browser) => {
        browser.expect.element(`input[placeholder='First Name *'`).to.have.value.that.equals('Carolyn')
        browser.expect.element(`input[placeholder='Password *'`).to.have.value.that.equals('Password1')
        browser.expect.element(`input[placeholder='Email *'`).to.have.value.that.equals('email@gmail.com')
        browser.expect.element(`input[placeholder='Instagram Handle *'`).to.have.value.that.equals('handle')
        browser.expect.element(`input[placeholder='Blog'`).to.have.value.that.equals('')
        browser.expect.element(`input[placeholder='Height (ft) *'`).to.have.value.that.equals('5')
        browser.expect.element(`input[placeholder='(in) *'`).to.have.value.that.equals('8')
        browser.expect.element(`select[name='bust_cup']`).to.have.value.that.equals('C')
    },
    'The help button functions properly': (browser) => {
        browser.useXpath()
        browser.expect.element(`//*[contains(text(), 'Need help?')]`).to.be.present
        browser.expect.element(`//*[contains(text(), 'Need help?')]`).to.be.an('button')
    },
    'The sign up button functions properly': (browser) => {
        browser.expect.element(`//button[contains(text(), 'Sign Up')]`).to.be.present 
        browser.expect.element(`//button[contains(text(), 'Sign Up')]`).to.be.an('button')
    }
};