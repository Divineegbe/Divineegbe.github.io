import type { Item } from '@/types';
import { MapPin, Clock, Tag } from 'lucide-react';

interface ListingGridProps {
  items: Item[];
  onSelect: (item: Item) => void;
}

export default function ListingGrid({ items, onSelect }: ListingGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="group text-left bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg hover:border-teal-300 transition-all duration-200"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
            <img
              src={item.image_url}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span
              className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
                item.listing_type === 'borrow'
                  ? 'bg-teal-600 text-white'
                  : 'bg-amber-500 text-white'
              }`}
            >
              {item.listing_type === 'borrow' ? 'Borrow' : `Rent $${item.price}`}
            </span>
            {!item.available && (
              <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-stone-800 text-white">
                Unavailable
              </span>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
              <Tag className="w-3 h-3" />
              {item.category}
            </div>
            <h3 className="font-bold text-lg text-stone-800 group-hover:text-teal-700 transition-colors">
              {item.title}
            </h3>
            <p className="text-stone-500 text-sm mt-1 line-clamp-2">{item.description}</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-1 text-stone-500">
                <MapPin className="w-4 h-4 text-teal-600" />
                {item.house_number} {item.street}
              </span>
              {item.listing_type === 'borrow' && item.borrow_duration && (
                <span className="inline-flex items-center gap-1 text-stone-500">
                  <Clock className="w-4 h-4 text-teal-600" />
                  {item.borrow_duration}
                </span>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
