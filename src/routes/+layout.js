export async function load({ data }) {
    return {
        navLinks: [
            {
                name: "Home",
                href: "/"
            },
            {
                name: "Milestones",
                href: "/milestones",
            }
        ]
    }
}