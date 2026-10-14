import Input from '../../common/Input';
import Select from '../../common/Select';

const PUBLICATION_TYPE_OPTIONS = [
  'Book / Scripture (Granth)',
  'Calendar, Diary & Nirnay',
  'Children Book',
  'Satsang Exam Book',
  'Biography / Life Sketch',
  'Magazine / Periodical',
];

const LANGUAGE_OPTIONS = [
  'Gujarati',
  'English',
  'Hindi',
  'Sanskrit',
  'Bilingual (Gujarati / English)',
  'Marathi',
  'Tamil',
  'Telugu',
];

const BINDING_OPTIONS = [
  'Hardbound (Hardcover)',
  'Paperback (Softcover)',
  'Spiral Bound',
  'Deluxe Leatherette',
  'Pocket Sized',
  'Saddle Stitch',
];

const BooksPublicationsFields = ({ data = {}, onChange }) => {
  const handleChange = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  const isCalendarDiary = data.publicationType === 'Calendar, Diary & Nirnay';

  return (
    <div className="space-y-5 rounded-2xl bg-amber-50/40 p-5 sm:p-6 border border-amber-200/70">
      <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">📚</span>
          <h4 className="font-bold text-stone-900 text-sm tracking-tight">
            Books Specifications
          </h4>
        </div>

        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
          Aksharpith Literature
        </span>
      </div>

      {/* Primary Publication Type Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Publication Type"
          id="book-pub-type"
          value={data.publicationType || PUBLICATION_TYPE_OPTIONS[0]}
          options={PUBLICATION_TYPE_OPTIONS}
          onChange={(e) => handleChange('publicationType', e.target.value)}
        />

        <Select
          label="Language"
          id="book-language"
          value={data.language || LANGUAGE_OPTIONS[0]}
          options={LANGUAGE_OPTIONS}
          onChange={(e) => handleChange('language', e.target.value)}
        />
      </div>

      {/* Conditional Fields: When "Calendar, Diary & Nirnay" is selected */}
      {isCalendarDiary ? (
        <div className="rounded-xl bg-orange-100/40 border border-orange-200/80 p-4 space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-orange-900 uppercase tracking-wider">
            <span>📅</span>
            <span>Calendars, Diaries & Nirnay Specific Fields</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Publication Subtype"
              id="cal-subtype"
              placeholder="e.g. Wall Calendar, Table Nirnay"
              value={data.publicationSubtype || ''}
              onChange={(e) => handleChange('publicationSubtype', e.target.value)}
            />

            <Input
              label="Calendar Year"
              id="cal-year"
              placeholder="e.g. 2026, 2027"
              value={data.calendarYear || '2026'}
              onChange={(e) => handleChange('calendarYear', e.target.value)}
            />

            <Input
              label="Date / Samvat Range"
              id="cal-date-range"
              placeholder="e.g. Samvat 2082, Jan-Dec 2026"
              value={data.dateRange || ''}
              onChange={(e) => handleChange('dateRange', e.target.value)}
            />

            <Input
              label="Page Count (for Diaries)"
              id="cal-diary-pages"
              placeholder="e.g. 368 Pages, 200 Pages"
              value={data.diaryPageCount || ''}
              onChange={(e) => handleChange('diaryPageCount', e.target.value)}
            />

            <Input
              label="Size"
              id="cal-size"
              placeholder="e.g. 17 x 22 inches, A5"
              value={data.calendarSize || ''}
              onChange={(e) => handleChange('calendarSize', e.target.value)}
            />

            <Select
              label="Binding / Format"
              id="cal-binding"
              value={data.bindingFormat || BINDING_OPTIONS[2]}
              options={BINDING_OPTIONS}
              onChange={(e) => handleChange('bindingFormat', e.target.value)}
            />
          </div>
        </div>
      ) : (
        /* Standard Book & Publication Fields */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            label="Book / Granth Title"
            id="book-title"
            placeholder="e.g. Shri Vachanamrut, Satsang Diksha"
            value={data.bookTitle || ''}
            onChange={(e) => handleChange('bookTitle', e.target.value)}
          />

          <Input
            label="Subject / Topic"
            id="book-subject"
            placeholder="e.g. Philosophy, Biography"
            value={data.subjectTopic || ''}
            onChange={(e) => handleChange('subjectTopic', e.target.value)}
          />

          <Input
            label="Author"
            id="book-author"
            placeholder="e.g. Bhagwan Swaminarayan, Mahant Swami Maharaj"
            value={data.author || ''}
            onChange={(e) => handleChange('author', e.target.value)}
          />

          <Input
            label="Publisher"
            id="book-publisher"
            placeholder="e.g. Swaminarayan Aksharpith"
            value={data.publisher || 'Swaminarayan Aksharpith'}
            onChange={(e) => handleChange('publisher', e.target.value)}
          />

          <Input
            label="Series Name"
            id="book-series"
            placeholder="e.g. Vachanamrut Series, Bal Satsang"
            value={data.seriesName || ''}
            onChange={(e) => handleChange('seriesName', e.target.value)}
          />

          <Input
            label="Edition"
            id="book-edition"
            placeholder="e.g. 1st Edition, 5th Edition"
            value={data.edition || ''}
            onChange={(e) => handleChange('edition', e.target.value)}
          />

          <Input
            label="Volume / Part Number"
            id="book-volume"
            placeholder="e.g. Part 1, Volume 2"
            value={data.volumePartNumber || ''}
            onChange={(e) => handleChange('volumePartNumber', e.target.value)}
          />

          <Input
            label="ISBN (if available)"
            id="book-isbn"
            placeholder="e.g. 978-81-7526-021-4"
            value={data.isbn || ''}
            onChange={(e) => handleChange('isbn', e.target.value)}
          />

          <Input
            label="Page Count"
            id="book-pages"
            placeholder="e.g. 480 Pages"
            value={data.pageCount || ''}
            onChange={(e) => handleChange('pageCount', e.target.value)}
          />

          <Select
            label="Binding / Format"
            id="book-binding"
            value={data.bindingFormat || BINDING_OPTIONS[0]}
            options={BINDING_OPTIONS}
            onChange={(e) => handleChange('bindingFormat', e.target.value)}
          />

          <Input
            label="Publication Year"
            id="book-year"
            placeholder="e.g. 2025, 2026"
            value={data.publicationYear || '2025'}
            onChange={(e) => handleChange('publicationYear', e.target.value)}
          />

          <Input
            label="Intended Audience (if applicable)"
            id="book-audience"
            placeholder="e.g. Devotees, Youth"
            value={data.intendedAudience || ''}
            onChange={(e) => handleChange('intendedAudience', e.target.value)}
          />

          <div className="sm:col-span-2 lg:col-span-3">
            <Input
              label="Set Contents (for Book Bundles & Volume Sets)"
              id="book-set-contents"
              placeholder="e.g. Set of 3 Volumes, Parts 1 to 3"
              value={data.setContents || ''}
              onChange={(e) => handleChange('setContents', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPublicationsFields;
