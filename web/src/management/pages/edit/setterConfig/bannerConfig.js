export default [
  {
    label: 'Alamat gambar teratas',
    type: 'InputSetter',
    key: 'bgImage',
    labelStyle: { width: '120px' }
  },
  {
    label: 'Alamat video teratas',
    type: 'InputSetter',
    key: 'videoLink',
    labelStyle: { width: '120px' }
  },
  {
    label: 'Alamat poster video',
    type: 'InputSetter',
    key: 'postImg',
    labelStyle: { width: '120px' }
  },
  {
    label: 'Gambar mendukung klik',
    type: 'CustomedSwitch',
    labelStyle: { width: '120px' },
    key: 'bgImageAllowJump'
  },
  {
    label: 'Tautan',
    type: 'InputSetter',
    labelStyle: { width: '120px' },
    key: 'bgImageJumpLink',
    relyFunc: (data) => {
      return !!data?.bgImageAllowJump
    }
  }
]
