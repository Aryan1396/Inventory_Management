import Input from '../../common/Input';

const GiftsAccessoriesFields = ({ data = {}, onChange }) => {
  const handleChange = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  return (
    <div className="space-y-5 rounded-2xl bg-amber-50/40 p-5 sm:p-6 border border-amber-200/70">
      <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
        <span className="text-base">🎁</span>
        <h4 className="font-bold text-stone-900 text-sm tracking-tight">
          5. Gifts & Accessories Specifications
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Product Type"
          id="gift-type"
          placeholder="e.g. Dashboard Standee, Keyring"
          value={data.productType || ''}
          onChange={(e) => handleChange('productType', e.target.value)}
        />

        <Input
          label="Material"
          id="gift-material"
          placeholder="e.g. Acrylic, Gold Foil"
          value={data.material || ''}
          onChange={(e) => handleChange('material', e.target.value)}
        />

        <Input
          label="Color / Design"
          id="gift-color-design"
          placeholder="e.g. Lotus Motif, Gold Plated"
          value={data.colorDesign || ''}
          onChange={(e) => handleChange('colorDesign', e.target.value)}
        />

        <Input
          label="Dimensions"
          id="gift-dimensions"
          placeholder='e.g. 3.5" x 2.5", 4" x 3"'
          value={data.dimensions || ''}
          onChange={(e) => handleChange('dimensions', e.target.value)}
        />

        <Input
          label="Pack Quantity"
          id="gift-pack-qty"
          placeholder="e.g. 1 Piece, Pack of 5"
          value={data.packQuantity || ''}
          onChange={(e) => handleChange('packQuantity', e.target.value)}
        />

        <Input
          label="Compatibility (for Car/Mobile Accessories)"
          id="gift-compatibility"
          placeholder="e.g. Car Dashboards, Study Desks"
          value={data.compatibility || ''}
          onChange={(e) => handleChange('compatibility', e.target.value)}
        />

        <div className="sm:col-span-2">
          <Input
            label="Personalization Options (if applicable)"
            id="gift-personalization"
            placeholder="e.g. Custom Engraving, Gift Box"
            value={data.personalizationOptions || ''}
            onChange={(e) => handleChange('personalizationOptions', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default GiftsAccessoriesFields;
