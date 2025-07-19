import closeConversationState from "../resources/Conversation Resource/closeConversationState";
import sendMessage from "../resources/Message Resource/sendMessage";
import fetchAllActiveConversations from "../resources/Participant Conversation Resource/fetchAllActiveConversations";
import { TwilioResource, TwilioResourceAction } from "../types";
import { InputUtils } from "./inputUtils";

/**
 * Gerenciador de recursos da Twilio organizados por diretórios
 *
 * Para adicionar novos recursos da Twilio:
 * 1. Crie o arquivo do recurso em src/resources/[Nome do Recurso]/
 * 2. Adicione o recurso e suas ações neste array RESOURCES
 * 3. O sistema automaticamente organizará por diretórios
 */
export class TwilioResourceManager {
  private static readonly RESOURCES: TwilioResource[] = [
    {
      name: "Conversation Resource",
      description:
        "Gerenciamento de conversas da Twilio - Criar, atualizar e gerenciar conversas",
      actions: [
        {
          name: "Fechar estado de uma conversa",
          description:
            "Fecha o estado de uma conversa específica com base no SID",
          action: async () => {
            const inputs = await InputUtils.promptMultipleInputs([
              {
                message: "Ambiente de configuração (ex: prd, hml):",
                key: "env",
              },
              { message: "SID da conversa:", key: "sid" },
            ]);
            await closeConversationState(inputs.env, inputs.sid);
          },
        },
        // Futuras ações podem ser adicionadas aqui:
        // - Criar nova conversa
        // - Listar todas as conversas
        // - Atualizar metadados da conversa
        // - Excluir conversa
      ],
    },
    {
      name: "Participant Conversation Resource",
      description:
        "Gerenciamento de participantes em conversas - Adicionar, remover e gerenciar participantes",
      actions: [
        {
          name: "Buscar conversas ativas de um participante",
          description:
            "Busca todas as conversas ativas de um participante específico",
          action: async () => {
            const inputs = await InputUtils.promptMultipleInputs([
              {
                message: "Ambiente de configuração (ex: prd, hml):",
                key: "env",
              },
              {
                message: "Endereço do participante (ex: WhatsApp number):",
                key: "address",
              },
            ]);
            await fetchAllActiveConversations(inputs.env, inputs.address);
          },
        },
        // Futuras ações podem ser adicionadas aqui:
        // - Adicionar participante à conversa
        // - Remover participante da conversa
        // - Listar todos os participantes
        // - Atualizar atributos do participante
      ],
    },
    {
      name: "Message Resource",
      description:
        "Gerenciamento de mensagens - Enviar, listar e gerenciar mensagens",
      actions: [
        {
          name: "Enviar mensagem WhatsApp",
          description: "Envia uma mensagem WhatsApp para um número específico",
          action: async () => {
            const inputs = await InputUtils.promptMultipleInputs([
              {
                message: "Ambiente de configuração (ex: prd, hml):",
                key: "env",
              },
              { message: "Número de destino (ex: 5511999999999):", key: "to" },
              { message: "Número de origem (ex: 5511888888888):", key: "from" },
              { message: "Conteúdo da mensagem:", key: "message" },
            ]);
            await sendMessage(
              inputs.env,
              inputs.to,
              inputs.from,
              inputs.message
            );
          },
        },
        // Futuras ações podem ser adicionadas aqui:
        // - Listar mensagens
        // - Buscar mensagem por SID
        // - Atualizar mensagem
        // - Excluir mensagem
      ],
    },
    // Futuros recursos podem ser adicionados aqui:
    // {
    //   name: "Webhook Resource",
    //   description: "Gerenciamento de webhooks - Configurar e gerenciar webhooks",
    //   actions: [...]
    // },
    // {
    //   name: "Service Resource",
    //   description: "Gerenciamento de serviços - Criar e gerenciar serviços",
    //   actions: [...]
    // }
  ];

  /**
   * Obtém todos os recursos disponíveis
   */
  static getResources(): TwilioResource[] {
    return this.RESOURCES;
  }

  /**
   * Obtém um recurso específico pelo nome
   */
  static getResource(resourceName: string): TwilioResource | undefined {
    return this.RESOURCES.find((resource) => resource.name === resourceName);
  }

  /**
   * Obtém todas as ações de um recurso específico
   */
  static getResourceActions(resourceName: string): TwilioResourceAction[] {
    const resource = this.getResource(resourceName);
    return resource ? resource.actions : [];
  }

  /**
   * Lista todos os nomes dos recursos disponíveis
   */
  static getResourceNames(): string[] {
    return this.RESOURCES.map((resource) => resource.name);
  }

  /**
   * Verifica se um recurso existe
   */
  static resourceExists(resourceName: string): boolean {
    return this.RESOURCES.some((resource) => resource.name === resourceName);
  }

  /**
   * Adiciona um novo recurso dinamicamente (para uso futuro)
   */
  static addResource(resource: TwilioResource): void {
    if (!this.resourceExists(resource.name)) {
      this.RESOURCES.push(resource);
    }
  }

  /**
   * Remove um recurso (para uso futuro)
   */
  static removeResource(resourceName: string): void {
    const index = this.RESOURCES.findIndex(
      (resource) => resource.name === resourceName
    );
    if (index !== -1) {
      this.RESOURCES.splice(index, 1);
    }
  }
}
