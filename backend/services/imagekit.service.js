const { imagekit } = require('../config/imagekit');

async function uploadBuffer(buffer, fileName, folder) {
  const res = await imagekit.upload({
    file: buffer,
    fileName,
    folder,                  // e.g. "/banners" or "/club-logos"
    useUniqueFileName: true,
  });
  return { url: res.url, fileId: res.fileId };
}

async function deleteById(fileId) {
  if (!fileId) return;
  try { await imagekit.deleteFile(fileId); } catch (_) {}
}

async function replaceBuffer(buffer, fileName, folder, oldFileId) {
  if (oldFileId) deleteById(oldFileId);
  return uploadBuffer(buffer, fileName, folder);
}

module.exports = { uploadBuffer, deleteById, replaceBuffer };
