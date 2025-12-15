const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createMatches = async (obj) =>{
    try {
        const request = await fetch(`${API_URL}/api/matches`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(obj),
        });
        const result = await request.json();
        return result
    } catch (error) {
        console.log(error);
        
    }
 }