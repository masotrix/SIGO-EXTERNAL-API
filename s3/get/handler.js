import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import s3Client from '../client.js';

export default async ({ body }) => {
    const page = parseInt(body?.page || 1);
    const limit = parseInt(body?.limit || 10);

    const params = {
        Bucket: process.env.USER_FILES_BUCKET,
        MaxKeys: 1000 
    };

    let allFiles = [];
    let isTruncated = true;

    try {
        // 1. Obtener todos los archivos del bucket
        while (isTruncated) {
            const command = new ListObjectsV2Command(params);
            const response = await s3Client.send(command);

            if (response.Contents) {
                allFiles.push(...response.Contents);
            }

            // S3 indica si hay más archivos por traer
            isTruncated = response.IsTruncated;
            if (isTruncated) {
                params.ContinuationToken = response.NextContinuationToken;
            }
        }

        // 2. Opcional: Ordenar los archivos por fecha descendente (como en SQL: order: [['createdAt', 'DESC']])
        allFiles.sort((a, b) => b.LastModified - a.LastModified);

        // 3. Calcular la paginación en memoria
        const totalItems = allFiles.length;
        const totalPages = Math.ceil(totalItems / limit);
        const offset = (page - 1) * limit;

        // 4. Extraer solo los elementos correspondientes a la página actual
        const paginatedFiles = allFiles.slice(offset, offset + limit);

        return {
            body: {
                files: paginatedFiles.map(file => ({
                    key: file.Key,
                    size: file.Size,
                    lastModified: file.LastModified,
                    eTag: file.ETag
                })),
                pagination: {
                    currentPage: page,
                    totalPages: totalPages === 0 ? 1 : totalPages,
                    totalItems: totalItems,
                    limit: limit
                }
            }
        };
    } catch (error) {
        console.error("Error al listar archivos de S3:", error);
        return {
            body: { files: [], pagination: { totalPages: 0, totalItems: 0 } }
        };
    }
};
