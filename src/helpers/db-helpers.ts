import { DataSource } from "typeorm";
const cloudinary = require('cloudinary')

export const handleManyToManyUpdate = async (
    referenceTable, //reference table name
    mainId,         // main relational table id 
    relatedIdsArray,  // relational table ids
    dataSource:DataSource, // data source
    primaryColumnName,  // reference table column name
    secondaryColumnName // reference table coumn name
    ) => {
      console.log(referenceTable,mainId,relatedIdsArray);
      
    await dataSource.createQueryBuilder()
    .delete()
    .from(referenceTable, null)
    .where({
        [primaryColumnName]: mainId
    }).execute()
    const bulkQueryArrayForUpdate = relatedIdsArray.map(res => {return {[primaryColumnName]: mainId,  [secondaryColumnName]: res}})
    await dataSource.createQueryBuilder()
    .insert()
    .into(referenceTable, null)
    .values(bulkQueryArrayForUpdate)
    .execute()
    return true
}

export async function uploadToCloudinary(fileBuffer,fileType, resUrl = true) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream({ resource_type: fileType },  (error, result) => {
            if (!error && result.url) {   
              return resUrl ? resolve(result.url) : resolve(result);
            }
            else {
              return reject(error);
            }
        }).end(fileBuffer);
    });
  }