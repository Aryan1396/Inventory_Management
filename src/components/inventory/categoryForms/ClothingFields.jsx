import Input from '../../common/Input';
import Select from '../../common/Select';

const TARGET_AUDIENCE_OPTIONS = ['Men', 'Women', 'Kids', 'Unisex', 'Saints / Sadhu'];
const SLEEVE_OPTIONS = ['Full Sleeve', 'Half Sleeve', 'Sleeveless', 'Mandarin Collar', 'Round Neck', 'V-Neck', 'Not Applicable'];

const ClothingFields = ({ data = {}, onChange }) => {
  const handleChange = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  return (
    <div className="space-y-5 rounded-2xl bg-amber-50/40 p-5 sm:p-6 border border-amber-200/70">
      <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
        <span className="text-base">👔</span>
        <h4 className="font-bold text-stone-900 text-sm tracking-tight">
          1. Clothing & Wearables Specifications
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Product Type"
          id="cloth-type"
          placeholder="e.g. Kurta, Dhoti"
          value={data.productType || ''}
          onChange={(e) => handleChange('productType', e.target.value)}
        />

        <Select
          label="Target Audience"
          id="cloth-audience"
          value={data.targetAudience || TARGET_AUDIENCE_OPTIONS[0]}
          options={TARGET_AUDIENCE_OPTIONS}
          onChange={(e) => handleChange('targetAudience', e.target.value)}
        />

        <Input
          label="Fabric / Material"
          id="cloth-fabric"
          placeholder="e.g. Khadi Cotton, Linen"
          value={data.fabricMaterial || ''}
          onChange={(e) => handleChange('fabricMaterial', e.target.value)}
        />

        <Input
          label="Available Sizes"
          id="cloth-sizes"
          placeholder="e.g. M, L"
          value={data.availableSizes || ''}
          onChange={(e) => handleChange('availableSizes', e.target.value)}
        />

        <Input
          label="Available Colors"
          id="cloth-colors"
          placeholder="e.g. White, Saffron"
          value={data.availableColors || ''}
          onChange={(e) => handleChange('availableColors', e.target.value)}
        />

        <Select
          label="Sleeve / Neck Type"
          id="cloth-sleeve"
          value={data.sleeveNeckType || SLEEVE_OPTIONS[0]}
          options={SLEEVE_OPTIONS}
          onChange={(e) => handleChange('sleeveNeckType', e.target.value)}
        />

        <Input
          label="Size Chart Reference"
          id="cloth-size-chart"
          placeholder="e.g. Regular Fit, Chest 40"
          value={data.sizeChart || ''}
          onChange={(e) => handleChange('sizeChart', e.target.value)}
        />

        <Input
          label="Variant-wise SKU, Price & Stock"
          id="cloth-variants"
          placeholder="e.g. Sz-38: ₹850, Sz-40: ₹890"
          value={data.variantDetails || ''}
          onChange={(e) => handleChange('variantDetails', e.target.value)}
        />
      </div>
    </div>
  );
};

export default ClothingFields;
