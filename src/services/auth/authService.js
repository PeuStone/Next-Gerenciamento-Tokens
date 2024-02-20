export const authService = {
    async login({ username, password }) {
        return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(async (respostaServidor) => {
                if (!respostaServidor.ok) throw new Error('Usuário ou senha inválidos!');
                const body = await respostaServidor.json()
                console.log(body);
            })
    }
}