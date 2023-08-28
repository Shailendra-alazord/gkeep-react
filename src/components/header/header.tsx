'use client';
import './header.css';
import GlobalSearchBar from '@/components/globarSearchBar/globalSearchBar';
import { GRIDICON, MENUICON, PROFILEICON, SEARCHBARICONS } from '@/utils/constants';
import Image from 'next/image';
import { useContext } from 'react';
import { DisplayContext } from '@/Providers/DisplayProvider';
// import { SEARCHBARICONS } from '@/constants';

export default function Header() {
  // @ts-ignore
  const { isListMode, setIsListMode } = useContext(DisplayContext);

  function handleClick() {
    setIsListMode(!isListMode);
  }

  return (
    <div className="header">
      <button className="menu-icon">
        <Image src={MENUICON.src} alt={MENUICON.name} width={24} height={24} />
      </button>
      <div className="page-title-container">
        <div className="page-logo">
          <Image className="logo" src={'/keep_logo.svg'} alt={'Keep Logo'} width={28} height={28} />
        </div>
        <div className="page-title">Keep</div>
      </div>
      <GlobalSearchBar />
      <div className="header-icons-grp">
        {SEARCHBARICONS.map(icon => {
          if (icon.name === 'list') {
            if (isListMode) {
              return (
                <button key={icon.name} onClick={handleClick}>
                  <Image src={icon.src} alt={icon.name} width={24} height={24} />
                </button>
              );
            } else {
              return (
                <button key={GRIDICON.name} onClick={handleClick}>
                  <Image src={GRIDICON.src} alt={GRIDICON.name} width={24} height={24} />
                </button>
              );
            }
          } else {
            return (
              <button key={icon.name} onClick={handleClick}>
                <Image src={icon.src} alt={icon.name} width={24} height={24} />
              </button>
            );
          }
        })}
      </div>
      <button className="profile-icon">
        <Image src={PROFILEICON.src} alt={PROFILEICON.name} width={40} height={40} />
      </button>
    </div>
  );
}
