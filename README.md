# Twilio Toolkit CLI

Utilitários CLI para gerenciar conversas na Twilio de forma modular e organizada.

## 🏗️ Estrutura do Projeto

```
src/
├── cli.ts                          # Ponto de entrada principal
├── cli/
│   └── commandManager.ts           # Gerenciador de comandos CLI
├── commands/                       # Comandos CLI individuais
│   ├── index.ts
│   ├── configureEnvCommand.ts
│   ├── listEnvsCommand.ts
│   ├── fetchAllActiveConversationsCommand.ts
│   └── closeConversationStateCommand.ts
├── config/                         # Configuração de ambientes
│   ├── getTwilioClient.ts
│   ├── listEnvironments.ts
│   └── setupEnvironment.ts
├── resources/                      # Recursos da Twilio
│   ├── Conversation Resource/
│   │   └── closeConversationState.ts
│   └── Participant Conversation Resource/
│       └── fetchAllActiveConversations.ts
├── ui/                            # Interface do usuário
│   └── interactiveMenu.ts
├── utils/                         # Utilitários
│   └── inputHelper.ts
└── types/                         # Definições de tipos
    └── index.ts
```

## 🚀 Como Usar

### Modo Interativo

Execute sem argumentos para iniciar o menu interativo:

```bash
npm start
```

### Modo CLI

Execute com argumentos para usar comandos específicos:

```bash
# Configurar ambiente
npm start configure-env --env prd --accountSid AC123 --authToken token123

# Listar ambientes
npm start list-envs

# Buscar conversas ativas
npm start fetch-all-active-conversations --env prd --address whatsapp:+5511999999999

# Fechar estado de conversa
npm start close-conversation-state --env prd --sid CH123456789
```

## 📦 Módulos Principais

### 1. CommandManager (`src/cli/commandManager.ts`)

- Gerencia todos os comandos CLI
- Configura o programa principal
- Registra comandos automaticamente

### 2. Commands (`src/commands/`)

- Cada comando em arquivo separado
- Fácil manutenção e extensão
- Reutilização de código

### 3. InteractiveMenu (`src/ui/interactiveMenu.ts`)

- Interface interativa para usuários
- Menu com opções numeradas
- Validação de entrada

### 4. InputHelper (`src/utils/inputHelper.ts`)

- Utilitários para entrada de dados
- Validação de campos obrigatórios
- Mensagens padronizadas

### 5. Types (`src/types/index.ts`)

- Definições de tipos TypeScript
- Interfaces reutilizáveis
- Melhor tipagem

## 🔧 Desenvolvimento

### Adicionando Novos Comandos

1. Crie um novo arquivo em `src/commands/`
2. Implemente a função do comando
3. Registre no `CommandManager`
4. Adicione ao menu interativo se necessário

### Exemplo de Novo Comando:

```typescript
// src/commands/novoComando.ts
import { Command } from "commander";
import { InputHelper } from "../utils/inputHelper";

export default function novoComando(program: Command) {
  program
    .command("novo-comando")
    .description("Descrição do novo comando")
    .action(async () => {
      const input = await InputHelper.promptRequiredInput("Digite algo:");
      // Lógica do comando
    });
}
```

## 🎯 Benefícios da Nova Estrutura

1. **Modularidade**: Cada funcionalidade em arquivo separado
2. **Manutenibilidade**: Código mais fácil de manter e debugar
3. **Extensibilidade**: Fácil adicionar novos comandos
4. **Reutilização**: Utilitários compartilhados
5. **Tipagem**: Melhor suporte TypeScript
6. **Organização**: Estrutura clara e lógica

## 📝 Licença

MIT License
