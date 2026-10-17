// Node globals some app code and dependencies expect (webpack's ProvidePlugin used to inject these).
// Imported first by index.tsx so it runs before any other module.
import { Buffer } from 'buffer';
import process from 'process';

const g = globalThis as unknown as Record<string, unknown>;
g.Buffer ??= Buffer;
g.process ??= process;
g.global ??= globalThis;
