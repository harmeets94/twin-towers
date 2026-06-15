import { SectionLabel } from '@/components/ui/SectionLabel';
import { ContactForm } from '@/components/islands/ContactForm';
import { Icon } from '@/components/ui/Icon';

const contactItems = [
  {
    icon: 'mapPin' as const,
    title: 'Address',
    content: 'New Chandigarh, Mullanpur',
    type: 'text' as const,
  },
  {
    icon: 'phone' as const,
    title: 'Phone',
    content: ['+91-9478997378', '+91-8699805332'],
    type: 'tel' as const,
  },
  {
    icon: 'mail' as const,
    title: 'Email',
    content: 'hvproperties26@gmail.com',
    type: 'email' as const,
  },
];

export function Contact() {
  return (
    <section className="contact section-padding bg-dark" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info-section">
            <SectionLabel variant="light">Contact Us</SectionLabel>
            <h2 className="section-title light">Do you have any question?</h2>
            <p className="contact-desc">
              Experience luxury living at Marbella Twin Towers. Contact us today to learn more or
              schedule a visit. Your dream home awaits!
            </p>
            <div className="contact-details">
              {contactItems.map((item) => (
                <div className="contact-item" key={item.title}>
                  <div className="contact-icon">
                    <Icon name={item.icon} size={24} aria-hidden />
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    {Array.isArray(item.content) ? (
                      item.content.map((phone) => (
                        <p key={phone}>
                          <a href={`${item.type}:${phone.replace(/-/g, '')}`}>{phone}</a>
                        </p>
                      ))
                    ) : item.type === 'email' ? (
                      <p>
                        <a href={`mailto:${item.content}`}>{item.content}</a>
                      </p>
                    ) : (
                      <p>{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="contact-form-section">
            <ContactForm variant="full" />
          </div>
        </div>
      </div>
    </section>
  );
}
