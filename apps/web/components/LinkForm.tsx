'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './LinkForm.module.css';

const INITIAL_FORM = {
  url: '',
  title: '',
  description: '',
};

export const LinkForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.message || 'Something went wrong');
      }

      setForm(INITIAL_FORM);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles['link-form']} onSubmit={handleSubmit}>
      <input
        type="text"
        name="url"
        placeholder="URL"
        value={form.url}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <button type="submit" className={styles['primary']} disabled={loading}>
        {loading ? 'Sending...' : 'Add Link'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};
