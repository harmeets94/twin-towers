import { describe, it, expect } from 'vitest';
import { escapeHtml } from '../lib/escape-html';

describe('escapeHtml', () => {
  it('escapes <, >, &, ", and \'', () => {
    expect(escapeHtml(`<script>alert("xss&'")</script>`)).toBe(
      '&lt;script&gt;alert(&quot;xss&amp;&#39;&quot;)&lt;/script&gt;',
    );
  });

  it('leaves safe strings alone', () => {
    expect(escapeHtml('Hello, world!')).toBe('Hello, world!');
  });

  it('returns an empty string for empty input', () => {
    expect(escapeHtml('')).toBe('');
  });
});