'use client';
import './modal.css';
import Image from 'next/image';
import { ALERTICON, COLLABORATORICON, MOREICON, PALETTEICON, PHOTOICON, PINICON, UNPINICON } from '@/utils/constants';
import { useContext, useState } from 'react';
import { NoteListContext } from '@/Providers/noteListProvider';
import { DisplayContext } from '@/Providers/DisplayProvider';
import ColorPalette from '@/components/colorPalatte/colorPalette';

const ICONLIST = [ALERTICON, COLLABORATORICON, PALETTEICON, PHOTOICON, MOREICON];
// @ts-ignore
export default function Modal({ ...props }) {
  // @ts-ignore
  const [noteList, setNoteList] = useContext(NoteListContext);
  // @ts-ignore
  const { modalNote, setModalNote } = useContext(DisplayContext);
  // @ts-ignore
  const [paletteOn, setPaletteOn] = useState(false);
  // @ts-ignore
  const { setIsModalOpen } = useContext(DisplayContext);

  function handleChangeTitle(event: any) {
    setModalNote({ ...modalNote, title: event.target.value });
  }

  function handleChangeBody(event: any) {
    setModalNote({ ...modalNote, body: event.target.value });
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    const noteListCopy = noteList.map((noteElem: any) => {
      if (noteElem.id === modalNote.id) {
        return modalNote;
      } else return noteElem;
    });
    setNoteList(noteListCopy);
    localStorage.setItem('noteList', JSON.stringify(noteListCopy));
    setModalNote({ ...modalNote, title: '', body: '' });
    setIsModalOpen(false);
  }

  function handlePinClick(event: any) {
    event.preventDefault();
    setModalNote({ ...modalNote, pinned: !modalNote.pinned });
  }

  function handleClick(event: any) {
    event.preventDefault();
  }

  function handlePaletteClick() {
    setPaletteOn(!paletteOn);
  }

  return (
    <div className="modal-container">
      <form className="modal-form" onSubmit={handleSubmit} style={{ backgroundColor: modalNote.backgroundColor }}>
        <label className="modal-title-label">
          <input className="modal-title" placeholder="Title" value={modalNote.title} onChange={handleChangeTitle} />
          <button className="modal-pin-icon" onClick={handlePinClick}>
            {!modalNote.pinned ? (
              <Image src={PINICON.src} alt={PINICON.name} width={24} height={24} />
            ) : (
              <Image src={UNPINICON.src} alt={UNPINICON.name} width={24} height={24} />
            )}
          </button>
        </label>
        <textarea
          className="modal-body"
          placeholder="Take a modalNote.."
          value={modalNote.body}
          onChange={handleChangeBody}
        ></textarea>
        <div className="bottom-icons">
          {ICONLIST.map((icon: any) => {
            return icon.name === 'palette' ? (
              <button key={`modal-icon${icon.name}`} onClick={handleClick}>
                <Image src={icon.src} alt={icon.name} width={24} height={24} onClick={handlePaletteClick} />
                {paletteOn && <ColorPalette />}
              </button>
            ) : (
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
