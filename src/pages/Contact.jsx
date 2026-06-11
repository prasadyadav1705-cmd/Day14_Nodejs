import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      validationErrors.email = 'Please enter your email address.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      validationErrors.message = 'Please enter your message.';
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      await response.json();
      setSubmitted(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error:', error);
      alert('Server connection failed!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', padding: '60px 24px', color: '#e6f1ff', backgroundColor: '#090b13' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <h1 style={{ color: '#64ffda', marginBottom: '12px' }}>Contact</h1>
        <p style={{ color: '#a8b2d8', marginBottom: '24px' }}>
          Send us a message and we will get back to you shortly.
        </p>

        {submitted && (
          <div style={{ marginBottom: '24px', padding: '18px', backgroundColor: '#112240', borderRadius: '12px', border: '1px solid #64ffda' }}>
            <strong style={{ color: '#64ffda' }}>Thank you!</strong> Your message was sent successfully. Redirecting to home...
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', color: '#a8b2d8' }}>
            Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '10px', border: '1px solid #3c3c5a', backgroundColor: '#0f1625', color: '#e6f1ff' }}
          />
          {errors.name && <div style={{ color: '#ff6b6b', marginBottom: '12px' }}>{errors.name}</div>}

          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: '#a8b2d8' }}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '10px', border: '1px solid #3c3c5a', backgroundColor: '#0f1625', color: '#e6f1ff' }}
          />
          {errors.email && <div style={{ color: '#ff6b6b', marginBottom: '12px' }}>{errors.email}</div>}

          <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', color: '#a8b2d8' }}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            style={{ width: '100%', padding: '14px', marginBottom: '16px', borderRadius: '10px', border: '1px solid #3c3c5a', backgroundColor: '#0f1625', color: '#e6f1ff' }}
          />
          {errors.message && <div style={{ color: '#ff6b6b', marginBottom: '12px' }}>{errors.message}</div>}

          <button
            type="submit"
            style={{ padding: '14px 24px', borderRadius: '10px', border: 'none', backgroundColor: '#64ffda', color: '#0b1220', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
