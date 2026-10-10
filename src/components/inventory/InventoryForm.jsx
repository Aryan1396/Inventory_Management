import { useState } from 'react';
import Card, { CardHeader, CardBody } from '../common/Card';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import Alert from '../feedback/Alert';
import { CATEGORIES, PRODUCT_STATUSES } from '../../services/inventory/inventoryService';

// Dynamic Category Sub-Forms
import ClothingFields from './categoryForms/ClothingFields';
import PujaItemsFields from './categoryForms/PujaItemsFields';
import MandirsMurtisFields from './categoryForms/MandirsMurtisFields';
import BooksPublicationsFields from './categoryForms/BooksPublicationsFields';
import GiftsAccessoriesFields from './categoryForms/GiftsAccessoriesFields';
import PrintsPhotosFields from './categoryForms/PrintsPhotosFields';
import StationeryFields from './categoryForms/StationeryFields';
import DigitalMediaFields from './categoryForms/DigitalMediaFields';
import OtherProductsFields from './categoryForms/OtherProductsFields';

const DEFAULT_FORM = {
  name: '',
  sku: '',
  category: CATEGORIES[0],
  brand: 'Swaminarayan Aksharpith',
  price: '',
  status: PRODUCT_STATUSES[0],
  imageUrl: '',
  details: '',
  categoryData: {},
};

const SAMPLE_PHOTO_URL = 'https://us.baps.store/pub/media/catalog/product/cache/780d9d5f88c415706ac6a8a3a062edca/i/m/img_3636_1.png';

