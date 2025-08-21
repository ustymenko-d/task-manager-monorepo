'use client';

import { Button } from '@repo/ui/button';
import styles from './page.module.css';
import { LinkForm } from '../components/LinkForm';
import { DeleteLinkForm } from '../components/DeleteLinkForm';

export default function Home() {
  const getApiHello = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
    const resText = await res.text();
    alert(resText);
  };

  const getLinks = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`);
    const resText = await res.json();
    console.log(resText);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button className={styles.secondary} onClick={getApiHello}>
          Say Hello
        </Button>
        <Button className={styles.secondary} onClick={getLinks}>
          Get links
        </Button>

        <LinkForm />

        <DeleteLinkForm />
      </main>
    </div>
  );
}
