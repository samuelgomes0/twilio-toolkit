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
}

export interface CommandOptions {
  env?: string;
  accountSid?: string;
  authToken?: string;
  address?: string;
  sid?: string;
}
