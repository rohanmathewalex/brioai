const API_URL = import.meta.env.VITE_API_URL;
console.log(`env is ${API_URL}`)

export interface UserData{
    name?: string,
    email: string;
    password: string;
}

export const registerUser = async(userData: UserData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    console.log(response)

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Registration failed');
    }

    return await response.json(); //Return response data (eg: token)
};


export const loginUser = async(userData: UserData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Login failed');
    }

    return await response.json(); // Return response data
}