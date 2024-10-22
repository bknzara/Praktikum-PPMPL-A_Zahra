const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function () {
    this.timeout(30000); // Set timeout for Mocha tests

    let driver;

    // Inisialisasi WebDriver sebelum menjalankan test case
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build(); // Bisa diganti 'firefox' untuk Firefox
    });

    // Tutup WebDriver setelah semua test selesai
    after(async function () {
        await driver.quit();
    });

    it('should load the login page', async function () {
        await driver.get('C:/Users/Nur/Documents/SEM 6/PPMPL/selenium-ui-test/login.html'); // Ubah path sesuai lokasi file login.html
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password using CSS Selector', async function () {
        await driver.findElement(By.css("#username")).clear(); // Hapus isi field
        await driver.findElement(By.css("#username")).sendKeys('testuser'); // Menggunakan CSS Selector
        await driver.findElement(By.css("#password")).clear(); // Hapus isi field
        await driver.findElement(By.css("#password")).sendKeys('password123'); // Menggunakan CSS Selector
        
        const usernameValue = await driver.findElement(By.css("#username")).getAttribute('value');
        const passwordValue = await driver.findElement(By.css("#password")).getAttribute('value');

        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should input username and password using XPath', async function () {
        await driver.findElement(By.xpath('//*[@id="username"]')).clear(); // Hapus isi field
        await driver.findElement(By.xpath('//*[@id="username"]')).sendKeys('testuser'); // Menggunakan XPath
        await driver.findElement(By.xpath('//*[@id="password"]')).clear(); // Hapus isi field
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123'); // Menggunakan XPath
        
        const usernameValue = await driver.findElement(By.xpath('//*[@id="username"]')).getAttribute('value');
        const passwordValue = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute('value');

        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function () {
        await driver.findElement(By.id('loginButton')).click();
    });

    it('should validate login failure with wrong credentials', async function () {
        await driver.get('C:/Users/Nur/Documents/SEM 6/PPMPL/selenium-ui-test/login.html'); // Ubah path sesuai lokasi file login.html

        // Masukkan kredensial yang salah
        await driver.findElement(By.id('username')).clear(); // Hapus isi field
        await driver.findElement(By.id('username')).sendKeys('wronguser'); // Username salah
        await driver.findElement(By.id('password')).clear(); // Hapus isi field
        await driver.findElement(By.id('password')).sendKeys('wrongpassword'); // Password salah
        await driver.findElement(By.id('loginButton')).click(); // Klik tombol login

        // Tunggu hingga pesan kesalahan muncul
        try {
            const errorMessage = await driver.wait(until.elementLocated(By.id('errorMessage')), 10000); // Ganti dengan ID pesan kesalahan yang sesuai
            const isErrorVisible = await errorMessage.isDisplayed();
            expect(isErrorVisible).to.be.true; // Pastikan pesan kesalahan terlihat
        } catch (error) {
            console.error("Error message not found:", error);
        }
    });

    it('should validate visual elements are displayed', async function () {
        const isLoginButtonDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        expect(isLoginButtonDisplayed).to.be.true; // Pastikan tombol login terlihat

        const isUsernameFieldDisplayed = await driver.findElement(By.id('username')).isDisplayed();
        expect(isUsernameFieldDisplayed).to.be.true; // Pastikan field username terlihat

        const isPasswordFieldDisplayed = await driver.findElement(By.id('password')).isDisplayed();
        expect(isPasswordFieldDisplayed).to.be.true; // Pastikan field password terlihat
    });
});
