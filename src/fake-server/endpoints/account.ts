// application
import { delayResponse, error } from '~/fake-server/utils';
import { IEditProfileData } from '~/api/base';
import { IUser } from '~/interfaces/user';

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
    return Promise.resolve();
}

export function accountEditProfile(data: IEditProfileData): Promise<IUser> {
    const user: IUser = {
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: '//www.gravatar.com/avatar/bde30b7dd579b3c9773f80132523b4c3?d=mp&s=88',
    };

    return delayResponse(Promise.resolve(user));
}

export function accountChangePassword(oldPassword: string, newPassword: string): Promise<void> {
    if (newPassword.length < 6) {
        return delayResponse(() => error('AUTH_WEAK_PASSWORD'));
    }

    return delayResponse(Promise.resolve());
}
