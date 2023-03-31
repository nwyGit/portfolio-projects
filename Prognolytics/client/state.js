import { atom } from 'jotai';

export const isCollapsedAtom = atom(false);
export const isStartToScanAtom = atom(false);
export const isEnterManuallyAtom = atom(false);
export const isUpdateRecordAtom = atom(false);
export const passwordAtom = atom('');
export const confirmPasswordAtom = atom('');
export const passwordMatchAtom = atom(false);
