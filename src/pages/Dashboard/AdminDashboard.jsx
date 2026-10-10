import InventoryTable from '../../components/inventory/InventoryTable';
import InventoryForm from '../../components/inventory/InventoryForm';

const AdminDashboard = ({
  activeTab,
  onSelectTab,
  items,
  onItemAdded,
  onDeleteItem,
}) => {
  return (
    <div className="space-y-8">
      {/* Aesthetic Hero Banner with the ONLY Segmented Switcher Control */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-6 sm:p-8 shadow-md shadow-orange-600/15">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-48 h-48 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Header titles */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-100 text-xs font-semibold uppercase tracking-wider mb-2.5 border border-white/20">
              <span>BAPS.STORE</span>
              <span>•</span>
              <span>Catalog Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              BAPS Swaminarayan Aksharpith Portal
            </h1>
            <p className="text-amber-100/90 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Maintain books, puja essentials, agarbatti, authentic kanthis, and ghar mandirs with photos and specifications.
            </p>
          </div>

          {/* THE SINGLE, UNIFIED SWITCHER BUTTON (Given ONLY ONCE in the whole application) */}
          <div className="shrink-0 bg-white/15 backdrop-blur-md p-1.5 rounded-2xl border border-white/25 flex items-center shadow-lg">
            <button
              type="button"
              onClick={() => onSelectTab('view')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'view'
                  ? 'bg-white text-orange-700 shadow-md shadow-stone-900/10'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <span>View Inventory</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${
                  activeTab === 'view'
                    ? 'bg-amber-100 text-orange-800'
                    : 'bg-white/25 text-white'
                }`}
              >
                {items.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('insert')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'insert'
                  ? 'bg-white text-orange-700 shadow-md shadow-stone-900/10'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <span>+ Insert Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content View */}
      {activeTab === 'insert' ? (
        <InventoryForm
          onItemAdded={onItemAdded}
          onCancel={() => onSelectTab('view')}
        />
      ) : (
        <InventoryTable
          items={items}
          onDeleteItem={onDeleteItem}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
