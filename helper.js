const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
  cloud_name: 'df8clipqz', 
  api_key: '194894554869875', 
  api_secret: 'onF0NwqgKYrmHOh6orIHCPspr3Y' 
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: 'restaurant'
  });
  return res;
  
}



module.exports = {
  handleUpload 
  
};
