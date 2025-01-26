import fetch from 'node-fetch';

const login = async () => {
    const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                mutation {
                    login(username: "testuser", password: "hashed_password") {
                        token
                    }
                }
            `,
        }),
    });

    const data = await response.json();
    console.log(data);
};

login();
