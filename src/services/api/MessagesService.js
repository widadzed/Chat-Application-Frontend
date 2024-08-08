const apiUri = import.meta.env.VITE_API_URI;

export const MessagesService = {

    get: async (id, token) => {
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const res = await fetch(`${apiUri}/messages/${id}`, settings)
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