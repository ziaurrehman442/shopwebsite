// application
import { delayResponse, error } from '~/fake-server/utils';
import { IEditProfileData } from '~/api/base';
import { IUser } from '~/interfaces/user';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userSetCurrent } from '~/store/user/userAction';
// export function accountSignIn(email: string, password: string): Promise<IUser> {
//     if (email === 'red-parts@example.com' && password === '123456') {
//         const user: IUser = {
//             email: 'red-parts@example.com',
//             phone: '38 972 588-42-36',
//             firstName: 'Ryan',
//             lastName: 'Ford',
//             avatar: '//www.gravatar.com/avatar/bde30b7dd579b3c9773f80132523b4c3?d=mp&s=88',
//         };

//         return delayResponse(Promise.resolve(user));
//     }

//     return delayResponse(() => error('AUTH_WRONG_PASSWORD'));
// }
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://[::1]:5000/api/';

export async function accountSignIn(email: string, password: string): Promise<IUser> {
    // const dispatch = useDispatch();
    try {
        // Send a POST request to the login API with email and password
        const response = await fetch(`${apiUrl}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // sending the credentials
        });

        if (!response.ok) {
            // Handle error if the status is not OK (e.g., 401 Unauthorized)
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        // Assuming the response contains user data
        const user: IUser = await response.json();
        localStorage.setItem('email',email);
        localStorage.setItem('user', JSON.stringify(user));

        // Update the Redux store with user data
        // dispatch(userSetCurrent(user));
        return Promise.resolve(user);

    } catch (err) {
        // Handle errors (e.g., wrong password, user not found)
        console.log(err);
        return delayResponse(() => error('AUTH_WRONG_PASSWORD'));
    }
}

// export function accountSignUp(email: string, password: string): Promise<IUser> {
//     if (!/^.+@.+$/.test(email)) {
//         return delayResponse(() => error('AUTH_INVALID_EMAIL'));
//     }

//     if (email === 'red-parts@example.com') {
//         return delayResponse(() => error('AUTH_EMAIL_ALREADY_IN_USE'));
//     }

//     if (password.length < 6) {
//         return delayResponse(() => error('AUTH_WEAK_PASSWORD'));
//     }

//     const user: IUser = {
//         email,
//         phone: '38 972 588-42-36',
//         firstName: 'Ryan',
//         lastName: 'Ford',
//         avatar: '//www.gravatar.com/avatar/bde30b7dd579b3c9773f80132523b4c3?d=mp&s=88',
//     };

//     return delayResponse(Promise.resolve(user));
// }
export async function accountSignUp(email: string, password: string): Promise<IUser> {
    // Basic email validation using regex
    if (!/^.+@.+$/.test(email)) {
        return delayResponse(() => error('AUTH_INVALID_EMAIL'));
    }

    // Check if the email is already in use (in this example, 'red-parts@example.com' is used as an existing one)
    if (email === 'red-parts@example.com') {
        return delayResponse(() => error('AUTH_EMAIL_ALREADY_IN_USE'));
    }

    // Password validation (must be at least 6 characters)
    if (password.length < 6) {
        return delayResponse(() => error('AUTH_WEAK_PASSWORD'));
    }

    // Split the `name` into `firstName` and `lastName` based on the first space
    // const [firstName, lastName = ''] = name.split(' ');

    // Make the API call to sign up the user
    try {
        const response = await fetch(`${apiUrl}register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Signup failed');
        }
        localStorage.setItem('email',email);
        const user = await response.json();

        // Return the user data as IUser after successful signup
        return delayResponse(Promise.resolve({
            email: email,
            phone: user.phone, // Default phone number if not provided
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
        }));
    } catch (err) {
        // Handle error during the signup process
        console.log(err);
        return delayResponse(() => error("err"));
    }
}

export function accountSignOut(): Promise<void> {
    // const dispatch = useDispatch();
    // dispatch(clearUser());

    // Remove the user data from localStorage
    localStorage.removeItem('user');
    
    return Promise.resolve();
}

// export function accountEditProfile(data: IEditProfileData): Promise<IUser> {
//     const user: IUser = {
//         email: data.email,
//         phone: data.phone,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         avatar: '',
//     };

//     return delayResponse(Promise.resolve(user));
// }


export async function accountEditProfile(data: IEditProfileData): Promise<IUser> {
    // Construct the updateUserDto from the passed data
    const updateUserDto = {
        name: `${data.firstName} ${data.lastName}`,
        profile: {
            contact: data.phone,
        },
    };

    const email = data.email;  // This will be used as the 'id' parameter in the URL

    try {
        const response = await fetch(`${apiUrl}users/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateUserDto),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error updating profile');
        }

        const updatedUser: IUser = await response.json();
        return updatedUser;
    } catch (error) {
        return Promise.reject(error);
    }
}




// export function accountChangePassword(oldPassword: string, newPassword: string): Promise<void> {
//     if (newPassword.length < 6) {
//         return delayResponse(() => error('AUTH_WEAK_PASSWORD'));
//     }

//     return delayResponse(Promise.resolve());
// }

export async function accountChangePassword(oldPassword: string, newPassword: string): Promise<void> {
    // Retrieve the logged-in user's email from localStorage
    const email = localStorage.getItem('email');
    
    if (!email) {
        // If no email is found in localStorage, throw an error
        return Promise.reject(new Error('User is not logged in'));
    }

    if (newPassword.length < 6) {
        return Promise.reject(new Error('AUTH_WEAK_PASSWORD'));
    }

    // Create a DTO to send to the backend
    const changePasswordDto = {
        oldPassword,
        newPassword,
        email,
    };

    // Send the change password request to the backend API
    try {
        const response = await fetch(`${apiUrl}change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changePasswordDto),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error changing password');
        }

        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

// Action types
const CLEAR_USER = 'CLEAR_USER';

// Action creator
export const clearUser = () => ({
    type: CLEAR_USER,
});

// User reducer
const initialState = {
    user: null,
};

export function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case CLEAR_USER:
            return {
                ...state,
                user: null,  // Clear the user data
            };
        default:
            return state;
    }
}
