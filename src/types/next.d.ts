// Type declarations to help with page props type constraints
import { ReactNode } from 'react';

// Define proper param types to avoid using 'any'
interface PageParams {
  [key: string]: string | string[];
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

declare module 'next' {
  export interface PageProps {
    children?: ReactNode;
    params?: PageParams;
    searchParams?: SearchParams;
  }
}
