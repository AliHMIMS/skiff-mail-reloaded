// Node globals for the search web workers, which are bundled separately from the app entry.
import { Buffer } from 'buffer';

const g = globalThis as unknown as Record<string, unknown>;
g.Buffer ??= Buffer;
g.global ??= globalThis;
