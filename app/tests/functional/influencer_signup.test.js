module.exports = {
    before: (browser) => {
        browser
        .url('http://localhost:3000/influencers/signup')
        .waitForElementVisible('body', 1000)
        browser.useCss()
    },
    after: (browser) => {
      browser.end()
    },
    'First name field is present and able to be populated': (browser) => {
        browser.click(`input[name='first_name']`)
        browser.setValue(`input[name='first_name']`, 'Elizabeth')
        browser.expect.element(`input[name='first_name']`).to.have.value.that.equals('Elizabeth')
    },
    'Email field is present and able to be populated': (browser) => {
        browser.click(`input[name='email']`)
        browser.setValue(`input[name='email']`, 'myemail@gmail.com')
        browser.expect.element(`input[name='email']`).to.have.value.that.equals('myemail@gmail.com')
    },
    'Password field is present and able to be populated': (browser) => {
        browser.click(`input[name='password']`)
        browser.setValue(`input[name='password']`, 'Password1')
        browser.expect.element(`input[name='password']`).to.have.value.that.equals('Password1')
    },
    'Instagram field is present and able to be populated': (browser) => {
        browser.click(`input[name='instagram_handle']`)
        browser.setValue(`input[name='instagram_handle']`, 'handle')
        browser.expect.element(`input[name='instagram_handle']`).to.have.value.that.contains('handle')
    },
    'Blog field is present and able to be populated': (browser) => {
        browser.click(`input[name='blog']`)
        browser.setValue(`input[name='blog']`, 'blog.com')
        browser.expect.element(`input[name='blog']`).to.have.value.that.equals('blog.com')
    },
    'Zip code field is present and able to be populated': (browser) => {
        browser.click(`input[name='zip']`)
        browser.setValue(`input[name='zip']`, '77382')
        browser.expect.element(`input[name='zip']`).to.have.value.that.equals('77382')
    },
    'Paypal field is present and able to be populated': (browser) => {
        browser.click(`input[name='paypal']`)
        browser.setValue(`input[name='paypal']`, 'paypal')
        browser.expect.element(`input[name='paypal']`).to.have.value.that.contains('paypal')
    },
    'Height feet field is present and able to be populated': (browser) => {
        browser.click(`input[name='height_ft']`)
        browser.setValue(`input[name='height_ft']`, 5)
        browser.expect.element(`input[name='height_ft']`).to.have.value.that.contains(5)
    },
    'Height in field is present and able to be populated': (browser) => {
        browser.click(`input[name='height_in']`)
        browser.setValue(`input[name='height_in']`, 8)
        browser.expect.element(`input[name='height_in']`).to.have.value.that.contains(8)
    },
    'Bust cup field is present and able to be populated': (browser) => {
        browser.click(`select[name='bust_cup'] option[value='D']`)
        browser.expect.element(`select[name='bust_cup']`).to.have.value.that.equals('D')
    },
    'Bust band field is present and able to be populated': (browser) => {
        browser.click(`select[name='bust_band'] option[value='44']`)
        browser.expect.element(`select[name='bust_band']`).to.have.value.that.equals('44')
    },
    'Natural waist field is present and able to be populated': (browser) => {
        browser.click(`input[name='waist']`)
        browser.setValue(`input[name='waist']`, 33)
        browser.expect.element(`input[name='waist']`).to.have.value.that.contains(33)
    },
    'Usual shirt size field is present and able to be populated': (browser) => {
        browser.click(`select[name='shirt_size'] option[value='M']`)
        browser.expect.element(`select[name='shirt_size']`).to.have.value.that.equals('M')
    },
    'Usual jean size field is present and able to be populated': (browser) => {
        browser.click(`select[name='jean_size'] option[value='28']`)
        browser.expect.element(`select[name='jean_size']`).to.have.value.that.equals('28')
    },
    'Torso length field is present and able to be populated': (browser) => {
        browser.click(`select[name='torso_length'] option[value='Regular']`)
        browser.expect.element(`select[name='torso_length']`).to.have.value.that.equals('Regular')
    },
    'Leg length field is present and able to be populated': (browser) => {
        browser.click(`select[name='leg_length'] option[value='Tall']`)
        browser.expect.element(`select[name='leg_length']`).to.have.value.that.equals('Tall')
    }
  }