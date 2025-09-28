// 问卷设置，定义了字段和对应的设置器
export default {
  base_effectTime: {
    keys: ['beginTime', 'endTime'],
    label: 'Masa berlaku jawaban',
    type: 'QuestionTime',
    placeholder: 'yyyy-MM-dd hh:mm:ss'
  },
  limit_tLimit: {
    key: 'tLimit',
    label: 'Batas total pengembalian kuesioner',
    type: 'InputNumber',
    tip: '0 untuk tidak terbatas, fitur ini digunakan untuk membatasi jumlah data yang dapat dikirimkan oleh kuesioner ini. Ketika jumlah data mencapai batas, kuesioner ini tidak dapat dilanjutkan.',
    tipShow: true,
    placement: 'top',
    min: 0
  },
  limit_answerTime: {
    keys: ['answerBegTime', 'answerEndTime'],
    label: 'Waktu menjawab',
    tip: 'Kuesioner hanya dapat diisi dalam rentang waktu yang ditentukan',
    type: 'QuestionTimeHour',
    placement: 'top'
  },
  limit_fillAnswer: {
    key: 'fillAnswer',
    label: 'Mengizinkan melanjutkan jawaban sebelumnya',
    tip: 'Isi ulang konten jawaban sebelumnya (Catatan: Fungsi ini tidak akan valid jika Anda mengubah perangkat/browser/menghapus cache/mengubah konten dan menerbitkan ulang)',
    placement: 'top',
    type: 'CustomedSwitch'
  },
  limit_fillSubmitAnswer: {
    key: 'fillSubmitAnswer',
    label: 'Mengizinkan pengisian otomatis konten yang diajukan sebelumnya',
    tip: 'Isi ulang konten jawaban sebelumnya (Catatan: Fungsi ini tidak akan valid jika Anda mengubah perangkat/browser/menghapus cache/mengubah konten dan menerbitkan ulang)',
    placement: 'top',
    type: 'CustomedSwitch'
  },
  interview_pwd_switch: {
    key: 'passwordSwitch',
    label: 'Kata sandi akses',
    type: 'CustomedSwitch'
  },
  interview_pwd: {
    key: 'password',
    type: 'InputSetter',
    placeholder: 'Silakan masukkan kata sandi akses tipe string 6 karakter ',
    maxLength: 6,
    relyFunc: (data) => {
      return !!data?.passwordSwitch
    }
  },
  answer_type: {
    key: 'whitelistType',
    label: 'Daftar jawaban',
    type: 'RadioGroup',
    options: [
      {
        label: 'Semua orang',
        value: 'ALL'
      },
      {
        label: 'Anggota ruang tim',
        value: 'MEMBER'
      },
      {
        label: 'Daftar putih',
        value: 'CUSTOM'
      }
    ],
    // 批量修改value
    valueSetter(data) {
      return [
        data,
        {
          key: 'whitelistTip', // 切换tab清空名单登录提示语
          value: ''
        },
        {
          key: 'whitelist', // 切换tab清空名单列表
          value: []
        },
        {
          key: 'memberType',
          value: ''
        }
      ]
    }
  },
  white_placeholder: {
    key: 'whitelistTip',
    label: 'Daftar putih login tip',
    placeholder: 'Silakan masukkan daftar putih tip',
    type: 'InputSetter',
    maxLength: 40,
    relyFunc: (data) => {
      return ['CUSTOM', 'MEMBER'].includes(data.whitelistType)
    }
  },
  white_list: {
    keys: ['whitelist', 'memberType'],
    label: 'Daftar putih',
    type: 'WhiteList',
    custom: true, // 自定义导入高级组件
    relyFunc: (data) => {
      return data.whitelistType === 'CUSTOM'
    }
  },
  team_list: {
    key: 'whitelist',
    label: 'Pemilihan anggota ruang tim',
    type: 'TeamMemberList',
    custom: true, // 自定义导入高级组件
    relyFunc: (data) => {
      return data.whitelistType === 'MEMBER'
    }
  }
}
