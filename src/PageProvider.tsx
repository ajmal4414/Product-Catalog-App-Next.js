"use client"
import{ThemeProvider, CssBaseline} from "@mui/material";
import {useTheme} from "next-themes";
import {ReactNode, useEffect ,useState} from 'react';
import {darkTheme, lightTheme} from "../component/theme";



interface PageProviderProps{
    children: ReactNode;
}

const PageProvider = ({children}:PageProviderProps)=>{
    const {resolvedTheme} = useTheme()

    const [currentTheme, setCurrentTheme] = useState(lightTheme)

    const [mounted, setMounted] = useState(false)

    useEffect(()=>{
        setMounted(true)
    },[])

    useEffect(()=>{
       if (mounted && resolvedTheme)
        {setCurrentTheme(resolvedTheme === "dark"? darkTheme : lightTheme);

        }

    },[mounted,resolvedTheme])

    if (!mounted) return<>{children}</>
    return <ThemeProvider theme={currentTheme}>
        <CssBaseline/>
        {children}
        </ThemeProvider>
}

export default PageProvider