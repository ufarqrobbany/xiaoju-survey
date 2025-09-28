export const type = {
  normal: 'Survei Dasar',
  vote: 'Voting & Penilaian',
  nps: 'Skor NPS',
  register: 'Pendaftaran Online',
}

export const spaceListConfig = {
  name: {
    title: 'Nama Ruang',
    key: 'name',
    width: 200
  },
  surveyTotal: {
    title: 'Jumlah Survei',
    key: 'surveyTotal',
    width: 150,
    tip: true
  },
  memberTotal: {
    title: 'Jumlah Anggota',
    key: 'memberTotal',
    width: 150
  },
  owner: {
    title: 'Pemilik',
    key: 'owner',
    width: 150
  },
  createdAt: {
    title: 'Waktu Dibuat',
    key: 'createdAt',
    minWidth: 200
  }
}

export const groupListConfig = {
  name: {
    title: 'Nama Grup',
    key: 'name',
    width: 200
  },
  surveyTotal: {
    title: 'Jumlah Survei',
    key: 'surveyTotal',
    width: 150,
    tip: true
  },
  createdAt: {
    title: 'Waktu Dibuat',
    key: 'createdAt',
    minWidth: 200
  }
}

export const fieldConfig = {
  type: {
    title: 'Jenis',
    key: 'type',
    width: 150,
    comp: 'TagModule'
  },
  title: {
    title: 'Judul',
    key: 'title',
    width: 240,
    tip: true
  },
  remark: {
    title: 'Catatan',
    key: 'remark',
    width: 200,
    tip: true
  },
  state: {
    title: 'Status',
    key: 'state',
    width: 140,
    comp: 'StateModule'
  },
  owner: {
    title: 'Pemilik',
    key: 'owner',
    width: 140
  },
  updatedAt: {
    title: 'Waktu Diperbarui',
    key: 'updatedAt',
    minWidth: 200
  },
  createdAt: {
    title: 'Waktu Dibuat',
    key: 'createdAt',
    minWidth: 200
  }
}

export const noListDataConfig = {
  title: 'Anda belum membuat survei',
  desc: 'Segera klik pojok kanan atas untuk membuat survei!',
  img: '/imgs/icons/list-empty.webp'
}

export const noSpaceDataConfig = {
  title: 'Anda belum membuat ruang tim',
  desc: 'Segera klik pojok kanan atas untuk membuat ruang tim!',
  img: '/imgs/icons/list-empty.webp'
}
export const noSpaceSearchDataConfig = {
  title: 'Tidak ada ruang tim yang memenuhi syarat pencarian ini',
  desc: 'Anda dapat mencoba mengubah kondisi pencarian',
  img: '/imgs/icons/list-empty.webp'
}
export const noGroupDataConfig = {
  title: 'Anda belum membuat grup survei',
  desc: 'Segera klik pojok kanan atas untuk membuat grup survei!',
  img: '/imgs/icons/list-empty.webp'
}
export const noGroupSearchDataConfig = {
  title: 'Tidak ada grup survei yang memenuhi syarat pencarian ini',
  desc: 'Anda dapat mencoba mengubah kondisi pencarian',
  img: '/imgs/icons/list-empty.webp'
}
export const noSearchDataConfig = {
  title: 'Tidak ada survei yang memenuhi syarat pencarian ini',
  desc: 'Anda dapat mencoba mengubah kondisi pencarian',
  img: '/imgs/icons/list-empty.webp'
}
export const noDownloadTaskConfig = {
  title: 'Tidak ada tugas unduhan',
  desc: 'Anda dapat mengunduhnya di analisis data',
  img: '/imgs/icons/list-empty.webp'
}

export const curStatus = {
  new: {
    value: 'new',
    label: 'Belum diterbitkan'
  },
  published: {
    value: 'published',
    label: 'Sudah diterbitkan'
  },
  editing: {
    label: 'Sedang diedit',
    value: 'editing'
  }
}

// 子状态
export const subStatus = {
  pausing: {
    label: 'Sedang dijeda',
    value: 'pausing'
  }
}

export const statusMaps = {
  ...Object.fromEntries(Object.keys(curStatus).map((key) => [key, curStatus[key].label])),
  ...Object.fromEntries(Object.keys(subStatus).map((key) => [key, subStatus[key].label]))
}

export const curStatusKey = 'curStatus.status'
export const subStatusKey = 'subStatus.status'

// 问卷类型
export const surveyTypeSelect = {
  label: 'Jenis Kuesioner',
  value: [
    {
      value: '',
      label: 'Semua Tipe'
    },
    {
      value: 'normal',
      label: 'Survei Dasar'
    },
    // {
    //   value: 'exam',
    //   label: '在线考试'
    // },
    // {
    //   value: 'nps',
    //   label: 'NPS评分'
    // },
    {
      value: 'vote',
      label: 'Voting'
    },
    {
      value: 'register',
      label: 'Pendaftaran Online'
    }
  ],
  default: ''
}

// Status Kuesioner
export const curStatusSelect = {
  label: 'Status Kuesioner',
  value: [
    {
      value: '',
      label: 'Semua Status'
    },
    curStatus.new,
    curStatus.published,
    curStatus.editing,
    subStatus.pausing
  ],
  default: ''
}

export const selectOptionsDict = Object.freeze({
  surveyType: surveyTypeSelect,
  status: curStatusSelect
})

export const buttonOptionsDict = Object.freeze({
  updatedAt: {
    label: 'Waktu Diperbarui',
    icons: [
      {
        name: 'el-icon-sort',
        effectValue: '',
        isDefaultValue: true,
        icon: 'sort'
      },
      {
        name: 'el-icon-sort-up',
        effectValue: 1,
        icon: 'sort-up'
      },
      {
        name: 'el-icon-sort-down',
        effectValue: -1,
        icon: 'sort-down'
      }
    ]
  },
  createdAt: {
    label: 'Waktu penciptaan',
    icons: [
      {
        name: 'el-icon-sort',
        effectValue: '',
        icon: 'sort'
      },
      {
        name: 'el-icon-sort-up',
        effectValue: 1,
        icon: 'sort-up'
      },
      {
        name: 'el-icon-sort-down',
        effectValue: -1,
        isDefaultValue: true,
        icon: 'sort-down'
      }
    ]
  }
})
