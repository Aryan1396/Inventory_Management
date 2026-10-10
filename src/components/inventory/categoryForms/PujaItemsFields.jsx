import Input from '../../common/Input';

const PujaItemsFields = ({ data = {}, onChange }) => {
  const handleChange = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  return (
    <div className="space-y-5 rounded-2xl bg-amber-50/40 p-5 sm:p-6 border border-amber-200/70">
      <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
        <span className="text-base">🪔</span>
        <h4 className="font-bold text-stone-900 text-sm tracking-tight">
          2. Puja Items & Ritual Accessories Specifications
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Item Type"
          id="puja-item-type"
          placeholder="e.g. Aarti Divi, Thali Set"
          value={data.itemType || ''}
          onChange={(e) => handleChange('itemType', e.target.value)}
        />

        <Input
          label="Material"
          id="puja-material"
          placeholder="e.g. Pure Brass, Copper"
          value={data.material || ''}
          onChange={(e) => handleChange('material', e.target.value)}
        />

        <Input
          label="Weight / Volume / Pack Quantity"
          id="puja-weight"
          placeholder="e.g. 500g, Pack of 100"
          value={data.weightVolume || ''}
          onChange={(e) => handleChange('weightVolume', e.target.value)}
        />

        <Input
          label="Number of Pieces"
          id="puja-pieces"
          placeholder="e.g. 1 Piece, 6 Pcs Set"
          value={data.numberOfPieces || ''}
          onChange={(e) => handleChange('numberOfPieces', e.target.value)}
        />

        <Input
          label="Color / Fragrance (if applicable)"
          id="puja-color-fragrance"
          placeholder="e.g. Kesar Chandan, Mogra"
          value={data.colorFragrance || ''}
          onChange={(e) => handleChange('colorFragrance', e.target.value)}
        />

        <Input
          label="Dimensions (if applicable)"
          id="puja-dimensions"
          placeholder="e.g. 10 inch Diameter, 4 inch Height"
          value={data.dimensions || ''}
          onChange={(e) => handleChange('dimensions', e.target.value)}
        />

        <div className="sm:col-span-2">
          <Input
            label="Included Items & Quantities (for Kits & Sets)"
            id="puja-included"
            placeholder="e.g. 1 Thali, 1 Aarti Divi"
            value={data.includedItems || ''}
            onChange={(e) => handleChange('includedItems', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PujaItemsFields;
