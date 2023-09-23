import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    initialColorMode: "system",
    useSystemColorMode: false,
    colors: {
        brand: {
            100: "#f7fafc",
            // ...
            900: "#1a202c",
        },
        background: "linear-gradient(111deg, #0093E9 -34.37%, #80D0C7 104.4%)",
    },
    fonts: {
        body: "Poppins, sans-serif",
        heading: "Poppins, sans-serif",
    },
    backgroundColor: {

    },
    gradients: {
        customGradient: 'linear-gradient(111deg, #0093E9 -34.37%, #80D0C7 104.4%)',
    }
})

export default theme