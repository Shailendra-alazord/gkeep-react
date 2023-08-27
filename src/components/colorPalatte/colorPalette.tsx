'use client';
import './colorPalette.css';

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
export default function ColorPalette({ note, ...props }) {
  return (
    <div className="color-palette">
      {colorList.map((color: any, key: any) => {
        return (
          // @ts-ignore
          <button
            key={'color-' + color.name}
            style={{
              backgroundColor: color.code,
              border: `${color.name === note.color ? '1px solid #a142f4' : 'none'}`,
            }}
          >
            {/*<div className="color-modal">{color.name}</div>*/}
          </button>
        );
      })}
    </div>
  );
}
