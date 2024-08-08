const apiUri = import.meta.env.VITE_API_URI;

export const UsersService = {

    getAll: async (token) => {
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const res = await fetch(`${apiUri}/users`, settings)
            if(res.ok) {
                const data = await res.json();
                return data;
            } else {
                //todo
            }
        } catch {
            return [];
        }
    },

}