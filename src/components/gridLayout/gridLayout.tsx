'use client';
import Image from 'next/image';
import './gridLayout.css';
import {
  ALERTICON,
  COLLABORATORICON,
  DELETEICON,
  MOREICON,
  PALETTEICON,
  PHOTOICON,
  PINICON,
  TICKICON,
  UNPINICON,
} from '@/utils/constants';
import { useContext } from 'react';
import { NoteListContext } from '@/Providers/noteListProvider';
import { DisplayContext } from '@/Providers/DisplayProvider';
import handlePin from '@/utils/handlePin';

const ICONLIST = [ALERTICON, COLLABORATORICON, PALETTEICON, PHOTOICON];
export default function GridLayout() {
  // @ts-ignore
  const [noteList, setNoteList] = useContext(NoteListContext);
  // @ts-ignore
  const [, , , setIsModalOpen, , setCurrentNote] = useContext(DisplayContext);

  function openModal(note: any) {
    setCurrentNote(note);
    setIsModalOpen(true);
  }

  function handleDelete(note: any) {
    const noteListCopy = noteList.filter((noteElem: any) => {
      return noteElem.id !== note.id;
    });
    setNoteList(noteListCopy);
    localStorage.setItem('noteList', JSON.stringify(noteListCopy));
  }

  return (
    <div className="grid-layout">
      <div className="container-label">PINNED</div>
      <div className="grid-layout-container pinned">
        {noteList.map((note: any, key: any) => {
          return note.pinned ? (
            <pre className={`grid-note-container ${key}`} key={note.title + key + 'grid'}>
              <div className="tick-icon-container">
                <button className="tick-icon">
                  <Image src={TICKICON.src} alt={TICKICON.name} width={24} height={24} />
                </button>
              </div>
              <div className="grid-note">
                <div className="grid-note-title" onClick={() => openModal(note)}>
                  {note.title}
                </div>
                <div className="grid-note-body" onClick={() => openModal(note)}>
                  {note.body}
                </div>
                <div className="hover-icons-bottom">
                  <div className="hover-icons">
                    {ICONLIST.map(icon => {
                      return (
                        <button key={`grid-icon${icon.name}`}>
                          <Image src={icon.src} alt={icon.name} width={20} height={20} />
                        </button>
                      );
                    })}
                    <button onClick={() => handleDelete(note)}>
                      <Image src={DELETEICON.src} alt={DELETEICON.name} width={20} height={20} />
                    </button>
                    <button>
                      <Image src={MOREICON.src} alt={MOREICON.name} width={20} height={20} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="pin-icon-container">
                <button className="pin-icon" onClick={() => handlePin(note, noteList, setNoteList)}>
                  <Image src={UNPINICON.src} alt={UNPINICON.name} width={24} height={24} />
                </button>
              </div>
            </pre>
          ) : (
            <></>
          );
        })}
      </div>
      <div className="container-label">OTHERS</div>
      <div className="grid-layout-container others">
        {noteList.map((note: any, key: any) => {
          return !note.pinned ? (
            <pre className={`grid-note-container ${key}`} key={note.title + key + 'grid'}>
              <div className="tick-icon-container">
                <button className="tick-icon">
                  <Image src={TICKICON.src} alt={TICKICON.name} width={24} height={24} />
                </button>
              </div>
              <div className="grid-note">
                <div className="grid-note-title" onClick={() => openModal(note)}>
                  {note.title}
                </div>
                <div className="grid-note-body" onClick={() => openModal(note)}>
                  {note.body}
                </div>
                <div className="hover-icons-bottom">
                  <div className="hover-icons">
                    {ICONLIST.map(icon => {
                      return (
                        <button key={`grid-icon${icon.name}`}>
                          <Image src={icon.src} alt={icon.name} width={20} height={20} />
                        </button>
                      );
                    })}
                    <button onClick={() => handleDelete(note)}>
                      <Image src={DELETEICON.src} alt={DELETEICON.name} width={20} height={20} />
                    </button>
                    <button>
                      <Image src={MOREICON.src} alt={MOREICON.name} width={20} height={20} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="pin-icon-container">
                <button className="pin-icon" onClick={() => handlePin(note, noteList, setNoteList)}>
                  <Image src={PINICON.src} alt={PINICON.name} width={24} height={24} />
                </button>
              </div>
            </pre>
          ) : (
            <></>
          );
        })}
      </div>
    </div>
  );
}
