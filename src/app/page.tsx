// app/page.tsx (CON LA SOLUCIÓN DEFINITIVA DE AUTOPLAY)
'use client';

import { useState } from 'react';
import ChatInterface from "@/components/ChatInterface";
import PartyDashboard from "@/components/PartyDashboard";

export default function Home() {
  const [partyStarted, setPartyStarted] = useState(false);

  // ESTA ES LA FUNCIÓN CLAVE QUE FALTABA
  const handlePartyStart = () => {
    console.log("Botón presionado. Intentando desbloquear el audio...");
    // Creamos un contexto de audio "dummy"
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Si el contexto está suspendido (política de autoplay), lo reanudamos con el clic
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    // Creamos y reproducimos un buffer de audio silencioso y vacío.
    // Este es el truco que le da permiso a la página para reproducir sonidos más tarde.
    const buffer = audioContext.createBuffer(1, 1, 22050);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);

    // Cambiamos el estado para mostrar la interfaz de la fiesta
    setPartyStarted(true);
  };

  if (!partyStarted) {
    return (
      <main className="flex h-screen flex-col items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4">
              Anfitrión AI
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              Tu asistente de inteligencia artificial para crear la experiencia perfecta
            </p>
          </div>
          <div className="bg-surface/50 rounded-2xl p-8 border border-text-secondary/20">
            <p className="text-lg text-text mb-6">
              ¡Bienvenido! Haz clic abajo para iniciar la experiencia y activar el audio.
            </p>
          </div>
          <button
            onClick={handlePartyStart} // AHORA LLAMA A LA FUNCIÓN CORRECTA
            className="px-12 py-4 bg-primary text-background text-xl font-semibold rounded-xl hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-primary/20"
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
          <PartyDashboard />
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          <ChatInterface />
        </div>
      </div>
    </main>
  );
}