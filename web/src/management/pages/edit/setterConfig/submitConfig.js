export default [
  {
    title: 'Teks tombol kirim',
    type: 'InputSetter',
    key: 'submitTitle',
    placeholder: 'Kirim',
    value: ''
  },
  {
    title: 'Konfirmasi pengiriman',
    type: 'Customed',
    key: 'confirmAgain',
    content: [
      {
        label: 'Apakah ingin mengonfigurasi item ini',
        labelStyle: { width: '120px' },
        type: 'CustomedSwitch',
        key: 'confirmAgain.is_again',
        value: true
      },
      {
        label: 'Teks konfirmasi kedua',
        labelStyle: { width: '120px' },
        type: 'InputSetter',
        key: 'confirmAgain.again_text',
        placeholder: 'Apakah Anda yakin ingin mengirim?',
        value: 'Apakah Anda yakin ingin mengirim?'
      }
    ]
  },
  {
    title: 'Konfigurasi salinan pengiriman',
    type: 'Customed',
    key: 'msgContent',
    content: [
      {
        label: 'Dikirimkan',
        labelStyle: { width: '120px' },
        type: 'InputSetter',
        key: 'msgContent.msg_9002',
        placeholder: 'Silakan jangan mengirim beberapa kali!',
        value: 'Silakan jangan mengirim beberapa kali!'
      },
      {
        label: 'Pengiriman selesai',
        labelStyle: { width: '120px' },
        type: 'InputSetter',
        key: 'msgContent.msg_9003',
        placeholder: 'Anda datang terlambat, sudah penuh!',
        value: 'Anda datang terlambat, sudah penuh!'
      },
      {
        label: 'Pengiriman gagal lainnya',
        labelStyle: { width: '120px' },
        type: 'InputSetter',
        key: 'msgContent.msg_9004',
        placeholder: 'Pengiriman gagal!',
        value: 'Pengiriman gagal!'
      }
    ]
  }
]
