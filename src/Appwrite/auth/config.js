import conf from "../../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";


export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases =  new Databases(this.client);
        this.bucket =  new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            throw error
        }
    }
    async updatePost(slug, {title,  content, featuredImage, status}){
    try {
         return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,

            }
        );
    } catch (error) {
        throw error;
        }
    }
    async deletePost(slug){
try {
    await this.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId, 
        slug
    )
    return true
} catch (error) {
    throw error;
    return false;
}
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
            return false;
        }
    }
    async  getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            throw error;

        }
    }
    //file uploading services 
    async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        throw error;
        return false;
    }
    }
    //delete file 
    async deleteile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            throw error;
            return false;
        }
    }
    // preview file 
   getFilePreview(fileId){
        return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
        )
    }
}

const service = new Service()
export default service;