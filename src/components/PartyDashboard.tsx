'use client';

export default function PartyDashboard() {
  return (
    <div className="bg-surface border border-text-secondary/20 rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-6">Estado de la Fiesta</h2>
      
      {/* Party Metrics */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <span className="text-text font-medium">Fase:</span>
          <span className="text-text-secondary">Calentamiento</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-text font-medium">Energía:</span>
          <span className="text-text-secondary text-lg">⚡️⚡️⚡️</span>
        </div>
      </div>
      
      {/* Playlist Queue */}
      <div>
        <h3 className="text-xl font-semibold text-text mb-4">Cola de Reproducción</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 p-3 bg-background rounded-lg border border-text-secondary/10">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="flex-1">
              <p className="text-text font-medium">Dancing Queen</p>
              <p className="text-text-secondary text-sm">ABBA</p>
            </div>
          </li>
          
          <li className="flex items-center gap-3 p-3 bg-background rounded-lg border border-text-secondary/10">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="flex-1">
              <p className="text-text font-medium">Uptown Funk</p>
              <p className="text-text-secondary text-sm">Mark Ronson ft. Bruno Mars</p>
            </div>
          </li>
          
          <li className="flex items-center gap-3 p-3 bg-background rounded-lg border border-text-secondary/10">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="flex-1">
              <p className="text-text font-medium">Can't Stop the Feeling!</p>
              <p className="text-text-secondary text-sm">Justin Timberlake</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}