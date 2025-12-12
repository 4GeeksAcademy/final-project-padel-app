const API_URL = import.meta.env.VITE_BACKEND_URL;
export const getListCours = async() =>{
    
    try {
        const request = await fetch(`${API_URL}/api/courts`,{
           method: "GET",
           headers: {
                'Content-Type': 'application/json',
           }
        })
        const response = await request.json();
        console.log(response);
        
        return response
    } catch (error) {
        console.log(error);
        
    }
}

