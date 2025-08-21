'use client';

import { useState, FormEvent } from 'react';
import styles from './LinkForm.module.css';

export const DeleteLinkForm = () => {
  const [id, setId] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!id) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/links/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (res.ok) {
        setStatus(`Link with id ${id} deleted successfully.`);
        setId('');
      } else {
        const data = await res.json();
        setStatus(`Error: ${data.message || res.statusText}`);
      }
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['link-form']}>
      <input
        type="text"
        placeholder="Enter Link ID to delete"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button type="submit" className={styles['primary']}>
        Delete Link
      </button>
      {status && <p>{status}</p>}
    </form>
  );
};
