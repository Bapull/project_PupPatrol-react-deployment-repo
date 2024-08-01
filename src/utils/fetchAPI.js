const refreshURL = 'http://localhost:8000/api/refresh'

const refreshToken = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch(refreshURL, {
    method:"GET",
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json",
      "Authorization": `bearer ${token}`
    }
  });
  if(!response.ok){
    throw new Error('Failed to fetch')
  }
  const data = await response.json();
  localStorage.setItem('token',data.newToken)
  return data.newToken;
}

export const getApi = async (url) => {
  const response = await fetch(url, {
    method:"GET",
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json",
    }
  });
  if(!response.ok){
    throw new Error('Failed to fetch')
  }
  const data = await response.json();
  return data;
}

export const getTokenApi = async (url) => {
  const token = localStorage.getItem('token')
  const response = await fetch(url, {
    method:"GET",
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json",
      "Authorization": `bearer ${token}`
    }
  });
  if(!response.ok){
    const newToken = await refreshToken();
    const response2 = await fetch(url, {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Authorization": `bearer ${newToken}`
      }
    });
    if(!response2.ok){
      throw new Error("로그인 만료되었거나, 해당 데이터가 없습니다.")
    }
    const data2 = await response2.json();
    return data2;
  }
  const data = await response.json();
  return data;
}
export const postApi = async (url,body) => {
  const token = localStorage.getItem('token')
  const response = await fetch(url, {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json",
      "Authorization": `bearer ${token}`
    },
    body:JSON.stringify(body)
  });
  if(!response.ok){
    const newToken = await refreshToken();
    const response2 = await fetch(url, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Authorization": `bearer ${newToken}`
      },
      body:JSON.stringify(body)
    });
    if(!response2.ok){
      throw new Error("로그인 만료되었거나, 해당 데이터가 없습니다.")
    }
    const data2 = await response2.json();
    return data2;
  }
  const data = await response.json();
  return data;
}
export const loginApi = async (url, idAndPassword) => {
  const response = await fetch(url, {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json",
    },
    body:JSON.stringify(idAndPassword)
  });
  if(!response.ok){
    throw new Error('Failed to fetch')
  }
  const data = await response.json();
  localStorage.setItem('token',data.token)
  return true
}
export const putApi = async (url,body) => {
  const token = localStorage.getItem('token')
  const response = await fetch(url, {
    method:"PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json",
      "Authorization": `bearer ${token}`
    },
    body:JSON.stringify(body)
  });
  if(!response.ok){
    const newToken = await refreshToken();
    const response2 = await fetch(url, {
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Authorization": `bearer ${newToken}`
      },
      body:JSON.stringify(body)
    });
    if(!response2.ok){
      throw new Error("로그인 만료되었거나, 해당 데이터가 없습니다.")
    }
    const data2 = await response2.json();
    return data2;
  }
  const data = await response.json();
  return data;
}
export const patchApi = async (url,body) => {
  const token = localStorage.getItem('token')
  const response = await fetch(url, {
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json",
      "Authorization": `bearer ${token}`
    },
    body:JSON.stringify(body)
  });
  if(!response.ok){
    const newToken = await refreshToken();
    const response2 = await fetch(url, {
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Authorization": `bearer ${newToken}`
      },
      body:JSON.stringify(body)
    });
    if(!response2.ok){
      throw new Error("로그인 만료되었거나, 해당 데이터가 없습니다.")
    }
    const data2 = await response2.json();
    return data2;
  }
  const data = await response.json();
  return data;
}
export const deleteApi = async (url) => {
  const token = localStorage.getItem('token')
  const response = await fetch(url, {
    method:"DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json",
      "Authorization": `bearer ${token}`
    }
  });
  if(!response.ok){
    const newToken = await refreshToken();
    const response2 = await fetch(url, {
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Authorization": `bearer ${newToken}`
      }
    });
    if(!response2.ok){
      throw new Error("로그인 만료되었거나, 해당 데이터가 없습니다.")
    }
    const data2 = await response2.json();
    return data2;
  }
  const data = await response.json();
  return data;
}

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