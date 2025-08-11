import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  autor: 'user' | 'nexus';
  texto: string;
}

interface UseSocketReturn {
  mensajes: Message[];
  enviarMensaje: (texto: string) => void;
}

export function useSocket(serverUrl: string): UseSocketReturn {
  const [mensajes, setMensajes] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket: Socket = io(serverUrl);
    socketRef.current = socket;

    const handleNuevaRespuesta = (respuesta: string) => {
      const nuevoMensaje: Message = {
        autor: 'nexus',
        texto: respuesta
      };
      
      setMensajes(prevMensajes => [...prevMensajes, nuevoMensaje]);
    };

    const handleNuevaRespuestaAudio = (audioBuffer: ArrayBuffer) => {
      console.log('🎧 ¡Audio buffer recibido en el frontend!', audioBuffer);

      const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      
      audio.addEventListener('ended', () => {
        URL.revokeObjectURL(audioUrl);
      });
      
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
        URL.revokeObjectURL(audioUrl);
      });
    };

    socket.on('nuevaRespuesta', handleNuevaRespuesta);
    socket.on('nuevaRespuestaAudio', handleNuevaRespuestaAudio);

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [serverUrl]);

  const enviarMensaje = (texto: string) => {
    const mensajeUsuario: Message = {
      autor: 'user',
      texto: texto
    };

    setMensajes(prevMensajes => [...prevMensajes, mensajeUsuario]);

    if (socketRef.current) {
      socketRef.current.emit('nuevaPeticion', texto);
    }
  };

  return {
    mensajes,
    enviarMensaje
  };
}