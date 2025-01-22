const AuthPage = require('../pageobjects/auth.page')
const { expect } = require('chai');
const userData = require('../data/userData.json')
const messages = require('../data/messages.json')

describe('Testes de Cadastro de Usuário (SignUp)', () => {

    beforeEach(async() => {
        await AuthPage.clickLoginMainButton();
        await AuthPage.clickSignUpContainerButton();
    })

    userData.forEach((user) => {
        it(`Deve realizar o cadastro com sucesso para o e-mail: ${user.email}`, async () => {
            await AuthPage.signUp(user.email, user.password, user.confirmPassword)

            const successMessage = await AuthPage.signUpSuccessMessage.getText();
            expect(successMessage).to.equal(messages.auth.signUp.success);

            await AuthPage.clickOkButton();

        })

        it('Deve exibir erro ao tentar cadastrar sem informar o e-mail', async () => {
            await AuthPage.clickLoginMainButton();
            await AuthPage.clickSignUpContainerButton();
            await AuthPage.signUp('', user.password, user.confirmPassword);
    
            const isEmailError = await AuthPage.validateErrorMessage(AuthPage.emailErrorMessage, messages.auth.signUp.emailError)
            expect(isEmailError).to.be.true;
        });

        it('Deve exibir erro ao tentar cadastrar sem informar a senha', async () => {
            await AuthPage.clickLoginMainButton();
            await AuthPage.clickSignUpContainerButton();
            await AuthPage.signUp(user.email, '', user.confirmPassword);
    
            const isPasswordError = await AuthPage.validateErrorMessage(AuthPage.passwordErrorMessage, messages.auth.signUp.passwordError)
            expect(isPasswordError).to.be.true;
    
        });

        it('Deve exibir erro ao tentar cadastrar sem confirmar a senha', async () => {
            await AuthPage.clickLoginMainButton();
            await AuthPage.clickSignUpContainerButton();
            await AuthPage.signUp(user.email, user.password, '');
    
            const isConfirmPasswordError = await AuthPage.validateErrorMessage(AuthPage.confirmPasswordErrorMessage, messages.auth.signUp.confirmPasswordError)
            expect(isConfirmPasswordError).to.be.true;
        });


    })

    it('Deve exibir erros ao tentar cadastrar sem preencher nenhum campo', async () => {
        await AuthPage.clickLoginMainButton();
        await AuthPage.clickSignUpContainerButton();
        await AuthPage.signUp('', '', '');

        const errors = [
            { element: AuthPage.emailErrorMessage, message: messages.auth.signUp.emailError },
            { element: AuthPage.passwordErrorMessage, message: messages.auth.signUp.passwordError },
            { element: AuthPage.confirmPasswordErrorMessage, message: messages.auth.signUp.confirmPasswordError }
        ];


        for (const error of errors) {
            const isErrorVisible = await AuthPage.validateErrorMessage(error.element, error.message);
            expect(isErrorVisible).to.be.true;
        }
    })
})