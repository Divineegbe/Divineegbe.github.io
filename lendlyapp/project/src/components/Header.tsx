import { Handshake } from 'lucide-react';

interface HeaderProps {
  onAddClick: () => void;
}

export default function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center">
              <Handshake className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-stone-800">Lendly</span>
          </div>
          <button
            onClick={onAddClick}
            className="text-sm font-semibold text-teal-700 hover:text-teal-800 sm:hidden"
          >
            List
          </button>
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-stone-600">
            <a href="#listings" className="hover:text-teal-700 transition-colors">Browse</a>
            <button
              onClick={onAddClick}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              List an item
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
