import axios from 'axios';

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE2ODI0NTgwNTIsImlhdCI6MTY4MjQ0MDA1Mn0.LNHCt7Jre3AT8Ux-zkU4vJyVZnYw_U58-NR55MIdzRUeFqbTWhLXt1YLpLH2iRYkiLKBHEa_bKqqVIadQNp3cg";

export async function getAllUsers(){
    try{
        const response = await fetch("http://localhost:9999/user/page/0/size/10");
        return await response.json();
    }catch(error){
        return[];
    }
}

export async function createUser(data) {
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}