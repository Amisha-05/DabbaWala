import cloudinary from 'cloudinary';

cloudinary.config({
   cloud_name: 'cloud_name',
   api_key: 'api_key',
   api_secret: 'api_secret'
});

export default cloudinary;
