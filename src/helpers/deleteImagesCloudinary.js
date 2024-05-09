// import { v2 as cloudinary } from "cloudinary"

// cloudinary.config({
//     cloud_name: import.meta.env.VITE_APP_CLOUD_NAME,
//     api_key: import.meta.env.VITE_APP_API_KEY,
//     api_secret: import.meta.env.VITE_APP_API_SECRET,
//     secure: true
// });

export const deleteImagesCloudinary = async ( imageId ) => {
    try {
        // return cloudinary.api.delete_resources([ 'journal/media/' + imageId ]);
    } catch ( error ) {
        console.log( error );
        throw new Error( error.message );
    }
}