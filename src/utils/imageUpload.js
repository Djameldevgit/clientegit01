export const checkImage = (file) => {
  let err = ""
  if(!file) return err = "File does not exist."

  if(file.size > 1024 * 1024) // 1mb
  err = "The largest image size is 1mb."

  if(file.type !== 'image/jpeg' && file.type !== 'image/png' )
  err = "Image format is incorrect."
  
  return err;
}
//Por ejemplo, en el código que proporcionaste, la función imageUpload tiene un parámetro llamado images, que se espera que sea un arreglo de imágenes. Cuando llamas a esta función, proporcionas este arreglo de imágenes como entrada, y la función utiliza esta información para procesar las imágenes y realizar alguna tarea, como cargarlas en un servidor, en este caso específico. Por lo tanto, el arreglo de imágenes se considera la "entrada" que la función utiliza para llevar a cabo su tarea.

export const imageUpload = async (images) => {//imageUpload, que toma un arreglo de imágenes como entrada, entrada significa  información inicial que la función utiliza para realizar su trabajo.
  //imageUpload, la cual es una función asíncrona que toma un parámetro images, que se espera que sea un arreglo de imágenes que se desean carga
  let imgArr = [];//let imgArr = [];: Se inicializa un arreglo vacío llamado imgArr. Este arreglo se utilizará para almacenar los resultados de la carga de las imágenes
  for(const item of images){
      const formData = new FormData()//Para cada imagen en el arreglo, se crea un nuevo objeto FormData. FormData es un objeto integrado en JavaScript que se utiliza para construir fácilmente datos de formulario para enviar mediante una solicitud HTTP.

      if(item.camera){//for(const item of images) {: Se inicia un bucle for...of que recorre cada elemento del arreglo de imágenes (images). En cada iteración, item contendrá una imagen del arreglo.
          formData.append("file", item.camera)//formData.append("file", item.camera): Aquí, se está verificando si item es una imagen de la cámara del dispositivo. Si es así, se usa item.camera como archivo a enviar mediante el método formData.append. De lo contrario, se usa simplemente item
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
      imgArr.push({public_id: data.public_id, url: data.secure_url})//imgArr.push({public_id: data.public_id, url: data.secure_url}): Después de recibir la respuesta de Cloudinary, estamos extrayendo dos campos importantes: public_id y secure_url. public_id es el identificador único de la imagen en Cloudinary, y secure_url es la URL pública de la imagen en Cloudinary que podemos usar para acceder a ella en cualquier momento.
  }
  return imgArr;
}