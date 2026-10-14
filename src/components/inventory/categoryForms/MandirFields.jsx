import Input from '../../common/Input';
import Select from '../../common/Select';

const MOUNTING_OPTIONS = ['Floor Standing', 'Tabletop', 'Wall Mount', 'Floor or Tabletop', 'Not Applicable'];
const LIGHTING_OPTIONS = ['Yes (LED Built-in)', 'Yes (Dome Light)', 'No Lighting', 'Optional'];

const MandirFields = ({ data = {}, onChange }) => {
  const handleChange = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  return (
    <div className="space-y-5 rounded-2xl bg-amber-50/40 p-5 sm:p-6 border border-amber-200/70">
      <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
        <span className="text-base">🛕</span>
        <h4 className="font-bold text-stone-900 text-sm tracking-tight">
          Mandirs Specifications
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Mandir Type"
          id="mandir-type"
          placeholder="e.g. Wooden Ghar Mandir, Zarukha Mandir"
          value={data.productType || ''}
          onChange={(e) => handleChange('productType', e.target.value)}
        />

        <Input
          label="Material / Wood Type"
          id="mandir-wood"
          placeholder="e.g. Sheesham Wood, Teak Wood, Marble"
          value={data.materialWood || ''}
          onChange={(e) => handleChange('materialWood', e.target.value)}
        />

        <Input
          label="Finish / Color"
          id="mandir-finish"
          placeholder="e.g. Teak Polish, Rosewood Finish"
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
          placeholder="e.g. 18 kg, 5 kg"
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

        <Select
          label="Lighting Included"
          id="mandir-lighting"
          value={data.lightingIncluded || LIGHTING_OPTIONS[0]}
          options={LIGHTING_OPTIONS}
          onChange={(e) => handleChange('lightingIncluded', e.target.value)}
        />

        <Input
          label="Included Accessories"
          id="mandir-accessories"
          placeholder="e.g. Puja Tray Drawer, Velvet Asan"
          value={data.includedAccessories || ''}
          onChange={(e) => handleChange('includedAccessories', e.target.value)}
        />
      </div>
    </div>
  );
};

export default MandirFields;
