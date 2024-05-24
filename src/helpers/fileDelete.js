
export const getImagesIds = ( imagesUrls = [] ) => {
    if (!imagesUrls.length) return [];
    const imagesDeletedIds = [];

    for ( let imageUrl of imagesUrls ) {
        const segmentsUrl = imageUrl.split( '/' );
        const imageFile = segmentsUrl[ segmentsUrl.length - 1 ].split('.');
        const imageId = `journal/media/${imageFile[0]}`;
        imagesDeletedIds.push( imageId );
    }
    
    return imagesDeletedIds;
}

const generateSignature = ( imageId = '', apiSecret = '') => {
    const timestamp = new Date().getTime();
    const data = `public_id=${imageId}&timestamp=${timestamp}${apiSecret}`; 
    
    return data;
}

const generateSHA256 = async ( data ) => {
    // convertir la cadena de datos en un ArrayBuffer
    const dataBuffer = new TextEncoder().encode( data );
    // calcular el hash SHA-256
    const hashBuffer = await crypto.subtle.digest( 'SHA-256', dataBuffer );

    const hash = Array.from( new Uint8Array( hashBuffer ) )
        .map( byte => byte.toString( 16 ).padStart( 2, '0' ) )
        .join( '' );

    return hash;
}

export const fileDelete = async ( imageId = '' ) => {
    const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
    const timestamp = new Date().getTime();
    const apiKey = import.meta.env.VITE_APP_CLOUDINARY_API_KEY;
    const apiSecret = import.meta.env.VITE_APP_CLOUDINARY_API_SECRET;
    const signature = await generateSHA256( generateSignature( imageId, apiSecret ) );

    const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    const formData = new FormData();
    formData.append( 'public_id', imageId );
    formData.append('signature', signature );
    formData.append( 'api_key', apiKey );
    formData.append( 'timestamp', timestamp );

    try {
        const response = await fetch( cloudUrl, {
            method: 'POST',
            body: formData,
        })

        if ( !response.ok ) throw new Error('Images could not be eliminated.');
        
        const cloudResponse = await response.json();
        
        return;

    } catch ( error ) {
        console.log( error );
        throw new Error( error.message );
    }
}

