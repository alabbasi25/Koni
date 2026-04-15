import { Dashboard } from './components/Dashboard';
import { PlanetProvider } from './context/KokabContext';

export default function App() {
  return (
    <div className="antialiased min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] font-sans" dir="rtl">
      <PlanetProvider userId="F">
        <Dashboard />
      </PlanetProvider>
    </div>
  );
}
