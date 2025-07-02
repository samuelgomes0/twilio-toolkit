# Twilio Utils

Um conjunto de funções utilitárias para facilitar a integração com a API da Twilio.

## 📌 Descrição

Este repositório reúne scripts e helpers que automatizam tarefas comuns com a Twilio API, como:

- Fechar o estado de uma conversa.
- Listar conversas ativas.
- Gerenciar participantes.
- Outros recursos customizados conforme necessidade.

## 🚀 Estrutura

```
src/
 ├── config/            # Configurações e credenciais de ambiente
 │   ├── getTwilioClient.ts
 │   ├── prd.json
 │   └── hml.json
 ├── Conversation Resource/
 │   └── closeConversationState.ts
 ├── Participant Conversation Resource/
 │   └── fetchAllActiveConversations.ts
```

## ⚙️ Pré-requisitos

- Node.js >= 18
- TypeScript >= 4.x
- Conta Twilio configurada
- Variáveis de ambiente para autenticação
- Instalar o `ts-node` globalmente para uso com o [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) no VSCode:

```bash
npm install -g ts-node
```

## 📁 Configuração de ambientes

Para cada ambiente (`prd`, `hml` etc.), crie um arquivo JSON com o mesmo nome dentro da pasta `config/`:

Exemplo para ambiente de produção:

```json
// config/prd.json
{
  "accountSid": "ACXXXXXXXXXXXXXXXX",
  "authToken": "XXXXXXXXXXXXXXXX"
}
```

## 🏃 Como usar

1. Instale as dependências:

```bash
npm install
```

2. Instale o `ts-node` globalmente, se ainda não o fez:

```bash
npm install -g ts-node
```

2. Configure suas credenciais no diretório `config/`.

> 💡 Com o `ts-node` global, você também pode rodar os arquivos `.ts` diretamente com o Code Runner.

## 📄 Licença

MIT License.

---

Mantenha simples. Automatize tarefas repetitivas. Tenha controle sobre suas conversas Twilio.

**Desenvolvido por Samuel Gomes Rosa**
