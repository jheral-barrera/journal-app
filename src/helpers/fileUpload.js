
export const fileUpload = async ( file = [] ) => {
    if ( !file ) throw new Error('There is no file to upload :(') ;
    // if ( !file ) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/ddsl6wkqs/upload';

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
        throw new Error( error.message );
        // return null;
    }
}