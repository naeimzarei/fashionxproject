module.exports = {
    after: (browser) => {
        browser.end()
    },
    'The home page is visible': (browser) => {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('body', 1000)
            .expect.element('body').to.be.present
        browser.assert.urlEquals('http://localhost:3000/');
    },
    'The shopper button functions properly': (browser) => {
        browser.useXpath()
        browser.click(`//button[contains(text(), 'Shopper')]`, () => {
            browser.expect.element(`//button[contains(text(), 'Shopper')]`).to.be.present 
            browser.assert.urlEquals('http://localhost:3000/');
        })
    },
    'The influencer button functions properly': (browser) => {
        browser.click(`//button[contains(text(), 'Influencer')]`, () => {
            browser.window_handles((result) => {
                browser.switchWindow(result.value[1])
                browser.assert.urlEquals('http://localhost:3000/influencers')
                browser.switchWindow(result.value[0])
            })
        })
    },
    'The sign up button functions properly': (browser) => {
        browser.click(`//a[contains(text(), 'Sign Up')]`, () => {
            browser.assert.urlEquals('http://localhost:3000/influencers/signup')
            browser.back()
            browser.assert.urlEquals('http://localhost:3000/influencers')
        })
    },
    'The login button functions properly': (browser) => {
        browser.click(`//a[contains(text(), 'Log In')]`, () => {
            browser.assert.urlContains('influencers/login')
            browser.back()
            browser.assert.urlContains('http://localhost:3000/influencers')
        })
    }
}