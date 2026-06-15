'use client';
import { useActionState, useState, useId } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContact, type ContactState } from '@/app/actions/contact';
import { contactSchema } from '@/lib/contact-schema';

type Props = {
  variant?: 'full' | 'compact';
};

type FieldName = 'name' | 'phone' | 'email' | 'message';

function SubmitButton({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary btn-full" disabled={pending || disabled}>
      {pending ? 'Sending…' : children}
    </button>
  );
}

/** Validate a single field by running the relevant Zod rule. */
function validateField(name: FieldName, value: string): string | null {
  // Use shape directly instead of dynamic .pick() which can fail at runtime
  const schema = contactSchema.shape[name];
  if (!schema) return null;
  const r = schema.safeParse(value);
  if (r.success) return null;
  return r.error.issues[0]?.message ?? 'Invalid';
}

const initialState: ContactState = { status: 'idle' };

export function ContactForm({ variant = 'full' }: Props) {
  const [state, formAction] = useActionState(submitContact, initialState);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Unique IDs for aria-labelledby
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const messageId = useId();

  // Compute per-field errors for touched fields
  const nameError = touched.name ? validateField('name', name) : null;
  const phoneError = touched.phone ? validateField('phone', phone) : null;
  const emailError = touched.email ? validateField('email', email) : null;

  // Check if all required fields are valid (for enabling/disabling submit)
  const isFormValid = (() => {
    const requiredFields: FieldName[] =
      variant === 'full' ? ['name', 'phone', 'email'] : ['name', 'phone'];
    const values = { name, phone, email };
    return requiredFields.every((f) => validateField(f, values[f as 'name' | 'phone' | 'email']) === null);
  })();

  // After a failed submit, mark all fields as touched so errors show immediately
  const touchAll = () => setTouched({ name: true, phone: true, email: true });

  const handleChange = (field: FieldName, value: string) => {
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'message':
        setMessage(value);
        break;
    }
  };

  if (state.status === 'success') {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <h3>Thank you!</h3>
        <p>Our team will contact you within 24 hours.</p>
      </div>
    );
  }

  const fieldError = (key: 'name' | 'phone' | 'email') =>
    state.status === 'error' ? state.fieldErrors?.[key] : undefined;

  const getShowError = (field: FieldName, clientError: string | null) => {
    const serverError =
      field === 'message' ? undefined : fieldError(field as 'name' | 'phone' | 'email');
    return clientError || serverError;
  };

  const nameErrorMsg = getShowError('name', nameError);
  const phoneErrorMsg = getShowError('phone', phoneError);
  const emailErrorMsg = getShowError('email', emailError);

  return (
    <form
      action={formAction}
      className="contact-form"
      noValidate
      onSubmit={() => {
        if (state.status === 'error') touchAll();
      }}
    >
      {variant === 'full' && <h3>Get In Touch</h3>}

      {state.status === 'error' && (
        <div className="form-error-banner" role="alert">
          {state.message}
        </div>
      )}

      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          aria-invalid={Boolean(nameErrorMsg)}
          aria-describedby={nameErrorMsg ? nameId : undefined}
        />
        {nameErrorMsg && (
          <p id={nameId} className="field-error" role="alert">
            {nameErrorMsg}
          </p>
        )}
      </div>

      <div className="form-group">
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          aria-invalid={Boolean(phoneErrorMsg)}
          aria-describedby={phoneErrorMsg ? phoneId : undefined}
        />
        {phoneErrorMsg && (
          <p id={phoneId} className="field-error" role="alert">
            {phoneErrorMsg}
          </p>
        )}
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required={variant === 'full'}
          value={email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          aria-invalid={Boolean(emailErrorMsg)}
          aria-describedby={emailErrorMsg ? emailId : undefined}
        />
        {emailErrorMsg && (
          <p id={emailId} className="field-error" role="alert">
            {emailErrorMsg}
          </p>
        )}
      </div>

      {variant === 'full' && (
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            maxLength={2000}
            value={message}
            onChange={(e) => handleChange('message', e.target.value)}
            aria-describedby={messageId}
          />
          <p id={messageId} className="field-counter">
            {message.length}/2000
          </p>
        </div>
      )}

      <SubmitButton disabled={!isFormValid}>
        {variant === 'compact' ? 'Get Callback' : 'Submit Now'}
      </SubmitButton>
      {variant === 'full' && (
        <p className="form-note">Our team will contact you within 24 hours</p>
      )}
    </form>
  );
}
