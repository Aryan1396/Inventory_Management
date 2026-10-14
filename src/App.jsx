import { useState } from 'react';
import AdminNavbar from './components/layout/AdminNavbar';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import { inventoryService } from './services/inventory/inventoryService';

const App = () => {
  const [activeTab, setActiveTab] = useState('view');
  const [items, setItems] = useState(() => inventoryService.getAll());
  const [editingItem, setEditingItem] = useState(null);

  const handleItemAdded = (newItemData) => {
    const updated = inventoryService.addItem(newItemData);
    setItems(updated);
    setActiveTab('view');
  };

  const handleItemUpdated = (updatedItemData) => {
    const updated = inventoryService.updateItem(updatedItemData.id, updatedItemData);
    setItems(updated);
    setEditingItem(null);
    setActiveTab('view');
  };

  const handleStartEdit = (item) => {
    setEditingItem(item);
    setActiveTab('insert');
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setActiveTab('view');
  };

  const handleDeleteItem = (id) => {
    const updated = inventoryService.deleteItem(id);
    setItems(updated);
    if (editingItem?.id === id) {
      setEditingItem(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col antialiased selection:bg-amber-500 selection:text-white">
      {/* Clean Aesthetic BAPS Header */}
      <AdminNavbar />

      {/* Main Spacious Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <AdminDashboard
          activeTab={activeTab}
          onSelectTab={(tab) => {
            if (tab === 'insert' && activeTab === 'view') {
              setEditingItem(null); // When clicking Insert Data directly from view, start fresh
            }
            setActiveTab(tab);
          }}
          items={items}
          editingItem={editingItem}
          onStartEdit={handleStartEdit}
          onItemAdded={handleItemAdded}
          onItemUpdated={handleItemUpdated}
          onDeleteItem={handleDeleteItem}
          onCancelEdit={handleCancelEdit}
        />
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-stone-200/80 bg-white/70 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} BAPS Swaminarayan Aksharpith. All rights reserved.</span>
          <span className="text-amber-800 font-medium">BAPS.STORE • Official Administration Portal</span>
        </div>
      </footer>
    </div>
  );
};

export default App;