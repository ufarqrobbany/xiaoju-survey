export default [
  {
    label: 'Logo Kustom',
    type: 'UploadSingleFile',
    accept: 'image/*',
    key: 'logoImage',
    tip: 'Ukuran default 200px*50px',
    labelStyle: { width: '120px' }
  },
  {
    label: 'Ukuran Logo',
    type: 'InputPercent',
    key: 'logoImageWidth',
    tip: 'Silakan masukkan lebar persentase, misalnya 30%',
    labelStyle: { width: '120px' }
  }
]
