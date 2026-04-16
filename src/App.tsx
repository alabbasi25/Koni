import { useState } from 'react';
import { Dashboard } from './components/layout/Dashboard';
import { PlanetProvider } from './context/KokabContext';
import { UserID } from './types';

export default function App() {
  const [userId, setUserId] = useState<UserID>('F');

  return (
    <div className="antialiased min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] font-sans" dir="rtl">
      <PlanetProvider userId={userId}>
        <Dashboard onSwitchUser={() => setUserId(prev => prev === 'F' ? 'B' : 'F')} />
      </PlanetProvider>
    </div>
  );
}
