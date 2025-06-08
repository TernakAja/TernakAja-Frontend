module.exports = {
  // Bahasa-bahasa yang ingin diekstrak
  locales: ['en'],

  // Lokasi output JSON
  output: './src/locales/$LOCALE/common.json',

  // Format default
  defaultNamespace: 'common',

  // Pisah key berdasarkan karakter (false = gunakan full string sebagai key)
  keySeparator: false,
  namespaceSeparator: false,

  // Scan folder src
  input: ['src/**/*.{js,jsx,ts,tsx}'],

  // Gak perlu file backup lama
  createOldCatalogs: false,

  // Urutkan key di JSON
  sort: true,

  // Support JSX dan Hooks
  lexers: {
    tsx: ['JsxLexer'],
    jsx: ['JsxLexer'],
    ts: ['JavascriptLexer'],
    js: ['JavascriptLexer'],
  },
  
};
