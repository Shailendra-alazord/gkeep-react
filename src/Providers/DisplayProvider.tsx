'use client';

import { createContext, useState } from 'react';

// @ts-ignore
export const DisplayContext = createContext();
export default function DisplayProvider({ ...props }) {
  const [isListMode, setIsListMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({});
  return (
    <DisplayContext.Provider
      value={[isListMode, setIsListMode, isModalOpen, setIsModalOpen, currentNote, setCurrentNote]}
      {...props}
    >
      {props.children}
    </DisplayContext.Provider>
  );
}
