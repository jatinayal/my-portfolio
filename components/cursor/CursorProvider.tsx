'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type CursorType = 'default' | 'pointer' | 'drag' | 'text' | 'grabbing';

interface CursorContextState {
  type: CursorType;
  label: string | null;
  color: string | null;
  setType: (type: CursorType) => void;
  setLabel: (label: string | null) => void;
  setColor: (color: string | null) => void;
}

const CursorContext = createContext<CursorContextState | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<CursorType>('default');
  const [label, setLabel] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  return (
    <CursorContext.Provider value={{ type, label, color, setType, setLabel, setColor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
