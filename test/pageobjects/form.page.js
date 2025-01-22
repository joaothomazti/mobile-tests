const dropdownOptions = require('../data/dropdownOptions.json');

class FormPage  {

    static SELECTORS = {
        ACTIVE_BUTTON_MESSAGE: browser.isAndroid 
            ? '//android.widget.TextView[@resource-id="android:id/message"]' 
            : '//XCUIElementTypeStaticText[@name="Active button clicked"]',
        SWITCH_MESSAGE_ELEMENT: browser.isAndroid 
            ? '//android.widget.TextView[@content-desc="switch-text"]' 
            : '//XCUIElementTypeStaticText[@name="Switch is ON"]',
        SELECTED_DROPDOWN: browser.isAndroid 
            ? '//android.widget.EditText[@resource-id="text_input"]' 
            : '//XCUIElementTypeTextField[@name="text_input"]',
        DROPDOWN_OPTION: (optionText) => browser.isAndroid 
            ? `//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="${optionText}"]` 
            : `//XCUIElementTypeStaticText[@name="${optionText}"]`,
    }


    get formsMainButton() { return $('~Forms')}
    get inputField() { return $('~text-input'); }
    get switchToggle() { return $('~switch'); } 
    get dropdown() { return $('~Dropdown'); } 
    get activeButton() { return $('~button-Active'); } 
    get inactiveButton() { return $('~button-Inactive'); } 
    get typedText() { return $('~input-text-result'); } 
    get activeButtonMessage() { return $(FormPage.SELECTORS.ACTIVE_BUTTON_MESSAGE); }
    get switchMessageElement() { return $(FormPage.SELECTORS.SWITCH_MESSAGE_ELEMENT); }
    get selectedDropDown() { return $(FormPage.SELECTORS.SELECTED_DROPDOWN); }



    async clickFormsMainButton() {
        await this.formsMainButton.click();
    }

    async enterText(text) {
        await this.inputField.setValue(text);
    }

    async getTypedText() {
        return await this.typedText.getText();
    }

    async toggleSwitch() {
        await this.switchToggle.click(); 
    }

    async getSwitchMessage() {
        return this.switchMessageElement.getText();
    }

    async selectDropdown(optionText) {
        await this.dropdown.click();

        await browser.waitUntil(async () => {
            return (await $(FormPage.SELECTORS.DROPDOWN_OPTION(optionText))).isDisplayed();
        }, { timeout: 5000, timeoutMsg: 'Opções do dropdown não foram exibidas.' });

        const option = await $(FormPage.SELECTORS.DROPDOWN_OPTION(optionText));
        await option.click();
    }

    async getSelectedDropdownOption() {
        return this.selectedDropDown.getText();
    }

    async clickActiveButton() {
        await this.activeButton.click();
    }

    async getActiveButtonMessage() {
        return await this.activeButtonMessage.getText();
    }

    async isInactiveButtonClickable() {
        return {
            isDisplayed: await this.inactiveButton.isDisplayed(),
            isDisabled:  await this.inactiveButton.isEnabled()
        };
    }

    getDropdownOptions() {
        return dropdownOptions.options;
    }
}

module.exports = new FormPage();


