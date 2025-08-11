'use client';

import { useState } from 'react';
import ChatInterface from "@/components/ChatInterface";
import PartyDashboard from "@/components/PartyDashboard";

export default function Home() {
  const [partyStarted, setPartyStarted] = useState(false);

  if (!partyStarted) {
    return (
      <main className="flex h-screen flex-col items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          {/* Logo/Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4">
              Anfitrión AI
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              Tu asistente de inteligencia artificial para crear la experiencia perfecta
            </p>
          </div>

          {/* Welcome Message */}
          <div className="bg-surface/50 rounded-2xl p-8 border border-text-secondary/20">
            <p className="text-lg text-text mb-6">
              ¡Bienvenido! Estoy aquí para ayudarte con lo que necesites. 
              Desde responder preguntas hasta crear contenido personalizado.
            </p>
            <div className="flex items-center justify-center gap-4 text-text-secondary text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Conversación inteligente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Respuestas de audio</span>
              </div>
            </div>
          </div>

          {/* Enter Button */}
          <button
            onClick={() => setPartyStarted(true)}
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
        {/* Party Dashboard */}
        <div className="lg:w-1/3 flex-shrink-0">
          <PartyDashboard />
        </div>
        
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col min-h-0">
          <ChatInterface />
        </div>
      </div>
    </main>
  );
}