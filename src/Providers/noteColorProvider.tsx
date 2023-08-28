'use client';

import { createContext, useState } from 'react';

// @ts-ignore
export const NoteColorContext = createContext();

export default function NoteColorProvider(props: any) {
  const [note, setNote] = useState({ title: '', body: '', id: '', pinned: false, backgroundColor: '#FFFFFF' });
  return <NoteColorContext.Provider value={[note, setNote]}>{props.children}</NoteColorContext.Provider>;
}
