export default function filterNoteList(noteList: any, query: string) {
  return noteList.filter((note: any) => {
    const pattern = query.toLowerCase();
    return note.title.toLowerCase().search(pattern) !== -1 || note.body.toLowerCase().search(pattern) !== -1;
  });
}
