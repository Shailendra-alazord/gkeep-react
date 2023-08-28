import './listLayout.css';
import { useContext } from 'react';
import { NoteListContext } from '@/Providers/noteListProvider';
import Image from 'next/image';
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
import { DisplayContext } from '@/Providers/DisplayProvider';
import handlePin from '@/utils/handlePin';

// @ts-ignore
const ICONLIST = [ALERTICON, COLLABORATORICON, PALETTEICON, PHOTOICON];
export default function ListLayout() {
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
    <div className="list-layout">
      <div className="list-layout-container pinned">
        <div>PINNED</div>
        {noteList.map((note: any, key: any) => {
          return note.pinned ? (
            <pre
              className={`list-note-container ${key}`}
              key={note.title + key}
              style={{ backgroundColor: note.backgroundColor }}
            >
              <div className="tick-icon-container">
                <button className="tick-icon">
                  <Image src={TICKICON.src} alt={TICKICON.name} width={24} height={24} />
                </button>
              </div>
              <div className="list-note">
                <div className="list-note-title" onClick={() => openModal(note)}>
                  {note.title}
                </div>
                <div className="list-note-body" onClick={() => openModal(note)}>
                  {note.body}
                </div>
                <div className="hover-icons-bottom">
                  <div className="hover-icons">
                    {ICONLIST.map(icon => {
                      return (
                        <button key={`icon${icon.name}`}>
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

      <div className="list-layout-container others">
        <div>OTHERS</div>
        {noteList.map((note: any, key: any) => {
          return !note.pinned ? (
            <pre
              className={`list-note-container ${key}`}
              key={note.title + key}
              style={{ backgroundColor: note.backgroundColor }}
            >
              <div className="tick-icon-container">
                <button className="tick-icon">
                  <Image src={TICKICON.src} alt={TICKICON.name} width={24} height={24} />
                </button>
              </div>
              <div className="list-note">
                <div className="list-note-title" onClick={() => openModal(note)}>
                  {note.title}
                </div>
                <div className="list-note-body" onClick={() => openModal(note)}>
                  {note.body}
                </div>
                <div className="hover-icons-bottom">
                  <div className="hover-icons">
                    {ICONLIST.map(icon => {
                      return (
                        <button key={`icon${icon.name}`}>
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
