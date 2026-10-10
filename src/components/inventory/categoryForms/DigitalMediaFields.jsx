import Input from '../../common/Input';
import Select from '../../common/Select';

const DELIVERY_METHOD_OPTIONS = ['Physical USB', 'Digital downloads'];
const MEDIA_TYPE_OPTIONS = ['Audio (Kirtan / Dhun)', 'Video (Pravachan / Katha)', 'Mixed Multimedia (Audio & Video)'];
const DIGITAL_TYPE_OPTIONS = ['eBook (EPUB / PDF)', 'Audio Album (MP3 / FLAC)', 'Video Lecture (MP4 / MKV)', 'Sacred Wallpaper Pack'];
const USB_CAPACITY_OPTIONS = ['16 GB USB 3.0', '32 GB USB 3.0', '64 GB USB 3.0', '128 GB USB 3.1'];

const DigitalMediaFields = ({ data = {}, onChange }) => {
  const handleChange = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  const isPhysicalUSB = (data.deliveryMethod || 'Physical USB') === 'Physical USB';

  return (
    <div className="space-y-5 rounded-2xl bg-amber-50/40 p-5 sm:p-6 border border-amber-200/70">
      <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">💿</span>
          <h4 className="font-bold text-stone-900 text-sm tracking-tight">
            8. Digital & Media Products Specifications
          </h4>
        </div>

        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
          Audio & Video Media
        </span>
      </div>

      {/* Delivery Method Selector (Physical USB vs Digital Download) */}
      <div className="max-w-xs">
        <Select
          label="Delivery Format"
          id="media-delivery-method"
          value={data.deliveryMethod || DELIVERY_METHOD_OPTIONS[0]}
          options={DELIVERY_METHOD_OPTIONS}
          onChange={(e) => handleChange('deliveryMethod', e.target.value)}
        />
      </div>

      {/* Sub-form 1: Physical USB */}
      {isPhysicalUSB ? (
        <div className="rounded-xl bg-orange-100/40 border border-orange-200/80 p-4 space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-orange-900 uppercase tracking-wider">
            <span>💾</span>
            <span>Physical USB Pen Drive Specifications</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Media Type"
              id="usb-media-type"
              value={data.mediaType || MEDIA_TYPE_OPTIONS[0]}
              options={MEDIA_TYPE_OPTIONS}
              onChange={(e) => handleChange('mediaType', e.target.value)}
            />

            <Input
              label="Content Title / Collection"
              id="usb-content-title"
              placeholder="e.g. Anhad Naad, Smruti Katha"
              value={data.contentTitle || ''}
              onChange={(e) => handleChange('contentTitle', e.target.value)}
            />

            <Input
              label="Language"
              id="usb-language"
              placeholder="e.g. Gujarati, Hindi"
              value={data.language || 'Gujarati'}
              onChange={(e) => handleChange('language', e.target.value)}
            />

            <Select
              label="USB Capacity"
              id="usb-capacity"
              value={data.usbCapacity || USB_CAPACITY_OPTIONS[1]}
              options={USB_CAPACITY_OPTIONS}
              onChange={(e) => handleChange('usbCapacity', e.target.value)}
            />

            <Input
              label="Number of Tracks / Videos"
              id="usb-tracks"
              placeholder="e.g. 350 Audio Tracks, 24 Videos"
              value={data.numTracksVideos || ''}
              onChange={(e) => handleChange('numTracksVideos', e.target.value)}
            />

            <Input
              label="Total Duration (if applicable)"
              id="usb-duration"
              placeholder="e.g. 48 Hours, 12 Hours"
              value={data.totalDuration || ''}
              onChange={(e) => handleChange('totalDuration', e.target.value)}
            />

            <Input
              label="Audio / Video Format"
              id="usb-format"
              placeholder="e.g. MP3 320kbps, MP4 H.264"
              value={data.audioVideoFormat || 'MP3 (320 kbps)'}
              onChange={(e) => handleChange('audioVideoFormat', e.target.value)}
            />

            <Input
              label="Video Resolution & Subtitles"
              id="usb-res"
              placeholder="e.g. 1080p Full HD, 4K UHD"
              value={data.videoResolutionSubtitles || ''}
              onChange={(e) => handleChange('videoResolutionSubtitles', e.target.value)}
            />

            <Input
              label="Device Compatibility"
              id="usb-compat"
              placeholder="e.g. Car Audio, Smart TV"
              value={data.deviceCompatibility || ''}
              onChange={(e) => handleChange('deviceCompatibility', e.target.value)}
            />
          </div>
        </div>
      ) : (
        /* Sub-form 2: Digital Downloads */
        <div className="rounded-xl bg-orange-100/40 border border-orange-200/80 p-4 space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-orange-900 uppercase tracking-wider">
            <span>⬇️</span>
            <span>Digital Download Specific Fields</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Digital Product Type"
              id="digital-prod-type"
              value={data.digitalProductType || DIGITAL_TYPE_OPTIONS[0]}
              options={DIGITAL_TYPE_OPTIONS}
              onChange={(e) => handleChange('digitalProductType', e.target.value)}
            />

            <Input
              label="File Format"
              id="digital-file-format"
              placeholder="e.g. PDF, MP3"
              value={data.fileFormat || ''}
              onChange={(e) => handleChange('fileFormat', e.target.value)}
            />

            <Input
              label="File Size"
              id="digital-file-size"
              placeholder="e.g. 45 MB, 1.2 GB"
              value={data.fileSize || ''}
              onChange={(e) => handleChange('fileSize', e.target.value)}
            />

            <Input
              label="Download File / Secure File Reference"
              id="digital-file-ref"
              placeholder="e.g. s3://baps/vachanamrut.zip"
              value={data.downloadFileRef || ''}
              onChange={(e) => handleChange('downloadFileRef', e.target.value)}
            />

            <Input
              label="Download Limits & Expiry"
              id="digital-limits"
              placeholder="e.g. 5 Downloads, 30 Days Expiry"
              value={data.downloadLimits || 'Max 5 Downloads, Valid for 30 Days'}
              onChange={(e) => handleChange('downloadLimits', e.target.value)}
            />

            <Input
              label="License / Usage Terms"
              id="digital-license"
              placeholder="e.g. Personal Devotional License"
              value={data.licenseUsageTerms || 'Personal Devotional Single-User License'}
              onChange={(e) => handleChange('licenseUsageTerms', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalMediaFields;
