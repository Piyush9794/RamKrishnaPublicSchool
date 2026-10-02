import appConfig from '../config/appConfig';

// Allowed file types
export const validateFile = (file, options = {}) => {
  const {
    maxSize = appConfig.maxFileSize,
    allowedTypes = appConfig.allowedFileTypes,
  } = options;

  if (!file) return { valid: false, error: 'No file selected' };

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`,
    };
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`,
    };
  }

  return { valid: true };
};

export const validateImage = (file) =>
  validateFile(file, {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: appConfig.allowedImageTypes,
  });

export const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.split('.').pop().toLowerCase();
};

export const getFileIcon = (filename) => {
  const ext = getFileExtension(filename);
  const icons = {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    xls: '📊',
    xlsx: '📊',
    ppt: '📊',
    pptx: '📊',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    gif: '🖼️',
    webp: '🖼️',
    mp4: '🎬',
    mp3: '🎵',
    zip: '🗜️',
    rar: '🗜️',
  };
  return icons[ext] || '📁';
};

export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
