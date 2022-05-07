export const capitalizeFirstLetter = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const AUTH3_REFRESH_TOKEN_SECRET = process.env.REACT_APP_REFRESH_TOKEN_SECRET? process.env.REACT_APP_REFRESH_TOKEN_SECRET: ''; 
export const INFURA_KEY = process.env.REACT_APP_INFURA_KEY? process.env.REACT_APP_INFURA_KEY: ''; 
