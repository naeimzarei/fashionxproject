var platform = process.platform;

var chromedriver_path = '';
var firefox_path = '';

if (platform === 'linux') {
    chromedriver_path = './app/tests/functional/bin/linux/chrome/chromedriver';
    firefox_path = './app/tests/functional/bin/linux/firefox/geckodriver';
} else if (platform === 'darwin') {
    chromedriver_path = './app/tests/functional/bin/darwin/chrome/chromedriver';
    firefox_path = './app/tests/functional/bin/darwin/firefox/geckodriver';
} else if (platform === 'win32') {
    chromedriver_path = './app/tests/functional/bin/win32/chrome/chromedriver.exe';
    firefox_path = './app/tests/functional/bin/win32/firefox/geckodriver.exe';
}

module.exports = {
    "src_folders": ["./app/tests/functional"],
    "output_folder": "./app/tests/functional/reports",
    "selenium": {
        "start_process": true,
        "server_path": "./app/tests/functional/bin/selenium-server-standalone-3.14.0.jar",
        "log_path": "",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver": chromedriver_path,
            "webdriver.gecko.driver": firefox_path
        }
    },
    "test_settings": {
        "chrome": {
            "selenium_port": 4444,
            "selenium_host": "localhost",
            "desiredCapabilities": {
                "browserName": "chrome",
                "acceptSslCerts": true,
                "javascriptEnabled": true
            },
            "screenshots": {
                "enabled": false,
                "path": ""
            }
        },
        "firefox": {
            "selenium_port": 4444,
            "selenium_host": "localhost",
            "desiredCapabilities": {
                "browserName": "firefox",
                "acceptSslCerts": true,
                "javascriptEnabled": true
            },
            "screenshots": {
                "enabled": false,
                "path": ""
            }
        }
    }
};