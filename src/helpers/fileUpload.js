const TESTENVIRONMENT = false;

export const fileUpload = async ( file = [] ) => {
    if ( TESTENVIRONMENT && !file ) return null
    if ( !file ) throw new Error('There is no file to upload :(') ;

    const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
    // const cloudName = process.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

    const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('upload_preset', 'journal-react');
    formData.append('file', file);

    try {
        const response = await fetch( cloudUrl, {
            method: 'POST',
            body: formData,
        })

        if ( !response.ok ) throw new Error('file could not be loaded :(')
            
        const cloudResponse = await response.json();
            
        return cloudResponse.secure_url;
            
    } catch ( error ) {
        console.log( error );
        if ( TESTENVIRONMENT ) return null;
        throw new Error( error.message );
    }
}