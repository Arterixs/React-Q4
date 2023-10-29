import { KEY_REQUEST } from './api';

export const getPrevRequest = () => localStorage.getItem(KEY_REQUEST) ?? '';
