'use client';

import { useState, FormEvent } from 'react';
import { useSocket } from '@/hooks/useSocket';

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState('');
  const { mensajes, enviarMensaje } = useSocket('http://localhost:3001');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (inputValue.trim()) {
      enviarMensaje(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-6">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-4">
        {mensajes.length === 0 ? (
          <div className="text-center text-text-secondary py-8">
            <p>¡Hola! Soy Nexus, tu asistente de Anfitrión AI.</p>
            <p>¿En qué puedo ayudarte hoy?</p>
          </div>
        ) : (
          mensajes.map((mensaje, index) => (
            <div
              key={index}
              className={`flex ${
                mensaje.autor === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  mensaje.autor === 'user'
                    ? 'bg-primary text-background ml-4'
                    : 'bg-surface text-text mr-4 border border-text-secondary/20'
                }`}
              >
                <div className="text-sm font-medium mb-1">
                  {mensaje.autor === 'user' ? 'Tú' : 'Nexus'}
                </div>
                <div className="text-sm leading-relaxed">
                  {mensaje.texto}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          className="flex-1 px-4 py-3 bg-surface border border-text-secondary/30 rounded-lg text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="px-6 py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}