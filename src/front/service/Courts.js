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

export const fetchNearbyCourts = async (latitude, longitude, radius = 2000) => {
    try {
        const request = await fetch(`${API_URL}/api/courts/fetch-nearby`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude, radius })
        })
        const response = await request.json();
        console.log("Nearby courts fetched:", response);
        return response.courts;
    } catch (error) {
        console.log(error);
        return [];
    }
}
