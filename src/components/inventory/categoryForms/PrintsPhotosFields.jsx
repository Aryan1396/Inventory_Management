import Input from '../../common/Input';
import Select from '../../common/Select';

const ORIENTATION_OPTIONS = ['Portrait (Vertical)', 'Landscape (Horizontal)', 'Square'];
const PRINT_TYPE_OPTIONS = ['Giclée Canvas Print', 'Fine Art Photo Paper', 'Metallic Luster Print', 'Gold Foil Embellished Print', 'Framed Glass Print'];

const PrintsPhotosFields = ({ data = {}, onChange }) => {
  const handleChange = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  return (
    <div className="space-y-5 rounded-2xl bg-amber-50/40 p-5 sm:p-6 border border-amber-200/70">
      <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
        <span className="text-base">🖼️</span>
        <h4 className="font-bold text-stone-900 text-sm tracking-tight">
          6. Prints & Photographs Specifications
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Artwork / Photo Title"
          id="print-title"
          placeholder="e.g. Akshardham Darshan, Mandir Portrait"
          value={data.artworkTitle || ''}
          onChange={(e) => handleChange('artworkTitle', e.target.value)}
        />

        <Input
          label="Image Subject / Deity"
          id="print-subject"
          placeholder="e.g. Bhagwan Swaminarayan, Akshardham"
          value={data.imageSubject || ''}
          onChange={(e) => handleChange('imageSubject', e.target.value)}
        />

        <Select
          label="Print Type"
          id="print-type"
          value={data.printType || PRINT_TYPE_OPTIONS[0]}
          options={PRINT_TYPE_OPTIONS}
          onChange={(e) => handleChange('printType', e.target.value)}
        />

        <Input
          label="Material"
          id="print-material"
          placeholder="e.g. Cotton Canvas, Photo Paper"
          value={data.material || ''}
          onChange={(e) => handleChange('material', e.target.value)}
        />

        <Input
          label="Height and Width"
          id="print-dimensions"
          placeholder='e.g. 24" x 36", 12" x 18"'
          value={data.heightWidth || ''}
          onChange={(e) => handleChange('heightWidth', e.target.value)}
        />

        <Select
          label="Orientation"
          id="print-orientation"
          value={data.orientation || ORIENTATION_OPTIONS[0]}
          options={ORIENTATION_OPTIONS}
          onChange={(e) => handleChange('orientation', e.target.value)}
        />

        <Input
          label="Frame Type (if applicable)"
          id="print-frame"
          placeholder="e.g. Teakwood Frame, Golden Frame"
          value={data.frameType || ''}
          onChange={(e) => handleChange('frameType', e.target.value)}
        />

        <Input
          label="Lamination Type (if applicable)"
          id="print-lamination"
          placeholder="e.g. Matte Velvet, UV Glossy"
          value={data.laminationType || ''}
          onChange={(e) => handleChange('laminationType', e.target.value)}
        />
      </div>
    </div>
  );
};

export default PrintsPhotosFields;
