import { useState, useRef } from 'react';
import Card, { CardHeader, CardBody } from '../common/Card';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import Alert from '../feedback/Alert';
import { CATEGORIES, PRODUCT_STATUSES, getSubcategories } from '../../services/inventory/inventoryService';

// Dynamic Category Sub-Forms
import ClothingFields from './categoryForms/ClothingFields';
import PujaItemsFields from './categoryForms/PujaItemsFields';
import MandirFields from './categoryForms/MandirFields';
import MurtiFields from './categoryForms/MurtiFields';
import BooksPublicationsFields from './categoryForms/BooksPublicationsFields';
import GiftsAccessoriesFields from './categoryForms/GiftsAccessoriesFields';
import StationeryFields from './categoryForms/StationeryFields';
import OtherProductsFields from './categoryForms/OtherProductsFields';

const DEFAULT_FORM = {
  name: '',
  sku: '',
  upcCode: '',
  hsnCode: '',
  gstPercent: '',
  category: CATEGORIES[0],
  subcategory: getSubcategories(CATEGORIES[0])[0] || '',
  price: '',
  status: PRODUCT_STATUSES[0],
  imageUrl: '',
  details: '',
  categoryData: {},
};

const InventoryForm = ({
  initialData = null,
  isEditMode = false,
  onItemAdded,
  onItemUpdated,
  onCancel,
}) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        name: initialData.name || '',
        sku: initialData.sku || '',
        upcCode: initialData.upcCode || '',
        hsnCode: initialData.hsnCode || '',
        gstPercent: initialData.gstPercent ?? '',
        category: initialData.category || CATEGORIES[0],
        subcategory: initialData.subcategory || '',
        price: initialData.price ?? '',
        status: initialData.status || PRODUCT_STATUSES[0],
        imageUrl: initialData.imageUrl || '',
        details: initialData.details || '',
        categoryData: initialData.categoryData || {},
      };
    }
    return DEFAULT_FORM;
  });

  const [isCustomCategory, setIsCustomCategory] = useState(() =>
    Boolean(initialData?.category && !CATEGORIES.includes(initialData.category))
  );

  const [isCustomSubcategory, setIsCustomSubcategory] = useState(() => {
    if (!initialData?.subcategory) return false;
    const predefinedSubs = getSubcategories(initialData.category);
    return !predefinedSubs.includes(initialData.subcategory);
  });

  // Photo preview and pending file state
  const [pendingPhoto, setPendingPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(initialData?.imageUrl || '');
  const [isSaving, setIsSaving] = useState(false);

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [uploadNotice, setUploadNotice] = useState('');

  const generateSKU = () => {
    const cleanPrefix = (formData.category || 'BAP')
      .split(' ')[0]
      .replace(/[^A-Za-z]/g, '')
      .toUpperCase()
      .slice(0, 3) || 'ITM';
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

  // Instant photo preview in browser — DO NOT save to disk yet!
  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      // Keep in state for instant rendering and defer actual disk write until successful save
      setPendingPhoto({ file, dataUrl, filename: file.name });
      setPhotoPreview(dataUrl);
      setFormData((prev) => ({ ...prev, imageUrl: dataUrl }));
      setUploadNotice(`Selected "${file.name}" — preview ready. It will be saved locally when you save the product.`);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPendingPhoto(null);
    setPhotoPreview('');
    setFormData((prev) => ({ ...prev, imageUrl: '' }));
    setUploadNotice('Photo removed.');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product title is required';
    if (!formData.sku.trim()) errs.sku = 'SKU code is required';
    if (!formData.category.trim()) errs.category = 'Main Category is required';
    if (formData.price === '' || Number(formData.price) <= 0) {
      errs.price = 'Valid product price in ₹ is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    let finalImageUrl = formData.imageUrl;

    // ONLY save photo locally to disk via fs module after form data passes validation!
    if (pendingPhoto) {
      setUploadNotice('Saving photo locally to disk via fs module...');
      try {
        const res = await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dataUrl: pendingPhoto.dataUrl,
            filename: pendingPhoto.filename,
          }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.localUrl) {
            finalImageUrl = json.localUrl;
          }
        }
      } catch (err) {
        console.warn('Backend fs photo upload failed, retaining data URL:', err);
        finalImageUrl = pendingPhoto.dataUrl;
      }
    }

    const payload = {
      name: formData.name.trim(),
      sku: formData.sku.trim().toUpperCase(),
      upcCode: formData.upcCode.trim(),
      hsnCode: formData.hsnCode.trim(),
      gstPercent: formData.gstPercent !== '' ? Number(formData.gstPercent) : 0,
      category: formData.category.trim(),
      subcategory: formData.subcategory.trim(),
      price: Number(formData.price),
      status: formData.status,
      imageUrl: finalImageUrl || 'https://us.baps.store/pub/media/catalog/product/cache/780d9d5f88c415706ac6a8a3a062edca/i/m/img_3636_1.png',
      details: formData.details.trim(),
      categoryData: formData.categoryData || {},
    };

    if (isEditMode && initialData?.id) {
      onItemUpdated({ ...payload, id: initialData.id });
    } else {
      onItemAdded(payload);
      setSuccessMessage(`Product "${formData.name}" under "${formData.category}${formData.subcategory ? ` > ${formData.subcategory}` : ''}" has been saved successfully.`);
      setFormData({
        ...DEFAULT_FORM,
        category: formData.category,
        subcategory: formData.subcategory,
      });
      setPendingPhoto(null);
      setPhotoPreview('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setUploadNotice('');
      setErrors({});
    }
    setIsSaving(false);
  };

  const handleReset = () => {
    if (isEditMode && initialData) {
      setFormData(initialData);
      setPhotoPreview(initialData.imageUrl || '');
    } else {
      setFormData(DEFAULT_FORM);
      setIsCustomCategory(false);
      setIsCustomSubcategory(false);
      setPhotoPreview('');
    }
    setPendingPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploadNotice('');
    setErrors({});
    setSuccessMessage('');
  };

  // Render the appropriate category-specific field group
  const renderCategorySpecificFields = () => {
    switch (formData.category) {
      case 'Books':
      case 'Books & Publications':
        return (
          <BooksPublicationsFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'Ghar Mandirs':
      case 'Mandirs':
        return (
          <MandirFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'Murtis':
        return (
          <MurtiFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'Puja Items':
      case 'Puja Items & Ritual Accessories':
      case 'Brass Puja Items':
      case 'Agarbatti (Incense)':
        return (
          <PujaItemsFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'T-Shirts & Caps':
      case 'Clothing & Wearables':
        return (
          <ClothingFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'Calendars & Diaries':
        return (
          <StationeryFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      case 'View More':
      case 'Gifts & Accessories':
        return (
          <GiftsAccessoriesFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
      default:
        return (
          <OtherProductsFields
            data={formData.categoryData}
            onChange={handleCategoryDataChange}
          />
        );
    }
  };

  const currentPhotoDisplay = photoPreview || formData.imageUrl;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            {isEditMode ? `Edit Product: ${initialData?.name || 'Catalog Item'}` : 'Insert Product & Dynamic Category Attributes'}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            {isEditMode
              ? 'Modify product attributes, dynamic category specifications, pricing, photo, or status.'
              : 'Choose or write main category & subcategory. Photo, codes, and general details apply to all products.'}
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
              subtitle="Select or type main category & subcategory — specific attributes below adapt dynamically"
            />

            <CardBody className="space-y-6">
              {/* Clean Main Category & Subcategory Box without decorative hierarchy banner */}
              <div className="p-4.5 rounded-2xl bg-amber-50/70 border border-amber-200/90 shadow-2xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Main Category */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="category-select"
                        className="block text-xs font-semibold text-stone-700 uppercase tracking-wider"
                      >
                        Main Category <span className="text-orange-600">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          if (isCustomCategory) {
                            setIsCustomCategory(false);
                            setFormData((prev) => ({
                              ...prev,
                              category: CATEGORIES[0],
                              subcategory: getSubcategories(CATEGORIES[0])[0] || '',
                              categoryData: {},
                            }));
                          } else {
                            setIsCustomCategory(true);
                            setFormData((prev) => ({
                              ...prev,
                              category: '',
                              subcategory: '',
                              categoryData: {},
                            }));
                          }
                        }}
                        className="text-xs font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
                      >
                        {isCustomCategory ? '← Choose from dropdown' : '+ Type new category'}
                      </button>
                    </div>

                    {isCustomCategory ? (
                      <Input
                        id="custom-category-input"
                        placeholder="Type new main category name..."
                        required
                        value={formData.category}
                        error={errors.category}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            category: val,
                            categoryData: {},
                          }));
                          if (errors.category) {
                            setErrors((prev) => ({ ...prev, category: '' }));
                          }
                        }}
                      />
                    ) : (
                      <Select
                        id="category-select"
                        required
                        value={formData.category}
                        options={[...CATEGORIES, '+ Type new category...']}
                        className="font-semibold text-stone-900 bg-white"
                        onChange={(e) => {
                          const newCat = e.target.value;
                          if (newCat === '+ Type new category...') {
                            setIsCustomCategory(true);
                            setFormData((prev) => ({
                              ...prev,
                              category: '',
                              subcategory: '',
                              categoryData: {},
                            }));
                          } else {
                            const availableSubs = getSubcategories(newCat);
                            setFormData((prev) => ({
                              ...prev,
                              category: newCat,
                              subcategory: availableSubs[0] || '',
                              categoryData: {},
                            }));
                            setIsCustomSubcategory(false);
                          }
                        }}
                      />
                    )}
                  </div>

                  {/* Subcategory */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="subcategory-select"
                        className="block text-xs font-semibold text-stone-700 uppercase tracking-wider"
                      >
                        Subcategory <span className="text-orange-600">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          if (isCustomSubcategory) {
                            setIsCustomSubcategory(false);
                            setFormData((prev) => ({
                              ...prev,
                              subcategory: getSubcategories(prev.category)[0] || '',
                            }));
                          } else {
                            setIsCustomSubcategory(true);
                            setFormData((prev) => ({
                              ...prev,
                              subcategory: '',
                            }));
                          }
                        }}
                        className="text-xs font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
                      >
                        {isCustomSubcategory ? '← Choose from dropdown' : '+ Type new subcategory'}
                      </button>
                    </div>

                    {isCustomSubcategory ? (
                      <Input
                        id="custom-subcategory-input"
                        placeholder="Type new subcategory name..."
                        value={formData.subcategory}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            subcategory: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <Select
                        id="subcategory-select"
                        required
                        value={formData.subcategory}
                        options={[...getSubcategories(formData.category), '+ Type new subcategory...']}
                        className="font-semibold text-stone-900 bg-white"
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '+ Type new subcategory...') {
                            setIsCustomSubcategory(true);
                            setFormData((prev) => ({ ...prev, subcategory: '' }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              subcategory: val,
                            }));
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Product Title */}
              <div>
                <Input
                  label="Product Title"
                  id="product-name"
                  required
                  placeholder="e.g. Cotton Kurta, Vachanamrut, Brass Aarti Stand"
                  value={formData.name}
                  error={errors.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

              {/* UPC Code, HSN Code, GST % */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Input
                  label="UPC Code"
                  id="upc-code"
                  placeholder="e.g. 8901234567890"
                  value={formData.upcCode}
                  onChange={(e) => setFormData({ ...formData, upcCode: e.target.value })}
                />

                <Input
                  label="HSN Code"
                  id="hsn-code"
                  placeholder="e.g. 6103, 7418, 4901"
                  value={formData.hsnCode}
                  onChange={(e) => setFormData({ ...formData, hsnCode: e.target.value })}
                />

                <Input
                  label="GST %"
                  id="gst-percent"
                  type="number"
                  min="0"
                  max="28"
                  step="0.01"
                  placeholder="e.g. 5, 12, 18"
                  value={formData.gstPercent}
                  onChange={(e) => setFormData({ ...formData, gstPercent: e.target.value })}
                />
              </div>

              {/* Local Photo Upload & Instant Preview (saved via fs module ONLY on successful form save) */}
              <div className="pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                      Product Photo (Instant Preview • Local fs Save on Submit)
                    </label>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Select photo to preview instantly. File is saved to local storage disk only when you click &quot;Save/Update Product&quot;.
                    </p>
                  </div>
                  {currentPhotoDisplay && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="flex-1 w-full space-y-2">
                    <label
                      htmlFor="local-photo-upload"
                      className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-amber-300 rounded-2xl bg-amber-50/40 hover:bg-amber-50/70 transition-colors cursor-pointer text-center group"
                    >
                      <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">📷</span>
                      <span className="text-xs font-bold text-amber-950">
                        Click to browse photo from your device
                      </span>
                      <span className="text-[11px] text-stone-500 mt-0.5">
                        JPEG, PNG, WebP or SVG (preview instantly, saves upon submit)
                      </span>
                      <input
                        ref={fileInputRef}
                        id="local-photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoSelect}
                      />
                    </label>

                    {uploadNotice && (
                      <p className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                        ✓ {uploadNotice}
                      </p>
                    )}
                  </div>

                  {/* Guaranteed Instant Photo Preview Box */}
                  <div className="w-28 h-28 shrink-0 rounded-2xl overflow-hidden border-2 border-amber-300 bg-amber-50/40 flex items-center justify-center shadow-xs">
                    {currentPhotoDisplay ? (
                      <img
                        src={currentPhotoDisplay}
                        alt="Photo Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://us.baps.store/pub/media/catalog/product/cache/780d9d5f88c415706ac6a8a3a062edca/i/m/img_3636_1.png';
                        }}
                      />
                    ) : (
                      <div className="text-center p-2">
                        <span className="text-2xl text-stone-300 block mb-1">🖼️</span>
                        <span className="text-[11px] font-medium text-stone-400 block leading-tight">
                          Photo Preview
                        </span>
                      </div>
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
              title={`2. Specific Attributes for: ${formData.category || 'Product'}`}
              subtitle="Specialized field group adapting to your selected BAPS category"
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
                <Button type="button" variant="outline" onClick={handleReset} disabled={isSaving}>
                  {isEditMode ? 'Revert Changes' : 'Reset All Fields'}
                </Button>
                <Button type="submit" variant="primary" disabled={isSaving}>
                  {isSaving ? 'Saving Product...' : (isEditMode ? 'Update Product' : 'Save Product to Catalog')}
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
