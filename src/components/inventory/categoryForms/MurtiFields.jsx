import Input from '../../common/Input';
import Select from '../../common/Select';

const PLACEMENT_OPTIONS = ['Mandir Sinhasan', 'Tabletop Altar', 'Car Dashboard', 'Pocket / Travel Aasan', 'Wall Niche'];

const MurtiFields = ({ data = {}, onChange }) => {
  const handleChange = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  return (
    <div className="space-y-5 rounded-2xl bg-amber-50/40 p-5 sm:p-6 border border-amber-200/70">
      <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
        <span className="text-base">🙏</span>
        <h4 className="font-bold text-stone-900 text-sm tracking-tight">
          Murtis Specifications
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Deity Name"
          id="murti-deity"
          placeholder="e.g. Bhagwan Swaminarayan, Nilkanth Varni"
          value={data.deityName || ''}
          onChange={(e) => handleChange('deityName', e.target.value)}
        />

        <Input
          label="Product / Murti Type"
          id="murti-type"
          placeholder="e.g. Tapomurti, Abhishek Murti, Idol"
          value={data.productType || ''}
          onChange={(e) => handleChange('productType', e.target.value)}
        />

        <Input
          label="Material"
          id="murti-material"
          placeholder="e.g. Panchdhatu, Pure Brass, Marble, Resin"
          value={data.material || ''}
          onChange={(e) => handleChange('material', e.target.value)}
        />

        <Input
          label="Finish / Color"
          id="murti-finish"
          placeholder="e.g. Antique Bronze, Gold Plated, Natural"
          value={data.finishColor || ''}
          onChange={(e) => handleChange('finishColor', e.target.value)}
        />

        <Input
          label="Height, Width and Depth"
          id="murti-dimensions"
          placeholder='e.g. Height: 8.5", Width: 3.5", Depth: 3.0"'
          value={data.dimensionsHWD || ''}
          onChange={(e) => handleChange('dimensionsHWD', e.target.value)}
        />

        <Input
          label="Weight"
          id="murti-weight"
          placeholder="e.g. 650 grams, 1.2 kg"
          value={data.weight || ''}
          onChange={(e) => handleChange('weight', e.target.value)}
        />

        <Select
          label="Placement / Mounting"
          id="murti-placement"
          value={data.placementType || PLACEMENT_OPTIONS[0]}
          options={PLACEMENT_OPTIONS}
          onChange={(e) => handleChange('placementType', e.target.value)}
        />

        <Input
          label="Included Accessories"
          id="murti-accessories"
          placeholder="e.g. Velvet Base Mat, Velvet Box"
          value={data.includedAccessories || ''}
          onChange={(e) => handleChange('includedAccessories', e.target.value)}
        />
      </div>
    </div>
  );
};

export default MurtiFields;
