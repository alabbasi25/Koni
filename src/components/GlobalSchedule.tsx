import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { usePlanet } from '../context/KokabContext';

export const GlobalSchedule: React.FC = () => {
  const { calendar } = usePlanet();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black">التقويم الكوني</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">دمج مواعيدنا في جدول واحد</p>
      </div>

      <div className="space-y-4">
        {calendar.map(event => (
          <div key={event.id} className="glass-card p-6 flex gap-6 items-start">
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] min-w-[60px]">
              <span className="text-xs font-bold uppercase">{new Date(event.startTime).toLocaleDateString('ar-EG', { month: 'short' })}</span>
              <span className="text-2xl font-black">{new Date(event.startTime).getDate()}</span>
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{event.title}</h3>
                <div className="px-2 py-1 rounded-md bg-[var(--color-bg-surface)] text-[10px] font-bold uppercase opacity-60">
                  {event.category}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-xs text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {new Date(event.startTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                </div>
                {event.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {event.location}
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Users size={14} />
                  {event.participants.join(' & ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
