module.exports = {
  after: (browser) => {
    browser.end()
  },
  'Set Up': (browser) => {
    browser
      .url('http://localhost:3000/influencers/login')
      .waitForElementVisible('body', 1000)
  },
  'Email field is functional': (browser) => {
    browser.click(`input[name='email']`)
    browser.setValue(`input[name='email']`, 'atestingemail@gmail.com')
  },
  'Password field is functional': (browser) => {
    browser.click(`input[name='password']`)
    browser.setValue(`input[name='password']`, 'Password1')
  },
  'Assert email field is valid': (browser) => {
    browser.expect.element(`input[name='email']`).to.have.value.that.equals('atestingemail@gmail.com')
  },
  'Assert password field is valid': (browser) => {
    browser.expect.element(`input[name='password']`).to.have.value.that.equals('Password1')
  },
  'Log In button is present': (browser) => {
    browser.useXpath()
    browser.expect.element(`//*[contains(text(),'Log In')]`).to.be.present
  }
}