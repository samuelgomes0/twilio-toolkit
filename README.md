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

## 🤝 Como colaborar

Contribuições são bem-vindas! Para ajudar a manter a qualidade do projeto:

1. **Faça um fork** do repositório e crie um branch com sua feature ou correção.
2. **Siga o padrão de organização**: cada recurso ou helper deve ser modular e reutilizável.
3. **Use mensagens de commit claras e descritivas.**
4. **Abra um Pull Request (PR)** com uma descrição objetiva do que foi adicionado ou alterado.
5. Sempre que possível, **explique por que sua mudança é útil para outros usuários.**

💡 **Dica:** Antes de propor mudanças grandes, abra uma _issue_ para discutir ideias ou melhorias!

## 📄 Licença

MIT License.

---

Mantenha simples. Automatize tarefas repetitivas. Controle suas conversas Twilio.

**Desenvolvido por Samuel Gomes Rosa**
