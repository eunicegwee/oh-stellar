import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    const username = cookies.get('username'); // Retrieve cookie

    if (!username) {
        throw redirect(302, '/login'); // Redirect to login page
    }

    return { username: username };
}