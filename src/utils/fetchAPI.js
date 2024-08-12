import axios from "../lib/axios";
export const imageUploadApi = async (url,folder, image) => {
  const formData = new FormData();
  formData.append('image',image)
  let folderName = ''
  if(folder === 'board'){
    folderName = 'pup-patrol-board-image'
  }else{
    folderName = 'pup-patrol-information-image'
  }
  const response = await axios.post(url, formData, {
    headers: {
      'folder': folderName,
    }
  });
  
  if((response.status/100) >= 3){
    throw new Error('Failed to fetch')
  }
  const data = await response.data;
  return data;
}

export const imageDownloadApi = async ( url, folder, fileName) => {
  let folderName = ''
  if(folder === 'board'){
    folderName = 'pup-patrol-board-image'
  }else{
    folderName = 'pup-patrol-information-image'
  }
  const response = await axios.get(`${url}?fileName=${fileName}`, {
    headers: {
      'folder': folderName,
    },
  });
  if((response.status/100) >= 3){
    throw new Error('Failed to fetch')
  }
  const data = await response.data;
  return data.data;
} 
export const imageDeleteApi = async ( url, folder, fileName )=>{
  let folderName = ''
  if(folder === 'board'){
    folderName = 'pup-patrol-board-image'
  }else{
    folderName = 'pup-patrol-information-image'
  }
  const response = await axios.delete(`${url}?fileName=${fileName}`, {
    headers: {
      'folder': folderName,
    }
  });
  if((response.status/100) >= 3){
    throw new Error('Failed to fetch')
  }
  const data = await response.data;
  return data;
}