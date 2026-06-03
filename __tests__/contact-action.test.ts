import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';

vi.mock('@/lib/resend', () => ({
  resend: { emails: { send: vi.fn() } },
}));
vi.mock('@/lib/env', () => ({
  env: {
    RESEND_API_KEY: 're_test',
    CONTACT_FROM_EMAIL: 'Enquiries <enq@marbella.example>',
    CONTACT_TO_EMAIL: 'sales@marbella.example',
  },
}));
vi.mock('@/lib/escape-html', () => ({
  escapeHtml: (input: string) => input,
}));

import { resend } from '@/lib/resend';
import { submitContact } from '@/app/actions/contact';

const sendMock = resend.emails.send as Mock;

function makeFormData(data: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) fd.append(k, v);
  return fd;
}

describe('submitContact', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('sends an email and returns success on valid input', async () => {
    sendMock.mockResolvedValue({ id: 'msg_1' });
    const fd = makeFormData({
      name: 'Jane Doe',
      phone: '+91 94789 97378',
      email: 'jane@example.com',
      message: 'Interested in 4 BHK',
    });
    const result = await submitContact({ status: 'idle' }, fd);
    expect(sendMock).toHaveBeenCalledOnce();
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'Enquiries <enq@marbella.example>',
        to: 'sales@marbella.example',
        replyTo: 'jane@example.com',
        subject: 'New Enquiry — Jane Doe',
      }),
    );
    expect(result).toEqual({ status: 'success' });
  });

  it('returns fieldErrors and does NOT send on invalid input', async () => {
    const fd = makeFormData({
      name: 'J',
      phone: 'abc',
      email: 'not-email',
      message: '',
    });
    const result = await submitContact({ status: 'idle' }, fd);
    expect(sendMock).not.toHaveBeenCalled();
    expect(result.status).toBe('error');
    if (result.status === 'error') {
      expect(result.fieldErrors?.name).toBeDefined();
      expect(result.fieldErrors?.phone).toBeDefined();
      expect(result.fieldErrors?.email).toBeDefined();
    }
  });

  it('returns a generic error when Resend throws', async () => {
    sendMock.mockRejectedValue(new Error('Resend down'));
    const fd = makeFormData({
      name: 'Jane Doe',
      phone: '+91 94789 97378',
      email: 'jane@example.com',
      message: '',
    });
    const result = await submitContact({ status: 'idle' }, fd);
    expect(result.status).toBe('error');
    if (result.status === 'error') {
      expect(result.message).toMatch(/something went wrong/i);
      expect(result.fieldErrors).toBeUndefined();
    }
  });

  it('treats a missing message field as valid (floating form variant)', async () => {
    sendMock.mockResolvedValue({ id: 'msg_1' });
    const fd = makeFormData({
      name: 'Jane Doe',
      phone: '+91 94789 97378',
      email: 'jane@example.com',
    });
    const result = await submitContact({ status: 'idle' }, fd);
    expect(sendMock).toHaveBeenCalledOnce();
    expect(result).toEqual({ status: 'success' });
  });
});