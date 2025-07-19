# Twilio Toolkit CLI

Uma ferramenta CLI completa para gerenciar recursos da Twilio de forma organizada e eficiente.

## 🚀 Funcionalidades

### 🔧 Recursos da Twilio

O sistema organiza todos os recursos da Twilio por diretórios, facilitando a navegação e manutenção:

#### **Conversation Resource**

- **Fechar estado de uma conversa**: Fecha o estado de uma conversa específica com base no SID

#### **Participant Conversation Resource**

- **Buscar conversas ativas de um participante**: Busca todas as conversas ativas de um participante específico

#### **Message Resource**

- **Enviar mensagem WhatsApp**: Envia uma mensagem WhatsApp para um número específico

### ⚙️ Configuração

- **Configurar ambiente**: Cria ou atualiza arquivos de configuração de ambiente
- **Listar ambientes**: Lista todos os ambientes configurados

## 📦 Instalação

```bash
npm install
npm run build
```

## 🎯 Uso

### Modo Interativo

```bash
npm start
```

### Modo CLI

```bash
# Configurar ambiente
npm start configure-env --env prd --accountSid AC123... --authToken abc123...

# Listar ambientes
npm start list-envs

# Fechar estado de conversa
npm start close-conversation-state --env prd --sid CH123...

# Buscar conversas ativas
npm start fetch-all-active-conversations --env prd --address 5511999999999

# Enviar mensagem WhatsApp
npm start send-message --env prd --to 5511999999999 --from 5511888888888 --message "Olá!"
```

## 🏗️ Estrutura do Projeto

```
src/
├── resources/                    # Recursos da Twilio organizados por diretórios
│   ├── Conversation Resource/    # Gerenciamento de conversas
│   ├── Participant Conversation Resource/  # Gerenciamento de participantes
│   └── Message Resource/        # Gerenciamento de mensagens
├── utils/                       # Utilitários centralizados
│   ├── inputUtils.ts           # Captura de inputs
│   ├── configUtils.ts          # Gerenciamento de configurações
│   ├── errorHandler.ts         # Tratamento de erros
│   └── twilioResourceManager.ts # Gerenciador de recursos
├── config/                      # Configurações
├── commands/                    # Comandos CLI
├── types/                       # Tipos TypeScript
└── ui/                         # Interface do usuário
```

## 🔧 Adicionando Novos Recursos

Para adicionar um novo recurso da Twilio:

1. **Crie o diretório do recurso**:

   ```
   src/resources/[Nome do Recurso]/
   ```

2. **Implemente as funções do recurso**:

   ```typescript
   // src/resources/Novo Resource/novoRecurso.ts
   import getTwilioClient from "../../config/getTwilioClient";
   import { ErrorHandler } from "../../utils/errorHandler";

   export async function novoRecurso(env: string, param: string) {
     try {
       const client = getTwilioClient(env);
       // Implementação do recurso
     } catch (error) {
       ErrorHandler.handleApiError(error, "executar novo recurso");
     }
   }
   ```

3. **Adicione ao TwilioResourceManager**:

   ```typescript
   // src/utils/twilioResourceManager.ts
   import novoRecurso from "../resources/Novo Resource/novoRecurso";

   {
     name: "Novo Resource",
     description: "Descrição do novo recurso",
     actions: [
       {
         name: "Nova Ação",
         description: "Descrição da ação",
         action: async () => {
           const inputs = await InputUtils.promptMultipleInputs([
             { message: "Parâmetro:", key: "param" }
           ]);
           await novoRecurso(inputs.env, inputs.param);
         }
       }
     ]
   }
   ```

## 🎨 Características

- **Organização por Diretórios**: Recursos organizados por tipo de funcionalidade
- **Interface Intuitiva**: Menu interativo com navegação clara
- **Tratamento de Erros**: Sistema robusto de tratamento de erros
- **Configuração Flexível**: Suporte a múltiplos ambientes
- **Escalabilidade**: Fácil adição de novos recursos
- **TypeScript**: Tipagem completa para melhor desenvolvimento

## 🔒 Segurança

- Configurações salvas no diretório do usuário (`~/.twilio-toolkit/`)
- Dados sensíveis não são expostos no código
- Validação de inputs obrigatórios

## 📝 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.
