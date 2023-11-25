import { KEY_REQUEST } from './api';

// export const getPrevRequestFromLocal = () => localStorage.getItem(KEY_REQUEST) ?? '';

export const getPrevRequestFromLocal = () =>  '';
export const setCurrentRequestInLocal = (value: string) => localStorage.setItem(KEY_REQUEST, value);
