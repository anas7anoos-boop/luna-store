// Store settings.
window.LUNA_CONFIG = {
  // Orders go to this WhatsApp number. Full international number, digits only,
  // no + and no leading 0 (Turkey 0532 123 45 67 -> 905321234567).
  whatsapp: '905348305285',

  // Prices are in Syrian pounds. Product prices live in the PRODUCTS list in index.html.
  currencySymbol: 'ل.س',
  freeShippingFrom: 10000,
  shipping: { std: 1000, exp: 2000 },

  // Optional database (Supabase). Leave the key empty to keep taking orders on WhatsApp.
  supabaseUrl: 'https://ebhawlywcinkmfyecfgb.supabase.co',
  supabaseAnonKey: ''
};
