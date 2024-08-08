export const AuthService = {
    login: async (email, password) => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        };

        try {
            console.log('Attempting to log in with:', { email, password });
            const res = await fetch(`${import.meta.env.VITE_API_URI}/auth/login`, settings);
            
            if (res.status === 200) {
                const data = await res.json();
                console.log('Login successful, received token:', data.token);
                return { success: true, message: 'Login successful', token: data.token, id: data.id, username: data.username };
            } else {
                // Handle non-200 responses
                const errorData = await res.json();
                console.error(`Login failed with status ${res.status}: ${res.statusText}`, errorData);
                return { success: false, message: errorData.message || 'Failed to log in' };
            }
        } catch (error) {
            // Log the error stack trace
            console.error('An error occurred during login:', error);
            return { success: false, message: 'An error occurred during login' };
        }
    },

    register: async (username, email, password) => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        };

        try {
            console.log('Attempting to register with:', { username, email, password });
            const res = await fetch(`${import.meta.env.VITE_API_URI}/auth/register`, settings);

            if (res.status === 200) {
                const data = await res.json();
                console.log('Registration successful, received token:', data.token);
                return { success: true, message: 'Registration successful', token: data.token, id: data.id, username: data.username };
            } else {
                // Handle non-200 responses
                const errorData = await res.json();
                console.error(`Registration failed with status ${res.status}: ${res.statusText}`, errorData);
                return { success: false, message: errorData.message || 'Failed to register' };
            }
        } catch (error) {
            // Log the error stack trace
            console.error('An error occurred during registration:', error);
            return { success: false, message: 'An error occurred during registration' };
        }
    },
};
