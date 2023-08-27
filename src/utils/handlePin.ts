export default function handlePin(note: any, noteList: any, setNoteList: any) {
  const noteListCopy = noteList.map((noteElem: any) => {
    if (note.id === noteElem.id) {
      return { ...note, pinned: !note.pinned };
    } else {
      return noteElem;
    }
  });
  setNoteList(noteListCopy);
  localStorage.setItem('noteList', JSON.stringify(noteListCopy));
}
