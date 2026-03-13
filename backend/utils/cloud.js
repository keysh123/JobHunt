import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: CLOUD_API, 
  api_secret: API_SECRET,
//   secure_distribution: 'mydomain.com',
//   upload_prefix: 'https://api-eu.cloudinary.com'
});

export default cloudinary