const InventoryForm = ({ onItemAdded, onCancel }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const generateSKU = () => {
    const cleanPrefix = formData.category
      .split(' ')[0]
      .replace(/[^A-Za-z]/g, '')
      .toUpperCase()
      .slice(0, 3);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setFormData((prev) => ({ ...prev, sku: `BAPS-${cleanPrefix}-${randomNum}` }));
    if (errors.sku) {
      setErrors((prev) => ({ ...prev, sku: '' }));
    }
  };

  const handleCategoryDataChange = (updatedData) => {
    setFormData((prev) => ({
      ...prev,
      categoryData: updatedData,
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product title is required';
    if (!formData.sku.trim()) errs.sku = 'SKU code is required';
    if (formData.price === '' || Number(formData.price) <= 0) {
      errs.price = 'Valid product price in ₹ is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onItemAdded({
      name: formData.name.trim(),
      sku: formData.sku.trim().toUpperCase(),
      category: formData.category,
      brand: formData.brand.trim() || 'Swaminarayan Aksharpith',
      price: Number(formData.price),
      status: formData.status,
      imageUrl: formData.imageUrl.trim() || SAMPLE_PHOTO_URL,
      details: formData.details.trim(),
      categoryData: formData.categoryData || {},
    });

    setSuccessMessage(`Product "${formData.name}" under "${formData.category}" has been saved successfully.`);
    setFormData({
      ...DEFAULT_FORM,
      category: formData.category, // Keep the current category for easy consecutive entry
    });
    setErrors({});
  };

  const handleReset = () => {
    setFormData(DEFAULT_FORM);
    setErrors({});
    setSuccessMessage('');
  };

  // Render the appropriate category-specific field group
  const renderCategorySpecificFields = () => {
    switch (formData.category) {
      case 'Clothing & Wearables':
        return (
          <ClothingFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'Puja Items & Ritual Accessories':
        return (
          <PujaItemsFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'Mandirs & Murtis':
        return (
          <MandirsMurtisFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'Books & Publications':
        return (
          <BooksPublicationsFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'Gifts & Accessories':
        return (
          <GiftsAccessoriesFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'Prints & Photographs':
        return (
          <PrintsPhotosFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'Wedding & Invitation Stationery':
        return (
          <StationeryFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'Digital & Media Products':
        return (
          <DigitalMediaFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'Other / Special Products':
        return (
          <OtherProductsFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Insert Product & Dynamic Category Attributes
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Choose a category to display its dedicated specifications. Photo and general details apply to all products.
          </p>
        </div>
        {onCancel && (
          <Button variant="outline" size="sm" onClick={onCancel}>
            ← Back to Inventory
          </Button>
        )}
      </div>

      {successMessage && (
        <Alert
          type="success"
          title="Product Saved to Catalog"
          dismissible
          onDismiss={() => setSuccessMessage('')}
        >
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <div className="p-6 sm:p-7 space-y-6">
            <CardHeader
              title="1. Core Identification & Category Selection"
              subtitle="Select category first — specific fields below will adapt dynamically"
            />

            <CardBody className="space-y-6">
              {/* Category Selector */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-300/80 shadow-2xs">
                <div className="mb-2">
                  <label
                    htmlFor="category-select"
                    className="block text-xs font-black text-amber-950 uppercase tracking-wider"
                  >
                    Select Product Category <span className="text-orange-600">*</span>
                  </label>
                </div>
                <Select
                  id="category-select"
                  required
                  value={formData.category}
                  options={CATEGORIES}
                  className="font-semibold text-stone-900 bg-white"
                  onChange={(e) => {
                    const newCat = e.target.value;
                    setFormData({
                      ...formData,
                      category: newCat,
                      categoryData: {}, // Reset specific fields when category changes
                    });
                  }}
                />
              </div>

              {/* Product Title & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Product Title"
                  id="product-name"
                  required
                  placeholder="e.g. Cotton Kurta, Vachanamrut"
                  value={formData.name}
                  error={errors.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <Input
                  label="Brand / Publisher / Manufacturer"
                  id="brand-input"
                  placeholder="e.g. Swaminarayan Aksharpith, BAPS Amrut"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>

              {/* SKU, Price, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="product-sku"
                      className="block text-xs font-semibold text-stone-700 uppercase tracking-wider"
                    >
                      SKU Code <span className="text-orange-600">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={generateSKU}
                      className="text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline cursor-pointer"
                    >
                      Generate SKU
                    </button>
                  </div>
                  <Input
                    id="product-sku"
                    placeholder="e.g. BAPS-CLO-4921"
                    value={formData.sku}
                    error={errors.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  />
                </div>

                <Input
                  label="Price (₹ INR)"
                  id="price-input"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  prefix="₹"
                  placeholder="0.00"
                  value={formData.price}
                  error={errors.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />

                <Select
                  label="Catalog Status"
                  id="status-select"
                  required
                  value={formData.status}
                  options={PRODUCT_STATUSES}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                />
              </div>

              {/* Photo Upload / URL (Applies to ALL categories!) */}
              <div className="pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="image-url"
                    className="block text-xs font-semibold text-stone-700 uppercase tracking-wider"
                  >
                    Product Photo URL (All Categories)
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: SAMPLE_PHOTO_URL })}
                    className="text-xs font-medium text-amber-700 hover:text-amber-900 hover:underline cursor-pointer"
                  >
                    Use Sample Photo
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="flex-1 w-full">
                    <Input
                      id="image-url"
                      placeholder="https://images.unsplash.com/... or baps.store image URL"
                      value={formData.imageUrl}
                      helperText="Paste direct image link (JPEG, PNG, WebP)"
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                  </div>

                  {/* Photo Preview Box */}
                  <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 border-dashed border-amber-300 bg-amber-50/50 flex items-center justify-center shadow-2xs">
                    {formData.imageUrl ? (
                      <img
                        src={formData.imageUrl}
                        alt="Photo Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = SAMPLE_PHOTO_URL;
                        }}
                      />
                    ) : (
                      <span className="text-xs font-medium text-amber-800/60 text-center px-1">
                        Live Photo Preview
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </div>
        </Card>

        {/* 2. DYNAMIC CATEGORY-SPECIFIC FORM SECTION */}
        <Card>
          <div className="p-6 sm:p-7 space-y-6">
            <CardHeader
              title={`2. Specific Attributes for: ${formData.category}`}
              subtitle="Required and specialized fields for this exact category"
            />

            <CardBody>
              {renderCategorySpecificFields()}
            </CardBody>
          </div>
        </Card>

        {/* 3. GENERAL SACRED DETAILS & DESCRIPTION */}
        <Card>
          <div className="p-6 sm:p-7 space-y-6">
            <CardHeader
              title="3. General Sacred Description & Notes"
              subtitle="Comprehensive description, significance, and devotee instructions"
            />

            <CardBody className="space-y-6">
              <div>
                <textarea
                  id="general-details"
                  rows={4}
                  placeholder="Provide spiritual significance, sanctification notes, packaging details, care instructions..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none bg-white text-stone-900 border-stone-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15 placeholder:text-stone-400 shadow-2xs"
                />
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <Button type="button" variant="outline" onClick={handleReset}>
                  Reset All Fields
                </Button>
                <Button type="submit" variant="primary">
                  Save Product to Catalog
                </Button>
              </div>
            </CardBody>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default InventoryForm;
