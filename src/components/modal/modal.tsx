'use client';
import './modal.css';
import Image from 'next/image';
import { ALERTICON, COLLABORATORICON, MOREICON, PALETTEICON, PHOTOICON, PINICON, UNPINICON } from '@/utils/constants';
import { useContext, useState } from 'react';
import { NoteListContext } from '@/Providers/noteListProvider';
import { DisplayContext } from '@/Providers/DisplayProvider';

const ICONLIST = [ALERTICON, COLLABORATORICON, PALETTEICON, PHOTOICON, MOREICON];
// @ts-ignore
export default function Modal({ currentNote, ...props }) {
  // @ts-ignore
  const [noteList, setNoteList] = useContext(NoteListContext);
  const [note, setNote] = useState(currentNote ?? { title: '', body: '', id: '', pinned: true });
  // @ts-ignore
  const [, , , seIsModalOpen] = useContext(DisplayContext);

  function handleChangeTitle(event: any) {
    setNote({ ...note, title: event.target.value });
  }

  function handleChangeBody(event: any) {
    setNote({ ...note, body: event.target.value });
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    const noteListCopy = noteList.map((noteElem: any) => {
      if (noteElem.id === note.id) {
        return note;
      } else return noteElem;
    });
    setNoteList(noteListCopy);
    localStorage.setItem('noteList', JSON.stringify(noteListCopy));
    setNote({ ...note, title: '', body: '' });
    seIsModalOpen(false);
  }

  function handlePinClick(event: any) {
    event.preventDefault();
    setNote({ ...note, pinned: !note.pinned });
  }

  function handleClick(event: any) {
    event.preventDefault();
  }

  return (
    <div className="modal-container">
      <form className="modal-form" onSubmit={handleSubmit}>
        <label className="modal-title-label">
          <input className="modal-title" placeholder="Title" value={note.title} onChange={handleChangeTitle} />
          <button className="modal-pin-icon" onClick={handlePinClick}>
            {!note.pinned ? (
              <Image src={PINICON.src} alt={PINICON.name} width={24} height={24} />
            ) : (
              <Image src={UNPINICON.src} alt={UNPINICON.name} width={24} height={24} />
            )}
          </button>
        </label>
        <textarea
          className="modal-body"
          placeholder="Take a note..."
          value={note.body}
          onChange={handleChangeBody}
        ></textarea>
        <div className="bottom-icons">
          {ICONLIST.map((icon: any) => {
            return (
              <button key={`modal-icon${icon.name}`} onClick={handleClick}>
                <Image src={icon.src} alt={icon.name} width={24} height={24} />
              </button>
            );
          })}
          <button id="modal-close" type="submit">
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
