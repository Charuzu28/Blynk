import { createContext, useEffect, useState, useRef, useContext } from "react";

const ThemeContext = createContext();

const STORAGE_KEY = "blinky_theme_v1";

export const ThemeProvider = ({children}) => {
    const saved = (() => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY));
        } catch (error) {
            return null;
        }
    })();

    const [theme, setTheme] = useState(saved?.theme || "blue");
    const [darkMode, setDarkMode] = useState(saved?.darkMode ?? false);

    useEffect(() => {
        try{
            localStorage.setItem(STORAGE_KEY, JSON.stringify({theme, stringify}))
        }catch(err){}
    },[theme, darkMode]);

    useEffect(() => {
        if(darkMode){
            document.documentElement.classList.add('dark')
        }else{
           document.documentElement.classList.remove('dark') 
        }
    },[darkMode])

    const value = {theme, setTheme, darkMode, setDarkMode};

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext);