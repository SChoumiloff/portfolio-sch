'use client';
import styles from './Layout.module.css';
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    
    return (
        <div className={styles.pageContainer}
            style={{
                '--grid-color': resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                '--margin-color': resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                '--accent-color': resolvedTheme === 'dark' ? '#374151' : '#ef4444'
            } as React.CSSProperties}
        >
            <div className={styles.gridPattern} />
            <div className={styles.contentWrapper}>
                {children}
            </div>
        </div>
    );
}
