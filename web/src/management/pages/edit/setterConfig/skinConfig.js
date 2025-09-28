import bannerConfig from './bannerConfig'
import logoConfig from './logoConfig'

export default [
  {
    name: 'Gambar Header',
    key: 'bannerConf.bannerConfig',
    formConfigList: bannerConfig
  },
  {
    name: 'Latar Belakang',
    key: 'skinConf.backgroundConf',
    formConfigList: [
      {
        type: 'TabsSetter',
        key: 'type',
        options: [
          {
            label: 'Gambar (<5M)',
            value: 'image'
          },
          {
            label: 'Warna',
            value: 'color'
          }
        ]
      },
      {
        label: 'Gambar Latar Belakang',
        type: 'UploadSingleFile',
        accept: 'image/*',
        limitSize: 5, // 单位MB
        key: 'image',
        relyFunc: (data) => {
          return data.type === 'image'
        }
      },
      {
        label: 'Warna Latar Belakang',
        type: 'ColorPicker',
        key: 'color',
        relyFunc: (data) => {
          return data.type === 'color'
        }
      }
    ]
  },
  {
    name: 'Warna Tema',
    key: 'skinConf.themeConf',
    formConfigList: [
      {
        label: 'Aplikasi Global',
        type: 'ColorPicker',
        key: 'color'
      }
    ]
  },
  {
    key: 'skinConf.contentConf',
    name: 'Konten',
    formConfigList: [
      {
        label: 'Keterlihatan Konten',
        type: 'SliderSetter',
        key: 'opacity'
      }
    ]
  },
  {
    name: 'Logo Merek',
    key: 'bottomConf',
    formConfigList: logoConfig
  }
]
