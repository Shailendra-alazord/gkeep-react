'use client';
import { createContext, useState } from 'react';

// @ts-ignore
export const NoteListContext = createContext();
export default function NoteListProvider({ ...props }) {
  // @ts-ignore

  const [noteList, setNoteList] = useState(
    // @ts-ignore
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('noteList')) ?? [] : []
  );
  // const [isModalOpen, setIsModalOpen] = useState(false);
  return <NoteListContext.Provider value={[noteList, setNoteList]}>{props.children}</NoteListContext.Provider>;
}
