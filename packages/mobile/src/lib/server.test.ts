import { describe, expect, it } from 'vitest';

import { eventsUrl, normalizeServerUrl, rebaseServerLink } from './server';

describe('normalizeServerUrl', () => {
  it.each([
    ['mail.example.com', 'https://mail.example.com'],
    ['  https://mail.example.com/  ', 'https://mail.example.com'],
    ['https://mail.example.com/mail/inbox', 'https://mail.example.com'],
    ['https://mail.example.com/graphql', 'https://mail.example.com'],
    ['http://192.168.1.20:4201', 'http://192.168.1.20:4201'],
    ['HTTPS://Mail.Example.com:8443/', 'https://mail.example.com:8443'],
    ['https://example.com/skiff/mail/', 'https://example.com/skiff']
  ])('%s → %s', (input, expected) => {
    expect(normalizeServerUrl(input)).toBe(expected);
  });
});

describe('rebaseServerLink', () => {
  it("swaps the server's PUBLIC_URL for the address the app uses", () => {
    expect(rebaseServerLink('https://mail.example.com', 'http://localhost:4201/graphql/attachment/abc')).toBe(
      'https://mail.example.com/graphql/attachment/abc'
    );
  });

  it('leaves links that are not API downloads alone', () => {
    expect(rebaseServerLink('https://mail.example.com', 'https://elsewhere.org/file')).toBe(
      'https://elsewhere.org/file'
    );
  });
});

describe('eventsUrl', () => {
  it('uses the websocket scheme matching the server', () => {
    expect(eventsUrl('https://mail.example.com')).toBe('wss://mail.example.com/graphql/events');
    expect(eventsUrl('http://10.0.0.2:4201')).toBe('ws://10.0.0.2:4201/graphql/events');
  });
});
