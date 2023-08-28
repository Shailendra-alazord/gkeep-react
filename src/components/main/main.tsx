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
import NoteColorProvider from '@/Providers/noteColorProvider';

export default function Main() {
  // @ts-ignore
  const { isListMode, isModalOpen, isSearchMode } = useContext(DisplayContext);
  // @ts-ignore
  return (
    <NoteListProvider>
      <NoteColorProvider>
        <Header />
        <main className="home">
          {!isSearchMode && <CreateNote />}
          {isListMode ? <ListLayout /> : <GridLayout />}
          {isModalOpen && <Modal />}
        </main>
      </NoteColorProvider>
    </NoteListProvider>
  );
}
