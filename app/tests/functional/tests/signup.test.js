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
            .click(`input[placeholder='Age *']`)
            .setValue(`input[placeholder='Age *']`, '18')
            .click(`input[placeholder='Instagram Handle *']`)
            .setValue(`input[placeholder='Instagram Handle *']`, 'handle')
            .click(`input[placeholder='Height (ft) *']`)
            .setValue(`input[placeholder='Height (ft) *']`, '5')
            .click(`input[placeholder='(in) *']`)
            .setValue(`input[placeholder='(in) *']`, '8')
            .click(`input[placeholder='Weight (lbs) *']`)
            .setValue(`input[placeholder='Weight (lbs) *']`, '145')
            .click(`select[name='bust_cup'] option[value='C']`)
            .click(`select[name='bust_band'] option[value='Band C']`)
            .click(`input[placeholder='Waist (in) *']`)
            .setValue(`input[placeholder='Waist (in) *']`, '30')
            .click(`input[placeholder='Hips (in) *']`)
            .setValue(`input[placeholder='Hips (in) *']`, '30')
            .click(`select[name='jean_size'] option[value='Medium (M)']`)
            .click(`select[name='shirt_size'] option[value='Medium (M)']`)
            .click(`input[placeholder='Leg Length *']`)
            .setValue(`input[placeholder='Leg Length *']`, '30')
    },
    'The sign up form fields are properly populated': (browser) => {
        browser.expect.element(`input[placeholder='First Name *'`).to.have.value.that.equals('Carolyn')
        browser.expect.element(`input[placeholder='Password *'`).to.have.value.that.equals('Password1')
        browser.expect.element(`input[placeholder='Email *'`).to.have.value.that.equals('email@gmail.com')
        browser.expect.element(`input[placeholder='Age *'`).to.have.value.that.equals('18')
        browser.expect.element(`input[placeholder='Instagram Handle *'`).to.have.value.that.equals('handle')
        browser.expect.element(`input[placeholder='Blog'`).to.have.value.that.equals('')
        browser.expect.element(`input[placeholder='Height (ft) *'`).to.have.value.that.equals('5')
        browser.expect.element(`input[placeholder='(in) *'`).to.have.value.that.equals('8')
        browser.expect.element(`input[placeholder='Weight (lbs) *'`).to.have.value.that.equals('145')
        browser.expect.element(`select[name='bust_cup']`).to.have.value.that.equals('C')
        browser.expect.element(`select[name='bust_band']`).to.have.value.that.equals('Band C')
        browser.expect.element(`input[placeholder='Waist (in) *'`).to.have.value.that.equals('30')
        browser.expect.element(`input[placeholder='Hips (in) *'`).to.have.value.that.equals('30')
        browser.expect.element(`select[name='jean_size']`).to.have.value.that.equals('Medium (M)')
        browser.expect.element(`select[name='shirt_size']`).to.have.value.that.equals('Medium (M)')
        browser.expect.element(`input[placeholder='Leg Length *'`).to.have.value.that.equals('30')
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