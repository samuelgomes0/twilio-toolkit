export interface EnvironmentConfig {
  accountSid: string;
  authToken: string;
}

export interface Conversation {
  sid: string;
  friendlyName?: string;
  dateCreated: string;
  dateUpdated: string;
  state: string;
}

export interface Participant {
  sid: string;
  identity?: string;
  messagingBinding?: {
    address: string;
    proxyAddress?: string;
  };
}

export interface MenuOption {
  label: string;
  action: () => Promise<void>;
  category?: MenuCategory;
}

export enum MenuCategory {
  CONFIGURATION = "⚙️  Configuração",
  TWILIO_RESOURCES = "🔧 Recursos da Twilio",
}

export interface MenuCategoryConfig {
  title: string;
  options: MenuOption[];
  icon: string;
}

export interface MainMenuOption {
  label: string;
  category: MenuCategory;
  icon: string;
}

export interface CommandOptions {
  env?: string;
  accountSid?: string;
  authToken?: string;
  address?: string;
  sid?: string;
}

export interface TwilioResource {
  name: string;
  description: string;
  actions: TwilioResourceAction[];
}

export interface TwilioResourceAction {
  name: string;
  description: string;
  action: () => Promise<void>;
}
