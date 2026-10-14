import { useState, useMemo, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Select from '../common/Select';
import { CATEGORIES, PRODUCT_STATUSES, getSubcategories, CATEGORY_SUBCATEGORIES_MAP } from '../../services/inventory/inventoryService';

const InventoryTable = ({
  items = [],
  onDeleteItem,
  onEditItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All Subcategories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Dynamically include any custom categories present in items
  const categoryOptions = useMemo(() => {
    const itemCats = items.map((i) => i.category).filter(Boolean);
    const combined = Array.from(new Set([...CATEGORIES, ...itemCats]));
    return ['All Categories', ...combined];
  }, [items]);

  const statusOptions = ['All Statuses', ...PRODUCT_STATUSES];

  // Dynamically include any custom subcategories present in items
  const subcategoryOptions = useMemo(() => {
    if (selectedCategory !== 'All Categories') {
      const predefined = getSubcategories(selectedCategory);
      const itemSubs = items
        .filter((i) => i.category === selectedCategory)
        .map((i) => i.subcategory)
        .filter(Boolean);
      return ['All Subcategories', ...Array.from(new Set([...predefined, ...itemSubs]))];
    }
    const allPredefined = Object.values(CATEGORY_SUBCATEGORIES_MAP).flat();
    const allItemSubs = items.map((i) => i.subcategory).filter(Boolean);
    return ['All Subcategories', ...Array.from(new Set([...allPredefined, ...allItemSubs]))];
  }, [selectedCategory, items]);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProductDetails) {
        setSelectedProductDetails(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProductDetails]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        (item.upcCode && item.upcCode.toLowerCase().includes(q)) ||
        (item.hsnCode && item.hsnCode.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.subcategory && item.subcategory.toLowerCase().includes(q)) ||
        (item.details && item.details.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === 'All Categories' || item.category === selectedCategory;

      const matchesSubcategory =
        selectedSubcategory === 'All Subcategories' || item.subcategory === selectedSubcategory;

      const matchesStatus =
        selectedStatus === 'All Statuses' || item.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesSubcategory && matchesStatus;
    });
  }, [items, searchQuery, selectedCategory, selectedSubcategory, selectedStatus]);

  const handleDeleteConfirm = (id) => {
    onDeleteItem(id);
    setDeletingId(null);
    if (selectedProductDetails?.id === id) {
      setSelectedProductDetails(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Toolbar */}
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <svg
              className="w-4 h-4 text-amber-600/70 absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search BAPS products, subcategories, UPC, HSN, details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none bg-white text-stone-900 border-stone-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15 placeholder:text-stone-400 shadow-2xs"
            />
          </div>

          {/* Filter Dropdowns: Main Category, Subcategory, Status */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* Main Category */}
            <div className="w-full sm:w-48">
              <Select
                id="filter-category"
                value={selectedCategory}
                options={categoryOptions}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory('All Subcategories');
                }}
              />
            </div>

            {/* Subcategory */}
            <div className="w-full sm:w-52">
              <Select
                id="filter-subcategory"
                value={selectedSubcategory}
                options={subcategoryOptions}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              />
            </div>

            {/* Status */}
            <div className="w-full sm:w-36">
              <Select
                id="filter-status"
                value={selectedStatus}
                options={statusOptions}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Active Filter Clear Info */}
        {(searchQuery || selectedCategory !== 'All Categories' || selectedSubcategory !== 'All Subcategories' || selectedStatus !== 'All Statuses') && (
          <div className="mt-3.5 pt-3.5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-stone-500">
              Showing <strong className="text-stone-800">{filteredItems.length}</strong> of{' '}
              <strong className="text-stone-800">{items.length}</strong> total products
            </span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
                setSelectedSubcategory('All Subcategories');
                setSelectedStatus('All Statuses');
              }}
              className="text-xs font-bold text-orange-700 hover:text-orange-900 hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
      </Card>

      {/* Main Table Card */}
      <Card className="overflow-hidden">
        <div className="px-6 py-4.5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <h3 className="font-bold text-stone-900 text-sm">
              BAPS Catalog Products
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Click product name or &quot;View Details&quot; to inspect full photos, specs, UPC, and HSN codes
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200">
            {filteredItems.length} items listed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/90 border-b border-stone-200 text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                <th className="py-3.5 pl-6 pr-4 min-w-[240px] max-w-xs">Product & Photo</th>
                <th className="py-3.5 px-3 whitespace-nowrap">SKU Code</th>
                <th className="py-3.5 px-3 text-center whitespace-nowrap">Category / Subcategory</th>
                <th className="py-3.5 px-3 whitespace-nowrap">Price</th>
                <th className="py-3.5 px-3 text-center whitespace-nowrap">Status</th>
                <th className="py-3.5 pl-3 pr-6 sm:pr-8 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-sm">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-stone-500">
                    <div className="max-w-xs mx-auto space-y-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 text-xl">
                        🛕
                      </div>
                      <p className="font-bold text-stone-900 text-sm">
                        No matching BAPS products found
                      </p>
                      <p className="text-xs text-stone-500">
                        Try clearing search terms or check category & subcategory filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-amber-50/25 transition-colors group"
                  >
                    {/* Product Photo Thumbnail + Name + Details preview */}
                    <td className="py-7 pl-6 pr-4 min-w-[280px] max-w-sm">
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-amber-200/90 bg-stone-100 shadow-xs">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://us.baps.store/pub/media/catalog/product/cache/780d9d5f88c415706ac6a8a3a062edca/i/m/img_3636_1.png';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl text-stone-400">
                              🛕
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => setSelectedProductDetails(item)}
                            className="text-left font-bold text-stone-900 hover:text-amber-700 transition-colors cursor-pointer block break-words whitespace-normal leading-snug line-clamp-2"
                            title={item.name}
                          >
                            {item.name}
                          </button>
                          <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 break-words whitespace-normal">
                            {item.details || 'No additional details.'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* SKU Code */}
                    <td className="py-7 px-3 font-mono text-xs font-semibold text-amber-900/80 whitespace-nowrap">
                      {item.sku}
                    </td>

                    {/* Category & Subcategory - Vertical stack with natural wrap */}
                    <td className="py-7 px-3 text-center">
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <span className="inline-flex items-center justify-center text-center px-2.5 py-1 rounded-xl text-xs font-bold border border-orange-200/80 bg-orange-50 text-orange-900 max-w-[150px] leading-tight break-words shadow-2xs">
                          {item.category}
                        </span>
                        {item.subcategory && (
                          <span className="inline-flex items-center justify-center text-center px-2 py-0.5 rounded-lg text-[11px] font-medium border border-amber-200/70 bg-amber-50/60 text-amber-800 max-w-[150px] leading-tight break-words">
                            {item.subcategory}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-7 px-3 font-bold text-stone-900 text-sm whitespace-nowrap">
                      ₹{Number(item.price).toFixed(2)}
                    </td>

                    {/* Status */}
                    <td className="py-7 px-3 text-center whitespace-nowrap">
                      <div className="flex justify-center">
                        <Badge variant={item.status}>
                          {item.status}
                        </Badge>
                      </div>
                    </td>

                    {/* Actions - bold view details, bold edit, bold delete with padding */}
                    <td className="py-7 pl-3 pr-6 sm:pr-8 text-right whitespace-nowrap">
                      {deletingId === item.id ? (
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleDeleteConfirm(item.id)}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer shadow-2xs"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingId(null)}
                            className="px-2 py-1 rounded-lg text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="font-bold text-stone-800 hover:text-stone-950"
                            onClick={() => setSelectedProductDetails(item)}
                          >
                            View Details
                          </Button>
                          {onEditItem && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="font-bold text-amber-900 hover:text-amber-950 hover:bg-amber-50 border-amber-300"
                              onClick={() => onEditItem(item)}
                            >
                              Edit
                            </Button>
                          )}
                          <button
                            type="button"
                            onClick={() => setDeletingId(item.id)}
                            className="p-1.5 rounded-lg text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete product"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Full Product & Photo Details Modal Dialog */}
      {selectedProductDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-stone-900/50 backdrop-blur-xs overflow-y-auto cursor-pointer"
          onClick={() => setSelectedProductDetails(null)}
        >
          <div
            className="bg-white rounded-3xl border border-amber-200/90 shadow-2xl max-w-4xl w-full p-6 sm:p-8 md:p-9 space-y-6 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Title, Edit & Close */}
            <div className="flex items-start justify-between border-b border-stone-100 pb-5">
              <div className="space-y-1.5 pr-4">
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/80">
                  {selectedProductDetails.sku}
                </span>
                <h3 className="text-2xl font-black text-stone-900 tracking-tight leading-snug">
                  {selectedProductDetails.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {onEditItem && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-bold text-amber-900 border-amber-300 hover:bg-amber-50"
                    onClick={() => {
                      const itemToEdit = selectedProductDetails;
                      setSelectedProductDetails(null);
                      onEditItem(itemToEdit);
                    }}
                  >
                    ✏️ Edit
                  </Button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedProductDetails(null)}
                  className="text-stone-400 hover:text-stone-800 p-2 rounded-2xl hover:bg-stone-100 transition-colors cursor-pointer text-xl font-bold"
                  title="Close (or click outside)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Photo Showcase & Key Attributes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Photo */}
              <div className="rounded-2xl overflow-hidden border border-amber-200/80 bg-stone-50 h-72 sm:h-80 flex items-center justify-center shadow-inner">
                {selectedProductDetails.imageUrl ? (
                  <img
                    src={selectedProductDetails.imageUrl}
                    alt={selectedProductDetails.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://us.baps.store/pub/media/catalog/product/cache/780d9d5f88c415706ac6a8a3a062edca/i/m/img_3636_1.png';
                    }}
                  />
                ) : (
                  <div className="text-6xl text-stone-300">🛕</div>
                )}
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-3.5 text-xs content-start">
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100/80">
                  <span className="text-stone-500 block mb-1 font-medium">Category & Subcategory</span>
                  <span className="font-bold text-amber-950 text-sm block">
                    {selectedProductDetails.category}
                  </span>
                  {selectedProductDetails.subcategory && (
                    <span className="inline-block mt-1 text-xs font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md border border-amber-200/80">
                      {selectedProductDetails.subcategory}
                    </span>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100/80">
                  <span className="text-stone-500 block mb-1 font-medium">HSN / GST</span>
                  <span className="font-bold text-amber-950 text-sm">
                    {selectedProductDetails.hsnCode || 'N/A'} • {selectedProductDetails.gstPercent ?? 0}% GST
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100/80">
                  <span className="text-stone-500 block mb-1 font-medium">Price</span>
                  <span className="font-black text-orange-700 text-lg">
                    ₹{Number(selectedProductDetails.price).toFixed(2)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/80">
                  <span className="text-stone-500 block mb-1 font-medium">Status</span>
                  <div className="mt-1">
                    <Badge variant={selectedProductDetails.status}>
                      {selectedProductDetails.status}
                    </Badge>
                  </div>
                </div>

                <div className="col-span-2 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 text-xs text-stone-600 flex flex-wrap items-center justify-between gap-2">
                  <span>Product ID: <strong className="text-stone-900 font-mono">{selectedProductDetails.id}</strong></span>
                  {selectedProductDetails.upcCode && (
                    <span>UPC Code: <strong className="text-stone-900 font-mono">{selectedProductDetails.upcCode}</strong></span>
                  )}
                  <span>Catalog Date: <strong className="text-stone-900">{selectedProductDetails.createdAt || 'N/A'}</strong></span>
                </div>
              </div>
            </div>

            {/* DYNAMIC CATEGORY ATTRIBUTES (rendered when available) */}
            {selectedProductDetails.categoryData && Object.keys(selectedProductDetails.categoryData).length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
                  <span>Category Specific Specifications</span>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full border border-amber-200">
                    {selectedProductDetails.category} {selectedProductDetails.subcategory ? `• ${selectedProductDetails.subcategory}` : ''}
                  </span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 text-xs">
                  {Object.entries(selectedProductDetails.categoryData).map(([key, val]) => {
                    if (!val) return null;
                    const formattedKey = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase());
                    return (
                      <div key={key} className="bg-white p-3 rounded-xl border border-amber-100 shadow-2xs">
                        <span className="text-[11px] font-semibold text-stone-500 block">
                          {formattedKey}
                        </span>
                        <span className="font-bold text-stone-900 text-xs mt-1 block break-words">
                          {String(val)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Specifications & Details Text */}
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                Sacred Details & Description
              </h4>
              <div className="p-4.5 rounded-2xl bg-stone-50/80 border border-stone-200/80 text-xs text-stone-700 leading-relaxed whitespace-pre-wrap">
                {selectedProductDetails.details || 'No detailed specifications recorded.'}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <span className="text-xs text-amber-800/80 font-medium">
                Verified BAPS.STORE Item
              </span>
              <div className="flex items-center gap-2.5">
                {onEditItem && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="font-bold"
                    onClick={() => {
                      const itemToEdit = selectedProductDetails;
                      setSelectedProductDetails(null);
                      onEditItem(itemToEdit);
                    }}
                  >
                    ✏️ Edit Product
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold text-stone-800"
                  onClick={() => setSelectedProductDetails(null)}
                >
                  Close Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
