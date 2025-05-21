// src/events.ts
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { EventEmitter } from 'events'

const emitter = new EventEmitter()
export default emitter
