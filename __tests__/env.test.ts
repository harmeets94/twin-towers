import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('env', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns parsed env when all required vars are set', async () => {
    process.env.RESEND_API_KEY = 're_test';
    process.env.CONTACT_FROM_EMAIL = 'Enquiries <a@b.com>';
    process.env.CONTACT_TO_EMAIL = 'sales@b.com';
    const { env } = await import('../lib/env');
    expect(env.RESEND_API_KEY).toBe('re_test');
    expect(env.CONTACT_FROM_EMAIL).toBe('Enquiries <a@b.com>');
    expect(env.CONTACT_TO_EMAIL).toBe('sales@b.com');
  });

  it('throws with a clear message when RESEND_API_KEY is missing', async () => {
    delete process.env.RESEND_API_KEY;
    process.env.CONTACT_FROM_EMAIL = 'a@b.com';
    process.env.CONTACT_TO_EMAIL = 'c@d.com';
    await expect(import('../lib/env')).rejects.toThrow(/RESEND_API_KEY/);
  });

  it('throws when CONTACT_FROM_EMAIL is missing', async () => {
    process.env.RESEND_API_KEY = 're_test';
    delete process.env.CONTACT_FROM_EMAIL;
    process.env.CONTACT_TO_EMAIL = 'c@d.com';
    await expect(import('../lib/env')).rejects.toThrow(/CONTACT_FROM_EMAIL/);
  });

  it('throws when CONTACT_TO_EMAIL is missing', async () => {
    process.env.RESEND_API_KEY = 're_test';
    process.env.CONTACT_FROM_EMAIL = 'a@b.com';
    delete process.env.CONTACT_TO_EMAIL;
    await expect(import('../lib/env')).rejects.toThrow(/CONTACT_TO_EMAIL/);
  });
});