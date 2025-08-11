// Define la estructura de un mensaje en el chat
export interface Message {
  autor: 'user' | 'nexus';
  texto: string;
}

// Define los posibles estados de la fiesta
export type PartyPhase = 'Calentamiento' | 'Punto Algido' | 'Transición' | 'Bajada' | 'Cierre';

// Define la estructura de una canción
export interface Track {
  id: string;
  name: string;
  artist: string;
  bpm: number;
  energy: number;
  valence: number;
}

// Define la estructura completa del estado de la fiesta
export interface PartyState {
  partyPhase: PartyPhase;
  currentEnergy: number;
  activeGuests: number;
  currentTrack: Track | null;
  // Para el frontend, no necesitamos la estructura completa de las siguientes propiedades por ahora
  guestRequestQueue: Track[]; 
  interactionLog: any[];
}