// /** @type {import('./$types').PageServerLoad} */
// export async function load({ fetch }) {
//     try {
//         const response = await fetch('https://olive-walls-cough-103-181-222-27.loca.lt/milestone-stats?username=jfes', {
//             method: 'GET', // Change method as needed (GET, POST, PUT, DELETE, etc.)
//             headers: {
//                 "bypass-tunnel-reminder": "HI",
//                 "Content-Type": "application/json"
//             },
//             // body: JSON.stringify({
//             //     query: "example data" // Modify this payload as per your API requirements
//             // })
//         });

//         const data = await response.json();
//         console.log(data);

//         return { data }; // Pass fetched data to +page.svelte
//     } catch (error) {
//         return { error: error.message };
//     }
// }