'use client';

import { createContext, useEffect, useState } from 'react';
import { DEFAULTNOTE } from '@/utils/constants';

// @ts-ignore
export const DisplayContext = createContext();
export default function DisplayProvider({ ...props }) {
  const [isListMode, setIsListMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalNote, setModalNote] = useState(DEFAULTNOTE);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [query, setQuery] = useState('');
  useEffect(() => {
    // console.log('modalNote changed', modalNote);
  }, [modalNote]);
  return (
    <DisplayContext.Provider
      value={{
        isListMode: isListMode,
        setIsListMode: setIsListMode,
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        modalNote: modalNote,
        setModalNote: setModalNote,
        isSearchMode: isSearchMode,
        setIsSearchMode: setIsSearchMode,
        query: query,
        setQuery: setQuery,
      }}
      {...props}
    >
      {props.children}
    </DisplayContext.Provider>
  );
}
