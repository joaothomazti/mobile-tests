class AuthPage {

    static SELECTORS = {
        WEB_VIEW_SCREEN: browser.isAndroid ? '//android.webkit.WebView' : '//XCUIElementTypeWebView',
        EMAIL_ERROR_MESSAGE: browser.isAndroid 
            ? '//android.widget.TextView[@text="Please enter a valid email address"]' 
            : '//XCUIElementTypeStaticText[@name="Please enter a valid email address"]',
        PASSWORD_ERROR_MESSAGE: browser.isAndroid 
            ? '//android.widget.TextView[@text="Please enter at least 8 characters"]' 
            : '//XCUIElementTypeStaticText[@name="Please enter at least 8 characters"]',
        CONFIRM_PASSWORD_ERROR_MESSAGE: browser.isAndroid 
            ? '//android.widget.TextView[@text="Please enter the same password"]' 
            : '//XCUIElementTypeStaticText[@name="Please enter the same password"]',
        SIGN_UP_SUCCESS_MESSAGE: browser.isAndroid 
            ? '//android.widget.TextView[@text="You successfully signed up!"]' 
            : '//XCUIElementTypeStaticText[@name="You successfully signed up!"]',
        LOGIN_SUCCESS_MESSAGE: browser.isAndroid 
            ? '//android.widget.TextView[@resource-id="android:id/message"]' 
            : '//XCUIElementTypeStaticText[@name="Login successful"]',
        OK_BUTTON: browser.isAndroid 
            ? '//android.widget.Button[@resource-id="android:id/button1" and @text="OK"]' 
            : '//XCUIElementTypeButton[@name="OK"]',
    };

    get signUpContainerButton() { return $('~button-sign-up-container'); }
    get loginMainButton() { return $('~Login'); }
    get loginContainerButton() { return $('~button-login-container') }
    get loginActionButton() { return $('~button-LOGIN') }
    get emailInput() { return $('~input-email'); }
    get passwordInput() { return $('~input-password'); }
    get confirmPasswordInput() { return $('~input-repeat-password'); }
    get signUpActionButton() { return $('~button-SIGN UP'); }
    get emailErrorMessage() { return $(AuthPage.SELECTORS.EMAIL_ERROR_MESSAGE); }
    get passwordErrorMessage() { return $(AuthPage.SELECTORS.PASSWORD_ERROR_MESSAGE); }
    get confirmPasswordErrorMessage() { return $(AuthPage.SELECTORS.CONFIRM_PASSWORD_ERROR_MESSAGE) }
    get signUpSuccessMessage() { return $(AuthPage.SELECTORS.SIGN_UP_SUCCESS_MESSAGE); }
    get loginSuccessMessage() { return $(AuthPage.SELECTORS.LOGIN_SUCCESS_MESSAGE); }
    get okButton() { return $(AuthPage.SELECTORS.OK_BUTTON); }

    

    

    async clickLoginMainButton() {
        await this.loginMainButton.click();
    }

    async clickSignUpContainerButton() {
        await this.signUpContainerButton.click();
    }

    async login(email, password) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginActionButton.click();
    }

    async signUp(email, passowrd, confirmPassword) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(passowrd);
        await this.confirmPasswordInput.setValue(confirmPassword);
        await this.signUpActionButton.click();
    }

    async getTextFromElement(element) {
        return await element.getText();
    }

    async validateErrorMessage(element, expectedMessage) {
        const actualMessage = await this.getTextFromElement(element);
        return actualMessage === expectedMessage;
    }

    async clickOkButton() {
        await this.okButton.click();
    }
}

module.exports = new AuthPage();
