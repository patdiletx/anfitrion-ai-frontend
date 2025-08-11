'use client';

import type { PartyState } from '@/types';

interface PartyDashboardProps {
  partyState: PartyState | null;
}

export default function PartyDashboard({ partyState }: PartyDashboardProps) {
  const energiaEmoji = (energia: number) => {
    if (energia > 0.65) return '⚡️⚡️⚡️';
    if (energia > 0.4) return '⚡️⚡️';
    return '⚡️';
  };

  return (
    <div className="bg-surface border border-text-secondary/20 rounded-lg p-6 h-full">
      <h2 className="text-2xl font-bold text-primary mb-6">Estado de la Fiesta</h2>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <span className="text-text font-medium">Fase:</span>
          <span className="text-text-secondary">{partyState?.partyPhase || 'Esperando...'}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-text font-medium">Energía:</span>
          <span className="text-text-secondary text-lg">
            {partyState ? `${partyState.currentEnergy.toFixed(2)} ${energiaEmoji(partyState.currentEnergy)}` : 'N/A'}
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-text mb-4">Cola de Reproducción</h3>
        {partyState && partyState.guestRequestQueue.length > 0 ? (
          <ul className="space-y-3">
            {partyState.guestRequestQueue.map((track, index) => (
              <li key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg border border-text-secondary/10">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-text font-medium">{track.name}</p>
                  <p className="text-text-secondary text-sm">{track.artist}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-text-secondary text-sm">No hay canciones en la cola.</p>
        )}
      </div>
    </div>
  );
}