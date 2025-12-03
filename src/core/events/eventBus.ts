import { EventEmitter } from "events";

export const eventBus = new EventEmitter();

// exemplo:
// eventBus.on("user.created", (data) => console.log("Novo usuário:", data));
