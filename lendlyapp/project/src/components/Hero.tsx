import { Search, MapPin, Clock, Home } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onBrowseClick: () => void;
}

export default function Hero({ searchQuery, onSearchChange, onBrowseClick }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Borrow what you need.<br />Lend what you don't.
          </h1>
          <p className="mt-4 text-teal-50 text-lg leading-relaxed">
            Lendly connects you with neighbors so you can borrow tools, gear, and even a
            spare guest room — no need to buy what you'll only use once.
          </p>

          <div className="mt-8 flex items-center gap-2 bg-white rounded-2xl p-2 shadow-lg">
            <Search className="w-5 h-5 text-stone-400 ml-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for a drill, tent, guest room…"
              className="flex-1 px-2 py-3 text-stone-800 placeholder-stone-400 focus:outline-none text-base"
            />
            <button
              onClick={onBrowseClick}
              className="bg-stone-800 hover:bg-stone-900 text-white font-semibold px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
          <Feature icon={<Search className="w-5 h-5" />} title="Find it fast" desc="Search by item or category" />
          <Feature icon={<MapPin className="w-5 h-5" />} title="See the route" desc="Map and photo to the door" />
          <Feature icon={<Clock className="w-5 h-5" />} title="Borrow by the day" desc="Set how long you need it" />
        </div>

        <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
          <Home className="w-4 h-4" />
          Lendly isn't just for things — you can lend a guest room too.
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
      <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center mb-2">{icon}</div>
      <p className="font-semibold">{title}</p>
      <p className="text-teal-50 text-sm">{desc}</p>
    </div>
  );
}
