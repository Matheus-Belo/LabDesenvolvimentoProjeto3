import axios from 'axios';

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE2ODI0ODQ1NDEsImlhdCI6MTY4MjQ2NjU0MX0.RthoHRyZob6TEV_LG4GY1qlsBBY06f7Ktxw7_AvnCWwuT0XJlx8YjZaUCnvr_cEug-sMymqHct_l-ozZbXNkdQ";

export async function getAllUsers(){
    try{
        const response = await fetch("http://localhost:9999/user/page/0/size/10");
        return await response.json();
    }catch(error){
        return[];
    }
}

export async function createUser(data) {
    const response = await fetch(`/api/user/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}