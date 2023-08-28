'use client';
import './colorPalette.css';
import { useContext, useState } from 'react';
import { NoteColorContext } from '@/Providers/noteColorProvider';

const colorList = [
  { name: 'default', code: '#FFFFFF' },
  { name: 'coral', code: '#FF7F50' },
  { name: 'peach', code: '#FFDAB9' },
  { name: 'sand', code: '#F4A460' },
  { name: 'mint', code: '#e2f6d3' },
  { name: 'sage', code: '#b4ddd3' },
  { name: 'fog', code: '#d4e4ed' },
  { name: 'storm', code: '#aeccdc' },
  { name: 'dusk', code: '#d3bfdb' },
  { name: 'blossom', code: '#f6e2dd' },
];
// @ts-ignore
export default function ColorPalette({ ...props }) {
  const [hovered, setHovered] = useState(false);
  const [currentColor, setCurrentColor] = useState('');
  // @ts-ignore
  const [note, setNote] = useContext(NoteColorContext);

  function handleEntry(color: string) {
    setHovered(true);
    setCurrentColor(color);
  }

  function handleExit() {
    setHovered(false);
  }

  function handleClick(event: any, color: string) {
    event.preventDefault();
    setNote({ ...note, backgroundColor: color });
  }

  return (
    <div className="color-palette">
      {colorList.map((color: any, key: any) => {
        return (
          // @ts-ignore
          <button
            key={'color-' + color.name}
            style={{
              backgroundColor: color.code,
              border: `${color.code === note.backgroundColor ? '2px solid #a142f4' : '1px solid lightgrey'}`,
            }}
            onMouseEnter={() => handleEntry(color.name)}
            onMouseLeave={handleExit}
            onClick={() => handleClick(event, color.code)}
          >
            {hovered && currentColor === color.name && <div className="color-modal">{color.name}</div>}
          </button>
        );
      })}
    </div>
  );
}
