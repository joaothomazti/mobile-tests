const AuthPage = require('../pageobjects/auth.page')
const { expect } = require ('chai');
const userData = require('../data/userData.json')
const messages = require('../data/messages.json')


describe('Testes de Login de Usuário', () => {

    beforeEach(async () => {
        await AuthPage.clickLoginMainButton();
    });
    
    userData.forEach((user) => {
        it(`Deve permitir login com credenciais válidas para o e-mail: ${user.email}`, async () => {
            await AuthPage.login(user.email, user.password)

            const successMessage = await AuthPage.loginSuccessMessage.getText();
            expect(successMessage).to.eq(messages.auth.login.success);

            await AuthPage.clickOkButton();
        })

        it(`Deve exibir erro ao informar apenas o e-mail: ${user.email} e deixar a senha vazia`, async () => {
            await AuthPage.login(user.email, '');

            const isPasswordError = await AuthPage.validateErrorMessage(AuthPage.passwordErrorMessage, messages.auth.login.passwordError)
            expect(isPasswordError).to.be.true;
        })

        it('Deve exibir erro ao informar apenas a senha e deixar o e-mail vazio', async () => {
            await AuthPage.login('', user.password);

            const isEmailError = await AuthPage.validateErrorMessage(AuthPage.emailErrorMessage, messages.auth.login.emailError)
            expect(isEmailError).to.be.true;
        })
    });

    it('Deve exibir erros ao deixar o e-mail e a senha vazios', async () => {
        await AuthPage.login('', '');

        const errors = [
            { element: AuthPage.emailErrorMessage, message: messages.auth.login.emailError },
            { element: AuthPage.passwordErrorMessage, message: messages.auth.login.passwordError }
        ];

        for (const error of errors) {
            const isErrorVisible = await AuthPage.validateErrorMessage(error.element, error.message);
            expect(isErrorVisible).to.be.true;
        }
    });

})