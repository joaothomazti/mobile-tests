const FormPage = require('../pageobjects/form.page');
const AuthPage = require('../pageobjects/auth.page');
const { expect } = require('chai');
const messages = require('../data/messages.json')


describe('Testes do Formulário', () => {

    beforeEach(async () => {
        await FormPage.clickFormsMainButton();
    });

    it('Deve preencher o campo de texto e verificar o texto digitado', async () => {

        const inputText = messages.form.input.text;
        await FormPage.enterText(inputText);

        const typedText = await FormPage.getTypedText();
        expect(typedText).to.eq(inputText);
    });

    it('Deve alternar o estado do switch e verificar a mensagem correspondente', async () => {

        await FormPage.toggleSwitch();

        const stateMessage = await FormPage.getSwitchMessage();
        const expectedMessage = stateMessage.includes('ON')
            ? messages.form.switch.on
            : messages.form.switch.off;

        expect(stateMessage).to.eq(expectedMessage);
    });

    it('Deve selecionar uma opção válida no dropdown', async () => {

        const options = FormPage.getDropdownOptions();
        const optionIndex = 1;

        if (optionIndex < 0 || optionIndex > options.length) {
            throw new Error(`Índice inválido: ${optionIndex}. Índices válidos: entre 0 e ${options.length - 1}.`);
        }

        const optionToSelect = options[optionIndex];
        await FormPage.selectDropdown(optionToSelect);

        const selectedOptionText = await FormPage.getSelectedDropdownOption();
        expect(selectedOptionText).to.eq(optionToSelect);
    });

    it('Deve clicar no botão ativo e verificar a mensagem exibida', async () => {

        await FormPage.clickActiveButton();

        const message = await FormPage.getActiveButtonMessage();
        expect(message).to.eq(messages.form.button.activeMessage)

        await AuthPage.clickOkButton()
    });

    it('Deve verificar que o botão inativo está visível mas não clicável', async () => {


        const { isDisplayed, isDisabled } = await FormPage.isInactiveButtonClickable();

        expect(isDisplayed).to.be.true;
        expect(isDisabled).to.be.true;
    });
})