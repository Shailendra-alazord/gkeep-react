'use client';

import { createContext, useEffect, useState } from 'react';
import { DEFAULTNOTE } from '@/utils/constants';

// @ts-ignore
export const DisplayContext = createContext();
export default function DisplayProvider({ ...props }) {
  const [isListMode, setIsListMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalNote, setModalNote] = useState(DEFAULTNOTE);
  useEffect(() => {
    // console.log('modalNote changed', modalNote);
  }, [modalNote]);
  return (
    <DisplayContext.Provider
      value={[isListMode, setIsListMode, isModalOpen, setIsModalOpen, modalNote, setModalNote]}
      {...props}
    >
      {props.children}
    </DisplayContext.Provider>
  );
}
