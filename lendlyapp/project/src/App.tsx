import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Item } from '@/types';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ListingGrid from '@/components/ListingGrid';
import ListingDetail from '@/components/ListingDetail';
import AddListingModal from '@/components/AddListingModal';
import { Plus, X } from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setError('We could not load the listings. Please try again in a moment.');
    } else {
      setItems(data ?? []);
    }
    setLoading(false);
  }

  async function handleAddListing(draft: Omit<Item, 'id' | 'created_at' | 'available'>) {
    const { data, error } = await supabase
      .from('items')
      .insert({ ...draft, available: true })
      .select()
      .single();
    if (error) throw error;
    setItems((prev) => [data, ...prev]);
    setShowAddModal(false);
  }

  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];

  const filtered = items.filter((item) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <Header onAddClick={() => setShowAddModal(true)} />

      {!selectedItem && (
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onBrowseClick={() => {
            document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {selectedItem ? (
          <ListingDetail
            item={selectedItem}
            onBack={() => setSelectedItem(null)}
          />
        ) : (
          <>
            <div id="listings" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-stone-800">Browse the neighborhood</h2>
                <p className="text-stone-500 mt-1">
                  {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'} available near you
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-3 rounded-xl shadow-sm transition-colors"
              >
                <Plus className="w-5 h-5" />
                List an item
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-4 mb-2 -mx-1 px-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-white text-stone-600 border border-stone-200 hover:border-teal-300 hover:text-teal-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-stone-400">
                <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4" />
                <p>Loading listings…</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <X className="w-10 h-10 text-red-400 mb-3" />
                <p className="text-stone-600">{error}</p>
                <button
                  onClick={fetchItems}
                  className="mt-4 text-teal-600 font-semibold hover:text-teal-700"
                >
                  Try again
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-stone-500 text-lg">No listings match your search.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="mt-4 text-teal-600 font-semibold hover:text-teal-700"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <ListingGrid items={filtered} onSelect={setSelectedItem} />
            )}
          </>
        )}
      </main>

      {showAddModal && (
        <AddListingModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddListing}
        />
      )}

      <footer className="bg-stone-800 text-stone-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤝</span>
              <span className="font-bold text-white text-lg">Lendly</span>
            </div>
            <p className="text-sm text-stone-400">
              Borrow, lend, and share with your neighbors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
