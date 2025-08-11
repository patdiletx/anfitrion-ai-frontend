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

    socket.on('nuevaRespuesta', handleNuevaRespuesta);

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