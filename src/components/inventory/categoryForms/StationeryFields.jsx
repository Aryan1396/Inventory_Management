import Input from '../../common/Input';
import Select from '../../common/Select';

const CARD_TYPE_OPTIONS = ['Wedding Invitation (Kankotri)', 'Upanayana (Janoi) Invitation', 'Housewarming (Vastu) Invitation', 'Spiritual Greeting Card', 'Certificate / Citation'];
const FOLD_TYPE_OPTIONS = ['Tri-Fold', 'Bi-Fold', 'Single Card (Flat)', 'Scroll / Farman Card', 'Box Card with Inserts'];
const ENVELOPE_OPTIONS = ['Yes (Matching Envelope Included)', 'No (Card Only)', 'Yes (Custom Foil Envelope)'];

const StationeryFields = ({ data = {}, onChange }) => {
  const handleChange = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  return (
    <div className="space-y-5 rounded-2xl bg-amber-50/40 p-5 sm:p-6 border border-amber-200/70">
      <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
        <span className="text-base">💌</span>
        <h4 className="font-bold text-stone-900 text-sm tracking-tight">
          7. Wedding & Invitation Stationery Specifications
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Card Design Name / Code"
          id="stat-design-name"
          placeholder="e.g. Royal Kankotri, Code #VNM-12"
          value={data.cardDesignName || ''}
          onChange={(e) => handleChange('cardDesignName', e.target.value)}
        />

        <Select
          label="Card Type"
          id="stat-card-type"
          value={data.cardType || CARD_TYPE_OPTIONS[0]}
          options={CARD_TYPE_OPTIONS}
          onChange={(e) => handleChange('cardType', e.target.value)}
        />

        <Select
          label="Fold Type"
          id="stat-fold-type"
          value={data.foldType || FOLD_TYPE_OPTIONS[0]}
          options={FOLD_TYPE_OPTIONS}
          onChange={(e) => handleChange('foldType', e.target.value)}
        />

        <Input
          label="Language"
          id="stat-language"
          placeholder="e.g. Gujarati, Sanskrit"
          value={data.language || 'Gujarati & Sanskrit'}
          onChange={(e) => handleChange('language', e.target.value)}
        />

        <Input
          label="Paper Type"
          id="stat-paper-type"
          placeholder="e.g. Shimmer Cardstock, Handmade Paper"
          value={data.paperType || ''}
          onChange={(e) => handleChange('paperType', e.target.value)}
        />

        <Input
          label="Card Dimensions"
          id="stat-dimensions"
          placeholder='e.g. 8.5" x 6.0" (Folded)'
          value={data.cardDimensions || ''}
          onChange={(e) => handleChange('cardDimensions', e.target.value)}
        />

        <Input
          label="Minimum Order Quantity (MOQ)"
          id="stat-moq"
          placeholder="e.g. 100 Cards, 50 Cards"
          value={data.minOrderQty || '100 Cards'}
          onChange={(e) => handleChange('minOrderQty', e.target.value)}
        />

        <Input
          label="Quantity per Pack"
          id="stat-pack-qty"
          placeholder="e.g. 50 Cards per Box"
          value={data.qtyPerPack || '50 Cards per Box'}
          onChange={(e) => handleChange('qtyPerPack', e.target.value)}
        />

        <Select
          label="Envelope Included"
          id="stat-envelope"
          value={data.envelopeIncluded || ENVELOPE_OPTIONS[0]}
          options={ENVELOPE_OPTIONS}
          onChange={(e) => handleChange('envelopeIncluded', e.target.value)}
        />

        <Input
          label="Customization Options (if applicable)"
          id="stat-customization"
          placeholder="e.g. Gold Foil Printing, Embossing"
          value={data.customizationOptions || ''}
          onChange={(e) => handleChange('customizationOptions', e.target.value)}
        />
      </div>
    </div>
  );
};

export default StationeryFields;
