import axios from 'axios';

const usersUrl = 'http://localhost:8080';

// Configure axios defaults
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getUsers = async (id) => {
    try {
        id = id || '';
        const response = await axios.get(`${usersUrl}${id ? `/${id}` : ''}`);
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export const getUser = async (id) => {
    try {
        const response = await axios.get(`${usersUrl}/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export const addUser = async (user) => {
    try {
        const response = await axios.post(`${usersUrl}/add`, user);
        return response;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${usersUrl}/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export const editUser = async (id, user) => {
    try {
        const response = await axios.put(`${usersUrl}/${id}`, user);
        return response;
    } catch (error) {
        console.error('Error editing user:', error);
        throw error;
    }
}