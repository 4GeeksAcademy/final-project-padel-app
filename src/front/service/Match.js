const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createMatches = async (obj) => {
    try {
        const token = localStorage.getItem("token");
        
        if (!token) {
            throw new Error("No token available");
        }

        const request = await fetch(`${API_URL}/api/matches`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // ⭐ AGREGADO
            },
            body: JSON.stringify(obj),
        });

        if (!request.ok) {
            throw new Error(`Error: ${request.status}`);
        }

        const result = await request.json();
        return result;
    } catch (error) {
        console.error("Error creating match:", error);
        throw error;
    }
};

export const getListMatches = async () => {
    try {
        const request = await fetch(`${API_URL}/api/matches`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!request.ok) {
            throw new Error(`Error: ${request.status}`);
        }

        const response = await request.json();
        return response;
    } catch (error) {
        console.error("Error fetching matches:", error);
        throw error;
    }
};

export const joinMatch = async (userId, matchId) => {
    try {
        const token = localStorage.getItem("token");
        
        if (!token) {
            throw new Error("No token available");
        }

        const response = await fetch(`${API_URL}/api/match_users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: userId,
                match_id: matchId,
                is_player: true
            })
        });

        if (!response.ok) {
            throw new Error("Error joining match");
        }

        return await response.json();
    } catch (error) {
        console.error("Join match error:", error);
        throw error;
    }
};

export const deleteMatch = async (matchId) => {
    try {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/matches/${matchId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!resp.ok) throw new Error("Error al eliminar el partido");
        return await resp.json();
    } catch (error) {
        console.error("Error en deleteMatch:", error);
        return null;
    }
};