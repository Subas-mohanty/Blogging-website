export const conf = {
  projectId : String(import.meta.env.VITE_PROJECT_ID),
  appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
  collectionId : String(import.meta.env.VITE_COLLECTION_ID),
  databaseId : String(import.meta.env.VITE_DATABASE_URL),
  bucketId : String(import.meta.env.VITE_BUCKET_ID)

};

export default conf;