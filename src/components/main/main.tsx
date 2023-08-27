'use client';
import './main.css';
import CreateNote from '@/components/createNote/createNote';
import { useContext } from 'react';
import { DisplayContext } from '@/Providers/DisplayProvider';
import ListLayout from '@/components/listLayout/listLayout';
import GridLayout from '@/components/gridLayout/gridLayout';
import NoteListProvider from '@/Providers/noteListProvider';
import Modal from '@/components/modal/modal';
import Header from '@/components/header/header';

export default function Main() {
  // @ts-ignore
  const [isListLayout, , isModalOpen] = useContext(DisplayContext);
  // @ts-ignore
  const [, , , , currentNote] = useContext(DisplayContext);
  return (
    <NoteListProvider>
      <Header />
      <main className="home">
        <CreateNote />
        {isListLayout ? <ListLayout /> : <GridLayout />}
        {isModalOpen && <Modal currentNote={currentNote} />}
      </main>
    </NoteListProvider>
  );
}
