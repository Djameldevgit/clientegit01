/*export const checkImage = (file) => {
    let err = ""
    if(!file) return err = "File does not exist."

    if(file.size > 1024 * 1024) // 1mb
    err = "The largest image size is 1mb."

    if(file.type !== 'image/jpeg' && file.type !== 'image/png' )
    err = "Image format is incorrect."
    
    return err;
}*/
export const checkImage = (files) => {
  let err = "";
  if (!files || files.length === 0) return err = "No files selected.";

  // Limitar a un máximo de 3 imágenes
  if (files.length > 3) {
    err = "You can only upload up to 3 images.";
    return err;
  }

  const allowedExtensions = ['jpeg', 'jpg', 'png'];
  const blockedExtensions = ['txt', 'pdf']; // Agregar aquí las extensiones bloqueadas

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.size > 1024 * 1024) {
      err = "The largest image size is 1mb.";
      return err;
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      err = "Image format is incorrect.";
      return err;
    }

    if (blockedExtensions.includes(fileExtension)) {
      err = "File type not allowed.";
      return err;
    }
  }

  return err;
};

  

export const imageUpload = async (images) => {
    let imgArr = [];
    for(const item of images){
        const formData = new FormData()

        if(item.camera){
            formData.append("file", item.camera)
        }else{
            formData.append("file", item)
        }
        
        formData.append("upload_preset", "xl7nhfgx")
        formData.append("cloud_name", "arteeeuhgu")

        const res = await fetch("https://api.cloudinary.com/v1_1/arteeeuhgu/image/upload", {
            method: "POST",
            body: formData
        })
        
        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})
    }
    return imgArr;
}