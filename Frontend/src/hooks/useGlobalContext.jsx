import { useContext } from "react"
import { Context } from "../context/GlobalContext"

const useGlobalContext = () => {
    return useContext(Context)
}

export default useGlobalContext
