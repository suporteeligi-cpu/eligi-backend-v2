type EventHandler = (payload: any) => Promise<void>;

class EventBus {
  private events: Record<string, EventHandler[]> = {};

  on(event: string, handler: EventHandler) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(handler);
  }

  async emit(event: string, payload: any) {
    const handlers = this.events[event] || [];
    for (const h of handlers) await h(payload);
  }
}

export const eventBus = new EventBus();
