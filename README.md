# Twilio Toolkit

Um conjunto de utilitários e uma CLI para facilitar a integração com a API da Twilio.

## 📌 Descrição

Scripts e comandos para automatizar tarefas comuns com a Twilio API, como:

- Fechar o estado de uma conversa.
- Listar conversas ativas de um participante.
- Gerenciar múltiplos ambientes de forma organizada.

Este projeto é modular e poderá conter mais códigos no futuro.

## 🚀 Estrutura básica

```
src/
 ├── config/                      # Configurações de ambientes
 ├── Conversation Resource/       # Funções para gerenciar conversas
 ├── Participant Conversation Resource/ # Funções para participantes
 ├── cli.ts                       # CLI principal
```

## ⚙️ Pré-requisitos

- Node.js >= 18
- TypeScript >= 4.x
- Conta Twilio ativa
- `ts-node` global para rodar via [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)

```bash
npm install -g ts-node
```

## 📁 Configuração de ambientes

Os ambientes são salvos em `~/.twilio-toolkit/`:

Exemplo:

```json
{
  "accountSid": "ACXXXXXXXXXXXXXXXX",
  "authToken": "XXXXXXXXXXXXXXXX"
}
```

Crie ou atualize usando:

```bash
twilio-toolkit configure-env --env prd --accountSid ACXXXX --authToken XXXX
```

## 🏃 Uso básico

- Configure as credenciais com `configure-env`.
- Liste ambientes configurados com `list-envs`.
- Execute comandos conforme sua necessidade, usando argumentos ou flags.

## 📄 Licença

MIT License.

---

Mantenha simples. Automatize tarefas repetitivas. Controle suas conversas Twilio.

**Desenvolvido por Samuel Gomes Rosa**
