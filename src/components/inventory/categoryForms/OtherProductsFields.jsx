import Input from '../../common/Input';

const OtherProductsFields = ({ data = {}, onChange }) => {
  const handleChange = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  return (
    <div className="space-y-5 rounded-2xl bg-amber-50/40 p-5 sm:p-6 border border-amber-200/70">
      <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
        <span className="text-base">📦</span>
        <h4 className="font-bold text-stone-900 text-sm tracking-tight">
          9. Other / Special Products Specifications
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Product Type"
          id="other-prod-type"
          placeholder="e.g. Festival Samagri, Souvenir"
          value={data.productType || ''}
          onChange={(e) => handleChange('productType', e.target.value)}
        />

        <Input
          label="Material (if applicable)"
          id="other-material"
          placeholder="e.g. Wood, Metal"
          value={data.material || ''}
          onChange={(e) => handleChange('material', e.target.value)}
        />

        <div className="sm:col-span-2">
          <Input
            label="Dimensions / Weight (if applicable)"
            id="other-dimensions-weight"
            placeholder="e.g. 12 x 8 inches, 450 grams"
            value={data.dimensionsWeight || ''}
            onChange={(e) => handleChange('dimensionsWeight', e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="other-specs"
            className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5"
          >
            Additional Specifications
          </label>
          <textarea
            id="other-specs"
            rows={3}
            placeholder="Enter unique properties, batch details, or care instructions..."
            value={data.additionalSpecifications || ''}
            onChange={(e) => handleChange('additionalSpecifications', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none bg-white text-stone-900 border-stone-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15 placeholder:text-stone-400 shadow-2xs"
          />
        </div>
      </div>
    </div>
  );
};

export default OtherProductsFields;
