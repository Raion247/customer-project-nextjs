// Limits shared by the contact form (browser) and the server action.
// Attachments are base64-encoded in the email (about +37%), and many mail
// servers refuse big messages (Zoho: 20 MB), so 12 MB of images stays safely under.
export const MAX_FILES = 5;
export const MAX_TOTAL_BYTES = 12 * 1024 * 1024;

export const ACCEPT =
  ".jpg,.jpeg,.png,.webp,.gif,.heic,.heif,image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif";

export function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
