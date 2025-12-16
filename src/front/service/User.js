const API_URL_LILI = 'https://literate-engine-5gr9pw96wg627x5x-3001.app.github.dev'

export const createUser = async (obj) =>{
    try {
        // const request = await fetch(`https://literate-engine-5gr9pw96wg627x5x-3001.app.github.dev/api/register`,{
        const request = await fetch(`${API_URL_LILI}/api/register`,{
            method: "POST",
            headers: {
                // "accept": "application/json"
                "Content-Type": "application/json"
            },
            body:JSON.stringify(obj),
        });
        const result = await request.json();
        console.log(result);
    } catch (error) {
        console.log(error);
        
    }
 }