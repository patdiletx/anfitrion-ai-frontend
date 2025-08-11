'use client';

import { useState } from 'react';
import ChatInterface from "@/components/ChatInterface";
import PartyDashboard from "@/components/PartyDashboard";
import { useSocket } from '@/hooks/useSocket';

export default function Home() {
  const [partyStarted, setPartyStarted] = useState(false);
  
  // El hook se llama una sola vez aquí
  const { mensajes, partyState, enviarMensaje } = useSocket('http://localhost:3001');

  const handlePartyStart = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    const buffer = audioContext.createBuffer(1, 1, 22050);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
    setPartyStarted(true);
  };

  if (!partyStarted) {
    return (
      <main className="flex h-screen flex-col items-center justify-center p-4">
         <div className="text-center">
          <h1 className="text-5xl font-bold text-primary mb-4">Anfitrión AI</h1>
          <p className="text-text-secondary mb-8">Tu DJ y animador personal para cualquier evento.</p>
          <button
            onClick={handlePartyStart}
            className="px-8 py-4 bg-primary text-background font-bold rounded-lg shadow-lg hover:bg-opacity-80 transition-all duration-200"
          >
            Entrar a la Fiesta
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen p-4">
      <div className="h-full flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        <div className="lg:w-1/3 flex-shrink-0">
          {/* El Dashboard recibe el estado como prop */}
          <PartyDashboard partyState={partyState} />
        </div>
        
        <div className="flex-1 flex flex-col min-h-0">
          {/* El Chat recibe los mensajes y la función de envío como props */}
          <ChatInterface 
            mensajes={mensajes} 
            enviarMensaje={enviarMensaje} 
          />
        </div>
      </div>
    </main>
  );
}