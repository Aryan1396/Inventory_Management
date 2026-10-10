import Input from '../../common/Input';
import Select from '../../common/Select';

const MOUNTING_OPTIONS = ['Floor Standing', 'Tabletop', 'Wall Mount', 'Floor or Tabletop', 'Car Dashboard', 'Not Applicable'];

const MandirsMurtisFields = ({ data = {}, onChange }) => {
  const handleChange = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  return (
    <div className="space-y-5 rounded-2xl bg-amber-50/40 p-5 sm:p-6 border border-amber-200/70">
      <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
        <span className="text-base">🛕</span>
        <h4 className="font-bold text-stone-900 text-sm tracking-tight">
          3. Mandirs & Murtis Specifications
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Product Type"
          id="mandir-type"
          placeholder="e.g. Wooden Mandir, Brass Murti"
          value={data.productType || ''}
          onChange={(e) => handleChange('productType', e.target.value)}
        />

        <Input
          label="Deity Name (for Murtis)"
          id="mandir-deity"
          placeholder="e.g. Bhagwan Swaminarayan, Radha-Krishna"
          value={data.deityName || ''}
          onChange={(e) => handleChange('deityName', e.target.value)}
        />

        <Input
          label="Material / Wood Type"
          id="mandir-material"
          placeholder="e.g. Sheesham Wood, Makrana Marble"
          value={data.materialWood || ''}
          onChange={(e) => handleChange('materialWood', e.target.value)}
        />

        <Input
          label="Finish / Color"
          id="mandir-finish"
          placeholder="e.g. Teak Polish, Antique Gold"
          value={data.finishColor || ''}
          onChange={(e) => handleChange('finishColor', e.target.value)}
        />

        <Input
          label="Height, Width and Depth"
          id="mandir-dimensions"
          placeholder='e.g. 36" x 24" x 16"'
          value={data.dimensionsHWD || ''}
          onChange={(e) => handleChange('dimensionsHWD', e.target.value)}
        />

        <Input
          label="Weight"
          id="mandir-weight"
          placeholder="e.g. 15 kg, 2.5 kg"
          value={data.weight || ''}
          onChange={(e) => handleChange('weight', e.target.value)}
        />

        <Select
          label="Mounting Type"
          id="mandir-mounting"
          value={data.mountingType || MOUNTING_OPTIONS[0]}
          options={MOUNTING_OPTIONS}
          onChange={(e) => handleChange('mountingType', e.target.value)}
        />

        <Input
          label="Included Accessories"
          id="mandir-accessories"
          placeholder="e.g. LED Light, Velvet Aasan"
          value={data.includedAccessories || ''}
          onChange={(e) => handleChange('includedAccessories', e.target.value)}
        />
      </div>
    </div>
  );
};

export default MandirsMurtisFields;
