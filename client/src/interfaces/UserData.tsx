import { Joke } from './Joke';

export interface UserData {
  id: string | null; 
  username: string | null;
  email: string | null;
  jokes?: Joke[]; 
}
