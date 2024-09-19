// application
// import { addresses, getNextAddressId } from '~/fake-server/database/addresses';
// import { clone, delayResponse } from '~/fake-server/utils';
// import { IAddress } from '~/interfaces/address';
// import { IEditAddressData } from '~/api/base';


// const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://[::1]:5000/api/';
// export async function getDefaultAddress(): Promise<IAddress | null> {
//     // Get email from localStorage
//     const email = localStorage.getItem('email');

//     if (!email) {
//         return Promise.reject(new Error('Email not found in localStorage'));
//     }

//     // API endpoint to send the email and get the default address
    

//     try {
//         // Make the API call with the email
//         const response = await fetch(`${apiUrl}me`, {
//             method: 'POST', // Change to GET or POST depending on API requirements
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email }),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch address from API');
//         }

//         const data = await response.json();
//         console.log(data);
//         // Assuming the API returns an array of addresses and finds the default one
//         const defaultAddress = data.addresses.find((x: IAddress) => x.default) || null;

//         return Promise.resolve(defaultAddress);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// }


// export function getAddress(addressId: number): Promise<IAddress> {
//     return Promise.resolve(clone(addresses.find((x) => x.id === addressId) || null));
// }

// export function getAddresses(): Promise<IAddress[]> {
//     return Promise.resolve(clone(addresses));
// }

// export function addAddress(data: Partial<IEditAddressData>): Promise<IAddress> {
//     const address: IAddress = {
//         id: getNextAddressId(),
//         firstName: '',
//         lastName: '',
//         company: '',
//         country: '',
//         address1: '',
//         address2: '',
//         city: '',
//         state: '',
//         postcode: '',
//         email: '',
//         phone: '',
//         default: false,
//         ...data,
//     };

//     if (addresses.length < 1) {
//         address.default = true;
//     }

//     if (address.default) {
//         for (let i = 0; i < addresses.length; i += 1) {
//             addresses[i].default = false;
//         }
//     }

//     addresses.push(address);

//     return delayResponse(Promise.resolve(address));
// }

// // noinspection DuplicatedCode
// export function editAddress(addressId: number, data: IEditAddressData): Promise<IAddress> {
//     const address = addresses.find((x) => x.id === addressId);

//     if (!address) {
//         throw new Error('Address not found');
//     }

//     address.firstName = data.firstName;
//     address.lastName = data.lastName;
//     address.company = data.company;
//     address.country = data.country;
//     address.address1 = data.address1;
//     address.address2 = data.address2;
//     address.city = data.city;
//     address.state = data.state;
//     address.postcode = data.postcode;
//     address.email = data.email;
//     address.phone = data.phone;
//     address.default = data.default;

//     if (address.default) {
//         for (let i = 0; i < addresses.length; i += 1) {
//             addresses[i].default = addresses[i].id === addressId;
//         }
//     }

//     return delayResponse(Promise.resolve(address));
// }

// export function delAddress(addressId: number): Promise<void> {
//     const index = addresses.findIndex((x) => x.id === addressId);

//     if (index !== -1) {
//         const address = addresses.splice(index, 1)[0];

//         if (address.default && addresses.length > 0) {
//             addresses[0].default = true;
//         }
//     }

//     return delayResponse(Promise.resolve());
// }



import { IAddress } from '~/interfaces/address';
import { IEditAddressData } from '~/api/base';
import { clone } from '../utils';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://[::1]:5000/api/';

// Get default address by email
export async function getDefaultAddress(): Promise<IAddress | null> {
    const email = localStorage.getItem('email');

    if (!email) {
        return Promise.reject(new Error('Email not found in localStorage'));
    }

    try {
        const response = await fetch(`${apiUrl}addresses/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('email')}`, // Ensure token is correct
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch address from API: ${response.statusText}`);
        }

        const data = await response.json();
        // console.log(data);

        // Assuming the API returns an array of addresses, find the default one
        const defaultAddress = data.addresses?.find((x: IAddress) => x.default) || null;

        return defaultAddress;
    } catch (err) {
        return Promise.reject(err);
    }
}

// Get a specific address by ID
export async function getAddress(addressId: number): Promise<IAddress> {
  
    try {
        const response = await fetch(`${apiUrl}address/${addressId}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch address: ${response.statusText}`);
        }

        const address = await response.json();
        console.log(address);
        return Promise.resolve(clone(address? address.address : ''));
        // return address;
    } catch (err) {
        return Promise.reject(err);
    }
}

// Get all addresses for the authenticated user
export async function getAddresses(): Promise<IAddress[]> {
    try {
        const response = await fetch(`${apiUrl}addresses/${localStorage.getItem('email')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is correct
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch addresses from API: ${response.statusText}`);
        }

        const data = await response.json();
        
        return data.addresses;
    } catch (err) {
        return Promise.reject(err);
    }
}

// Add a new address
export async function addAddress(data: Partial<IEditAddressData>): Promise<IAddress> {
    try {
        const response = await fetch(`${apiUrl}addresses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is correct
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Failed to add address: ${response.statusText}`);
        }

        const newAddress = await response.json();
        return newAddress;
    } catch (err) {
        return Promise.reject(err);
    }
}

// Edit an existing address by ID
export async function editAddress(addressId: number, data: IEditAddressData): Promise<IAddress> {
    try {
        const response = await fetch(`${apiUrl}addresses/${addressId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is correct
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Failed to update address: ${response.statusText}`);
        }

        const updatedAddress = await response.json();
        return updatedAddress;
    } catch (err) {
        return Promise.reject(err);
    }
}

// Delete an address by ID
export async function delAddress(addressId: number): Promise<void> {
    try {
        const response = await fetch(`${apiUrl}addresses/${addressId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is correct
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete address: ${response.statusText}`);
        }

        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}
