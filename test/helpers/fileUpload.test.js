import { v2 as cloudinary } from "cloudinary"
import { fileUpload } from "../../src/helpers/fileUpload"
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.VITE_APP_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.VITE_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.VITE_APP_CLOUDINARY_API_SECRET,
    secure: true
})

describe('Pruebas en el helper "fileUpload"', () => {

    // test('Debe subir el archivo a cloudinary', async () => {
    //     const imageUrl = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/86420e2d-4197-4a22-9d37-63c462bc7afa/dfd3r8j-c344bf24-290e-49ee-9d53-7e0383071b3c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg2NDIwZTJkLTQxOTctNGEyMi05ZDM3LTYzYzQ2MmJjN2FmYVwvZGZkM3I4ai1jMzQ0YmYyNC0yOTBlLTQ5ZWUtOWQ1My03ZTAzODMwNzFiM2MucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.xgQi6P3DRoFG20Dxyj5WdctQ_5ixZ7U_pSwp-7f2m28'

    //     const response = await fetch( imageUrl );
    //     const blob = await response.blob();
    //     const file = new File( [ blob ], 'foto.jpg' );

    //     const url = await fileUpload( file );

    //     expect( typeof url ).toBe( 'string' );
        
    //     const segments = url.split( '/' );
    //     const imageId = segments[ segments.length - 1 ].replace('.png', '');

    //     await cloudinary.api.delete_resources([ 'journal/media/' + imageId ]);
    // })

    test('Debe retornall null', async () => {        
        const file = new File( [], 'foto.jpg' );
        const url = await fileUpload( file );

        expect( url ).toBe( null );
    })
})
