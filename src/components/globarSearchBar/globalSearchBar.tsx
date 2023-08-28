'use client';
import './globalSearchBar.css';
import Image from 'next/image';
import { CLOSEICON, SEARCHICON } from '@/utils/constants';
import { useContext } from 'react';
import { DisplayContext } from '@/Providers/DisplayProvider';

export default function GlobalSearchBar() {
  // @ts-ignore
  const { query, setQuery, setIsSearchMode } = useContext(DisplayContext);

  function handleClose(event: any) {
    event.preventDefault();
    setQuery('');
    setIsSearchMode(false);
  }

  function handleSearch(event: any) {
    event.preventDefault();
  }

  function handleChange(event: any) {
    setQuery(event.target.value);
  }

  return (
    <form className="search-container" onFocus={() => setIsSearchMode(true)}>
      <button className="btn" type="submit" onClick={handleSearch}>
        <Image src={SEARCHICON.src} alt={SEARCHICON.name} width={24} height={24} />
      </button>
      <input className="search-global" type="text" placeholder="Search" value={query} onChange={handleChange} />
      <button className="btn close" onClick={handleClose}>
        <Image src={CLOSEICON.src} alt={CLOSEICON.name} width={24} height={24} />
      </button>
    </form>
  );
}
