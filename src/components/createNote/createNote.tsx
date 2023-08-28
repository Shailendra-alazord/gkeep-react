'use client';
import './createNote.css';
import Image from 'next/image';
import {
  ALERTICON,
  BRUSHICON,
  CHECKBOXICON,
  COLLABORATORICON,
  MOREICON,
  PALETTEICON,
  PHOTOICON,
  PINICON,
  UNPINICON,
} from '@/utils/constants';
import { useContext, useState } from 'react';
import { NoteListContext } from '@/Providers/noteListProvider';
import ColorPalette from '@/components/colorPalatte/colorPalette';
import { NoteColorContext } from '@/Providers/noteColorProvider';

const ICONLIST = [ALERTICON, COLLABORATORICON, PALETTEICON, PHOTOICON, MOREICON];
export default function CreateNote() {
  const [focus, setFocus] = useState(false);
  // @ts-ignore
  const [note, setNote] = useContext(NoteColorContext);
  const [paletteOn, setPaletteOn] = useState(false);
  // @ts-ignore
  const [noteList, setNoteList] = useContext(NoteListContext);

  function handleChange(event: any) {
    setNote({ ...note, title: event.target.value });
  }

  function handleBodyChange(event: any) {
    setNote({ ...note, body: event.target.value });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const newNote = {
      title: event.target.title.value,
      body: event.target.body.value,
      id: Date.now().toString(),
      pinned: note.pinned,
      backgroundColor: note.backgroundColor,
    };
    if (newNote.title === '' && newNote.body === '') {
      setNote({ title: '', body: '', id: '', pinned: false, backgroundColor: '#FFFFFF' });
      setFocus(false);
      return;
    }
    const newNoteList = [newNote, ...noteList];
    setNoteList(newNoteList);
    localStorage.setItem('noteList', JSON.stringify(newNoteList));
    setNote({ title: '', body: '', id: '', pinned: false, backgroundColor: '#FFFFFF' });
    setFocus(false);
  }

  function handlePinClick(event: any) {
    event.preventDefault();
    setNote({ ...note, pinned: !note.pinned });
  }

  function handleClickPalette(event: any) {
    event.preventDefault();
    setPaletteOn(!paletteOn);
  }

  function handleClick(event: any) {
    event.preventDefault();
  }

  return (
    <form
      className="create-note-container"
      onFocus={() => setFocus(true)}
      onSubmit={handleSubmit}
      style={{ backgroundColor: note.backgroundColor }}
    >
      {focus ? (
        <>
          <label className="title-desc-label focused">
            <input
              className="create-note-title focused"
              id="title"
              type="text"
              placeholder="Title"
              value={note.title}
              onChange={handleChange}
            />
            <button className="create-note-pin-icon" onClick={handlePinClick}>
              {note.pinned ? (
                <Image src={UNPINICON.src} alt={UNPINICON.name} width={24} height={24} />
              ) : (
                <Image src={PINICON.src} alt={PINICON.name} width={24} height={24} />
              )}
            </button>
          </label>
          <textarea
            className="create-note-desc"
            id="body"
            value={note.body}
            onChange={handleBodyChange}
            placeholder="Take a note..."
          />
          <div className="icon-container">
            {ICONLIST.map((icon: any) => {
              return icon.name === 'palette' ? (
                <button key={`create-icon${icon.name}`} onClick={handleClick}>
                  <Image src={icon.src} alt={icon.name} width={20} height={20} onClick={handleClickPalette} />
                  {paletteOn && <ColorPalette />}
                </button>
              ) : (
                <button key={`create-icon${icon.name}`} onClick={handleClick}>
                  <Image src={icon.src} alt={icon.name} width={20} height={20} />
                </button>
              );
            })}
            <button id="close-btn" type="submit">
              Close
            </button>
          </div>
        </>
      ) : (
        <label className="title-desc-label">
          <input
            className="create-note-title"
            type="text"
            value={note.title}
            onChange={handleChange}
            placeholder="Take a note..."
          />
          <button onClick={handleClick}>
            <Image src={CHECKBOXICON.src} alt={CHECKBOXICON.name} width={24} height={24} />
          </button>
          <button onClick={handleClick}>
            <Image src={BRUSHICON.src} alt={BRUSHICON.name} width={24} height={24} />
          </button>
          <button onClick={handleClick}>
            <Image src={PHOTOICON.src} alt={PHOTOICON.name} width={24} height={24} />
          </button>
        </label>
      )}
    </form>
  );
}
