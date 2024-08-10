export const imageUploadApi = async (url,folder, image) => {
  const formData = new FormData();
  formData.append('image',image)
  let folderName = ''
  if(folder === 'board'){
    folderName = 'pup-patrol-board-image'
  }else{
    folderName = 'pup-patrol-information-image'
  }
  const response = await fetch(url, {
    method:"POST",
    headers: {
      'folder': folderName,
    },
    body:formData
  });
  if(!response.ok){
    throw new Error('Failed to fetch')
  }
  const data = await response.json();
  return data;
}

export const imageDownloadApi = async ( url, folder, fileName) => {
  let folderName = ''
  if(folder === 'board'){
    folderName = 'pup-patrol-board-image'
  }else{
    folderName = 'pup-patrol-information-image'
  }
  const response = await fetch(`${url}?fileName=${fileName}`, {
    method:"GET",
    headers: {
      "Accept":"application/json",
      'folder': folderName,
    },
  });
  if(!response.ok){
    throw new Error('Failed to fetch')
  }
  const data = await response.json();
  return data.data;
} 
export const imageDeleteApi = async ( url, folder, fileName )=>{
  let folderName = ''
  if(folder === 'board'){
    folderName = 'pup-patrol-board-image'
  }else{
    folderName = 'pup-patrol-information-image'
  }
  const response = await fetch(`${url}?fileName=${fileName}`, {
    method:"DELETE",
    headers: {
      "Accept":"application/json",
      'folder': folderName,
    },
  });
  if(!response.ok){
    throw new Error('Failed to fetch')
  }
  const data = await response.json();
  return data;
}