import { API } from "../Config";

export const saveTemplate =(texts , template , token , userId , videoId) =>{
    
    return fetch(`${API}/templates/create/${userId}/${videoId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:"Bearer " + token // token
        },
  
        body: JSON.stringify({
            ...template,
            texts

        }),
      })
        .then((responce) => {
          return responce.json();
        })
        .catch((err) => {
          console.log(err);
        });
}


export const getTemplates =(  userId , token) =>{
    
  return fetch(`${API}/templates/get/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:"Bearer " + token // token
      },

     
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => {
        console.log(err);
      });
}

