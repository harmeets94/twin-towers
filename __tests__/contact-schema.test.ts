import { describe, it, expect } from 'vitest';
import { contactSchema } from '../lib/contact-schema';

describe('contactSchema', () => {
  const valid = {
    name: 'Jane Doe',
    phone: '+91 94789 97378',
    email: 'jane@example.com',
    message: 'Interested in 4 BHK',
  };

  it('accepts a valid input', () => {
    const r = contactSchema.safeParse(valid);
    expect(r.success).toBe(true);
  });

  it('rejects a name shorter than 2 chars', () => {
    const r = contactSchema.safeParse({ ...valid, name: 'J' });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path[0] === 'name')).toBe(true);
    }
  });

  it('rejects an invalid email', () => {
    const r = contactSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path[0] === 'email')).toBe(true);
    }
  });

  it('rejects a phone with letters', () => {
    const r = contactSchema.safeParse({ ...valid, phone: 'abcdefgh' });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path[0] === 'phone')).toBe(true);
    }
  });

  it('trims whitespace from name and accepts it', () => {
    const r = contactSchema.safeParse({ ...valid, name: '  Jane Doe  ' });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.name).toBe('Jane Doe');
  });

  it('rejects a whitespace-only name', () => {
    const r = contactSchema.safeParse({ ...valid, name: '   ' });
    expect(r.success).toBe(false);
  });

  it('accepts an empty message (floating form variant)', () => {
    const r = contactSchema.safeParse({ ...valid, message: '' });
    expect(r.success).toBe(true);
  });

  it('accepts a missing message (compact form posts without it)', () => {
    const { message: _omit, ...rest } = valid;
    const r = contactSchema.safeParse(rest);
    expect(r.success).toBe(true);
  });
});