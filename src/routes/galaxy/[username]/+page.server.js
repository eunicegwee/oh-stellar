export async function load({ params }) {
    const username = params.username;

    try {
        const response = await fetch(`https://olive-walls-cough-103-181-222-27.loca.lt/donors?username=${username}`, {
            method: "GET",
            headers: {
                "bypass-tunnel-reminder": "HI",
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log(data);

        return { 
            status: 200,
            props: { data }
        };
    } catch (error) {
        return {
            status: 500,
            props: { 
                error: error.message
            }
        };
    }
}