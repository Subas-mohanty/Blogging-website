import { Account, Client, ID, Databases } from "appwrite";
import { conf } from "../conf/conf";

export class Service{
    client = new Client();
    bucket;
    databases;

    constructor(){
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.projectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // slug works as an unique id
    async createPost({slug, title, content, userId, status, featuredImage}){
        try {
            return await this.databases.createDocument(conf.databaseId, conf.collectionId, slug, {
                title,
                content,
                status, 
                userId,
                featuredImage
            }) 
        } catch (error) {
           console.log(error); 
        }
    }
    async updatePost({slug, title, content, status, featuredImage}){
        try {
            return await this.databases.updateDocument(conf.databaseId, conf.collectionId, slug,{
                title,
                content,
                status,
                featuredImage
            })
        } catch (error) {
            console.log(error);
        }
    }
    async deletePost({slug}){
        try {
            return await this.databases.deleteDocument(conf.databaseId, conf.collectionId, slug);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.databaseId, conf.collectionId, slug);
        } catch (error) {
           console.log(error); 
        }
    }
    async getPosts(){
        try {
            const res = await this.databases.listDocuments(conf.databaseId, conf.collectionId, 
                [ 
                    Query.equal(["status", "active"])
                ]
            )
            return res;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    // file upload method
    async uploadFile(file){
        try {
           return await this.bucket.createFile(conf.bucketId, ID.unique(), file);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async deleteFile(fileId){
        try {
            const res = await this.bucket.deleteFile(conf.bucketId, fileId)
            return true;
        } catch (error) {
           console.log(error); 
           return false;
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.bucketId, fileId, );
    }
}

const service = new Service();
export default service;