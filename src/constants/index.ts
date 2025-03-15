export const routes = [
  {
    name: 'Dashboard',
    icon: '/icons/dashboard.svg',
    url: '/'
  },
  {
    name: 'Documents',
    icon: '/icons/documents.svg',
    url: '/documents'
  },
  {
    name: 'Images',
    icon: '/icons/images.svg',
    url: '/images'
  },
  {
    name: 'Media',
    icon: '/icons/video.svg',
    url: '/media'
  },
  {
    name: 'Others',
    icon: '/icons/others.svg',
    url: '/others'
  }
];

export const documentExtensions = [
  'pdf',
  'doc',
  'docx',
  'txt',
  'xls',
  'xlsx',
  'csv',
  'rtf',
  'ods',
  'ppt',
  'odp',
  'md',
  'html',
  'htm',
  'epub',
  'pages',
  'fig',
  'psd',
  'ai',
  'indd',
  'xd',
  'sketch',
  'afdesign',
  'afphoto',
  'afphoto'
];

export const imageExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'bmp',
  'svg',
  'webp'
];

export const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'webm'];

export const audioExtensions = ['mp3', 'wav', 'ogg', 'flac'];

export const MAX_FILE_SIZE = 50 * 1024 * 1024;
