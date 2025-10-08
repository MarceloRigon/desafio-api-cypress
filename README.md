# 🧪 Automação de API com Cypress

Este projeto contém uma suíte de testes automatizados desenvolvida com **Cypress**, voltada para validação de endpoints de API, autenticação e manipulação de usuários e produtos.

---

## 🚀 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) – Framework de testes de front-end e API
- [Node.js](https://nodejs.org/) – Ambiente de execução JavaScript
- [Jenkins](https://www.jenkins.io/) – Integração e entrega contínua (CI/CD)

---

## 📁 Estrutura do Projeto

```
cypress/
├── config/                # Configurações e dados de ambiente
│   ├── endpoints.js
│   └── testData.js
├── e2e/                   # Testes principais
│   ├── auth/
│   │   └── login.cy.js
│   ├── products/
│   │   └── createProduct.cy.js
│   └── users/
│       ├── getUserById.cy.js
│       └── getUsers.cy.js
├── fixtures/              # Schemas e dados mockados
│   ├── createProductSchema.json
│   ├── loginSchema.json
│   ├── testData.json
│   ├── userByIdSchema.json
│   └── usersSchema.json
└── logs/        
└── reports/     
└── screenshots/
│             
└── support/               # Comandos e serviços auxiliares
    ├── api/
    │   ├── authService.js
    │   └── userService.js
    ├── helpers/
    │   ├── hashGenerator.js
    │   ├── jwtValidator.js
    │   ├── logger.js
    │   └── schemaValidator.js
    ├── commands.js
    └── e2e.js

cypress.config.js           # Configuração principal do Cypress
cypress.exemplo.env.json    # Variáveis de ambiente (exemplo)
packege.json                # Dependências do projeto
packege-lock.json           # Dependências do projeto
Jenkinsfile                 # Pipeline
```

---

## ⚙️ Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/MarceloRigon/desafio-api-cypress.git
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure variáveis de ambiente**

Crie um arquivo `cypress.env.json` baseado em `cypress.env.example.json` e insira suas credenciais e endpoints reais.

---
### ⚙️ Suporte Opcional ao MD5

O projeto possui suporte opcional para autenticação via **hash MD5 dinâmico**, implementado no serviço `AuthService` apenas para fins didáticos ou para uso em futuros backends que exijam esse tipo de validação.

Você pode ativar o modo MD5 ajustando no arquivo `cypress.env.json`:

```json
"USE_MD5": true
```

> 🔒 **Atenção:** este modo **não deve ser usado com o DummyJSON**, pois o servidor **não reconhece campos de hash** no corpo da requisição.

---

### 🚫 Por que o MD5 não pode ser utilizado com o DummyJSON

O endpoint `/auth/login` do DummyJSON foi projetado para receber apenas `username` e `password`.  
Quando o modo MD5 é ativado, o cliente envia um corpo diferente, como:

```json
{
  "username": "usuario_teste",
  "timestamp": 1234567890,
  "hash": "9a761gd76gfha761ha..."
}
```

Como o backend **não reconhece os campos `timestamp` ou `hash`**, a API retorna o seguinte erro:

```
Response: 400 Bad Request
{
  "message": "Invalid credentials" 
}
```

Ou no log do Cypress:

```
request POST 400 /auth/login
expected 400 to be one of [200, 201]
```

Esse erro confirma que o DummyJSON **não valida hashes MD5** nem aceita autenticação assinada.  
Por isso, o valor padrão da flag foi mantido como:

```json
"USE_MD5": false
```

para que os testes utilizem a autenticação padrão suportada oficialmente.

---

### 🧩 Conclusão

- O projeto suporta **dois modos de autenticação**:  
  🔸 *Padrão* — via `username` e `password` (ativo por padrão)  
  🔸 *Opcional* — via `MD5` (para uso com outros backends, desativado por padrão)  

- Ao utilizar o DummyJSON, **sempre mantenha `"USE_MD5": false`**.  
- O erro `400 Bad Request` ocorre porque o backend **não reconhece o formato de login com hash**.

---

## ▶️ Execução dos Testes

### Modo interativo (Cypress GUI)
```bash
npx cypress open
```

### Modo headless (para CI/CD)
```bash
npx cypress run
```

Por padrão, os relatórios de execução serão exibidos no terminal e também na pasta reports, logs e screenshots.

---

## 🔄 Integração Contínua (Jenkins)

O arquivo `Jenkinsfile` define uma pipeline para build, instalação de dependências e execução automatizada dos testes.

---

