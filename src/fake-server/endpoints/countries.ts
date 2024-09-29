// application
import axios from 'axios'; // or use 'fetch' if you prefer
import { ICountry } from '~/interfaces/country';

// Function to fetch countries from an external API
export async function getCountries(): Promise<ICountry[]> {
    try {
        // Fetch country data from the REST Countries API
        const response = await axios.get('https://restcountries.com/v3.1/all');

        // Log the response to see the data structure
        console.log('API Response:', response);

        // Map the API response to match your ICountry interface
        const countries: ICountry[] = response.data.map((country: any) => ({
            code: country.cca2, // Country code (ISO Alpha-2 code)
            name: country.name.common, // Country name
        }));

        return countries;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
}


