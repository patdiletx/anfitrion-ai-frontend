'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import type { Message } from '@/types';

interface ChatInterfaceProps {
  mensajes: Message[];
  enviarMensaje: (texto: string) => void;
}

export default function ChatInterface({ mensajes, enviarMensaje }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [mensajes]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      enviarMensaje(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface border border-text-secondary/20 rounded-lg p-4">
      <div className="flex-1 overflow-y-auto mb-4 p-2 space-y-4">
        {mensajes.length === 0 ? (
          <div className="text-center text-text-secondary flex items-center justify-center h-full">
            <p>Pide una canción para empezar la fiesta.</p>
          </div>
        ) : (
          mensajes.map((mensaje, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${mensaje.autor === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  mensaje.autor === 'user'
                    ? 'bg-primary text-background rounded-br-none'
                    : 'bg-background text-text rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{mensaje.texto}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Pide una canción..."
          className="flex-1 px-4 py-3 bg-background border border-text-secondary/30 rounded-lg text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="px-6 py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}