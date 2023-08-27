'use client';
import './globalSearchBar.css';
import Image from 'next/image';
import { CLOSEICON, SEARCHICON } from '@/utils/constants';

export default function GlobalSearchBar() {
  function handleClick(event: any) {
    event.preventDefault();
  }

  return (
    <form className="search-container">
      <button className="btn" type="submit" onClick={handleClick}>
        <Image src={SEARCHICON.src} alt={SEARCHICON.name} width={24} height={24} />
      </button>
      <input className="search-global" type="text" placeholder="Search" />
      <button className="btn close" onClick={handleClick}>
        <Image src={CLOSEICON.src} alt={CLOSEICON.name} width={24} height={24} />
      </button>
    </form>
  );
}
