import { Text, VStack, Center } from "@chakra-ui/react"
import Navbar from "./Navbar"

const Feed = () => {
    return (
        <VStack>
            <Navbar />
            <VStack>
                <Text fontSize={""}>Top Queries</Text>
            </VStack>
        </VStack>
    )
}

export default Feed
