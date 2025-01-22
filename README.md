# Observação sobre os testes

Durante a execução dos testes no BrowserStack, não consegui enviar nem uma versão mais antiga do `native-demo-app` com o arquivo `.ipa` para validar os locators do iOS. Diante dessa limitação, pesquisei uma solução alternativa e encontrei a estratégia de locators para aplicativos nativos no repositório [Locator strategy for native apps](https://github.com/webdriverio/appium-boilerplate).

Essa estratégia foi aplicada ao código de testes, pois não foi possível simular o iOS diretamente. O trecho de código abaixo exemplifica como a estratégia foi utilizada para gerenciar os locators dependendo da plataforma:

```javascript
const SELECTORS = {
    WEB_VIEW_SCREEN: browser.isAndroid
        ? '*//android.webkit.WebView'
        : '*//XCUIElementTypeWebView',
};
```

# Projeto de Testes de UI e Funcionais para Aplicativos Móveis

Este projeto utiliza o WebDriverIO para testes automatizados de UI e funcionalidades para aplicativos móveis Android e iOS, com integração ao BrowserStack para execução em dispositivos reais na nuvem, além de execução local com Appium.

## Tecnologias Utilizadas

- **WebDriverIO**: Framework para automação de testes.
- **Appium**: Framework de automação de testes para aplicativos móveis nativos.
- **Mocha**: Framework de teste para JavaScript.
- **Chai**: Biblioteca de asserções.
- **BrowserStack**: Plataforma de teste na nuvem para dispositivos reais.

## Requisitos

Antes de rodar os testes, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (recomenda-se a versão LTS mais recente).
- **NPM** (gerenciador de pacotes do Node.js).
- **Appium** (para execução de testes localmente em dispositivos Android e iOS).
- **Conta do BrowserStack** (para execução dos testes na nuvem, caso deseje usar o BrowserStack).

## Configuração do Ambiente

### Instalação das Dependências

1. Clone este repositório:
   ```bash
   git clone <url_do_repositorio>
   cd <diretorio_do_repositorio>
   ```

## Instalação e Configuração

### Instale as dependências necessárias

Execute o seguinte comando para instalar as dependências do projeto:

```bash
npm install
```

## Configuração do BrowserStack

Para rodar os testes no **BrowserStack**, você deve configurar suas credenciais de acesso (usuário e chave de acesso):

1. Obtenha o seu **BrowserStack Username** e **Access Key**.
2. Defina as variáveis de ambiente `BROWSERSTACK_USERNAME` e `BROWSERSTACK_ACCESS_KEY` com suas credenciais:

```bash
export BROWSERSTACK_USERNAME=<seu_username>
export BROWSERSTACK_ACCESS_KEY=<sua_access_key>
```

3. **Configuração do App no BrowserStack:**
   - **Android**: No arquivo `browserStack.wdio.conf.js`, substitua o valor de `app` pelo ID do seu app Android no BrowserStack:
      ```js
      "app": "bs://<APP_ID>", // Substitua <APP_ID> pelo ID do app Android no BrowserStack
      ```
   
   - **iOS**: No arquivo `browserStack.wdio.conf.js`, substitua o valor de `app` pelo ID do seu app iOS no BrowserStack:
      ```js
      "app": "bs://<APP_ID>", // Substitua <APP_ID> pelo ID do app iOS no BrowserStack
      ```

## Configuração do Appium para Execução Local

Se você deseja rodar os testes localmente em dispositivos físicos ou emuladores, configure o **Appium** para se comunicar com esses dispositivos:

1. Instale o **Appium** globalmente:

```bash
npm install -g appium
```
2. Certifique-se de que o Appium está corretamente configurado para Android e iOS. Caso necessário, consulte a documentação do Appium para configurar o ambiente de testes móveis.

3. **Alteração do Path para os Arquivos APK e APP:**
   - **Android**: No arquivo `local-wdio.conf.js`, substitua o caminho para o seu arquivo APK:
      ```js
      "appium:app": "./path/to/native-demo-app.apk", // Substitua pelo path do seu apk
      ```

   - **iOS**: No arquivo `local-wdio.conf.js`, substitua o caminho para o seu arquivo APP:
      ```js
      "appium:app": "./path/to/native-demo-app.app", // Substitua pelo path do seu app ios
      ```

## Arquivos de Configuração

O projeto inclui dois arquivos de configuração principais, dependendo do ambiente em que você deseja executar os testes:

- **browserStack.wdio.conf.js**: Arquivo de configuração para executar os testes no **BrowserStack**.
- **local-wdio.conf.js**: Arquivo de configuração para executar os testes localmente utilizando o **Appium**.

## Execução dos Testes

### Execução no BrowserStack

Para rodar os testes no **BrowserStack**, utilize o seguinte comando:

```bash
npx wdio browserStack.wdio.conf.js
```

### Execução Local

Para rodar os testes localmente com **Appium**, utilize o seguinte comando:

```bash
npx wdio local-wdio.conf.js
```

### Execução de Testes e Geração de Relatórios

Este projeto utiliza o **Allure Reporter** para gerar relatórios detalhados dos testes realizados. Para visualizar os resultados dos testes, siga as etapas abaixo:

1. **Execute o comando para gerar os relatórios:**
    ```bash
    npx allure generate allure-results --clean
    ```

2. **Abra os relatórios gerados em um servidor local:**
    ```bash
    npx allure open
    ```

Isso abrirá um servidor local onde você poderá visualizar os relatórios dos testes realizados, com informações detalhadas sobre cada execução, incluindo o status dos testes, logs e capturas de tela.

### Testes

O projeto contém diferentes tipos de testes que validam funcionalidades essenciais do aplicativo:

- **Formulário**: Valida o preenchimento de campos, interações com switches, dropdowns e botões.
- **Login**: Testes de login de usuários com dados válidos e inválidos.
- **Cadastro (SignUp)**: Testes de cadastro de usuários com validação de campos obrigatórios.


