import Navbar from '../components/Navbar'
import { Box } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import MintRequest from "../components/MintRequest"

const Admin = () => {
    const [requests, setRequests] = useState([])
    const [update, setUpdate] = useState(true)


    const URL = "http://localhost:5000/"

    useEffect(() => {
        const getRequests = async () => {
            const response = await axios.get("http://localhost:5000/request/get-requests");
            setRequests(response.data);
            console.log("adsd", response.data)
        };
        getRequests();
    }, [update]);


    return (
        <Box bg={"background"} minH={"100vh"}>
            <Navbar queryBar={false} isAdmin={true} />
            {
                requests.map((req, idx) => (<MintRequest key={idx} id={req._id} address={req.address} nftType={req.nftType} setUpdate={setUpdate} update={update} />))
            }
        </Box>
    )
}

export default Admin
