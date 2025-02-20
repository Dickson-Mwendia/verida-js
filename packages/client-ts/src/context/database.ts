import { DbRegistryEntry } from "./db-registry";

/**
 * Interface for any database returned from a storage engine
 */
 export default interface Database {

    save(data: any, options: any): Promise<boolean>
    getMany(filter: any, options: any): Promise<object[] | undefined>
    get(docId: any, options: any): Promise<object | undefined>
    delete(doc: any, options: any): Promise<boolean>
    deleteAll(): Promise<void>
    changes(cb: Function, options: any): Promise<void>
    updateUsers(readList: string[], writeList: string[]): Promise<void>
    getDb(): Promise<any>
    init(): Promise<void>
    info(): Promise<any>
    registryEntry(): Promise<DbRegistryEntry>

}