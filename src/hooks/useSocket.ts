'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Message, PartyState } from '@/types';

// Define lo que nuestro hook va a devolver
interface UseSocketReturn {
  mensajes: Message[];
  partyState: PartyState | null;
  enviarMensaje: (texto: string) => void;
}

export function useSocket(serverUrl: string): UseSocketReturn {
  const [mensajes, setMensajes] = useState<Message[]>([]);
  const [partyState, setPartyState] = useState<PartyState | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket: Socket = io(serverUrl);
    socketRef.current = socket;

    // Listener para los mensajes de chat
    socket.on('nuevaRespuesta', (nuevoMensaje: Message) => {
      setMensajes(prev => [...prev, nuevoMensaje]);
    });
    
    // Listener para el audio
    socket.on('nuevaRespuestaAudio', (audioBuffer: ArrayBuffer) => {
      const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.play().catch(e => console.error("Error al reproducir audio:", e));
    });

    // Listener para el estado de la fiesta
    socket.on('actualizacionEstado', (nuevoEstado: PartyState) => {
      console.log('🎉 ¡Actualización de estado recibida!', nuevoEstado);
      setPartyState(nuevoEstado);
    });

    // Limpieza al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, [serverUrl]);

  const enviarMensaje = (texto: string) => {
    const mensajeUsuario: Message = { autor: 'user', texto };
    setMensajes(prev => [...prev, mensajeUsuario]);
    socketRef.current?.emit('nuevaPeticion', texto);
  };

  return {
    mensajes,
    partyState,
    enviarMensaje
  };
}