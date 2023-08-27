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

const ICONLIST = [ALERTICON, COLLABORATORICON, PALETTEICON, PHOTOICON, MOREICON];
export default function CreateNote() {
  const [focus, setFocus] = useState(false);
  const [data, setData] = useState({ title: '', body: '', id: '', pinned: false, backgroundColor: '' });
  // @ts-ignore
  const [noteList, setNoteList] = useContext(NoteListContext);

  function handleChange(event: any) {
    setData({ ...data, title: event.target.value });
  }

  function handleBodyChange(event: any) {
    setData({ ...data, body: event.target.value });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const newData = {
      title: event.target.title.value,
      body: event.target.body.value,
      id: Date.now().toString(),
      pinned: data.pinned,
    };
    if (newData.title === '' && newData.body === '') {
      setData({ title: '', body: '', id: '', pinned: true, backgroundColor: '' });
      setFocus(false);
      return;
    }
    const newNoteList = [newData, ...noteList];
    setNoteList(newNoteList);
    localStorage.setItem('noteList', JSON.stringify(newNoteList));
    setData({ title: '', body: '', id: '', pinned: true, backgroundColor: '' });
    setFocus(false);
  }

  function handlePinClick(event: any) {
    event.preventDefault();
    setData({ ...data, pinned: !data.pinned });
  }

  function handleClick(event: any) {
    event.preventDefault();
  }

  return (
    <form className="create-note-container" onFocus={() => setFocus(true)} onSubmit={handleSubmit}>
      {focus ? (
        <>
          <label className="title-desc-label focused">
            <input
              className="create-note-title focused"
              id="title"
              type="text"
              placeholder="Title"
              value={data.title}
              onChange={handleChange}
            />
            <button className="create-note-pin-icon" onClick={handlePinClick}>
              {data.pinned ? (
                <Image src={UNPINICON.src} alt={UNPINICON.name} width={24} height={24} />
              ) : (
                <Image src={PINICON.src} alt={PINICON.name} width={24} height={24} />
              )}
            </button>
          </label>
          <textarea
            className="create-note-desc"
            id="body"
            value={data.body}
            onChange={handleBodyChange}
            placeholder="Take a note..."
          />
          <div className="icon-container">
            {ICONLIST.map((icon: any) => {
              return (
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
            value={data.title}
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
