export interface Cancellable {
  cancel(): void;
}

export interface Sendable extends Cancellable {
  send(mesasge: Uint8Array): void;
}