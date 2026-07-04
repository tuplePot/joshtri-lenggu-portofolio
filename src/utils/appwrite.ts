const endpoint = import.meta.env.PUBLIC_APPWRITE_ENDPOINT;
const projectId = import.meta.env.PUBLIC_APPWRITE_PROJECT_ID;
const bucketId  = import.meta.env.PUBLIC_APPWRITE_BUCKET_ID;

export function getFileUrl(fileId: string): string {
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
}
