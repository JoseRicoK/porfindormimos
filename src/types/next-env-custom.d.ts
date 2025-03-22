// Sobrescribir definiciones de tipos de Next.js para páginas
import { ReactNode } from 'react';

declare module 'next' {
  export interface PageProps {
    children?: ReactNode;
    params?: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
  }
}
