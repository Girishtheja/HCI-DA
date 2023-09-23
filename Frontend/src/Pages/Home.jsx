import { Box, Button, Center, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import { ReactComponent as Temple } from '../assets/temple.svg';
import { ReactComponent as Success } from '../assets/Success.svg';
import { ReactComponent as FAQ } from '../assets/FAQ.svg';
import { ReactComponent as Crypto } from '../assets/crypto.svg';
import { ReactComponent as Tezos } from '../assets/tezos-xtz-logo.svg';
import './Home.css'
import "@fontsource/poppins"
import useGlobalContext from "../hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { walletAddress } = useGlobalContext()
    const navigate = useNavigate()
    return (
        <Box bg="background" height={"100%"}>
            <Navbar queryBar={false} />
            <Center padding={"10"}>
                <HStack>
                    <Flex flexDirection={"column"} marginRight={"10rem"} >
                        <Text fontWeight={"extrabold"} color={"white"} fontSize='5xl'>Solve problems,</Text>
                        <Text fontWeight={"extrabold"} fontSize='4xl' className="nft">earn NFTs!</Text>
                        <Heading marginBottom={"5"} size={"md"} color={"white"}>Get rewarded for helping others.</Heading>
                        {walletAddress &&
                            <Button onClick={() => navigate('/query')} marginBottom={"5"} width={"xs"} colorScheme="teal" color={"white"} variant={"solid"}>
                                Go to Feed
                            </Button>
                        }
                    </Flex>
                    <Success height={"30rem"} />
                </HStack>
            </Center>
            <Center padding={"10"}>
                <HStack>
                    <FAQ height={"25rem"} style={{ marginRight: "10rem" }} />
                    <Flex flexDirection={"column"}  >
                        <Text style={{ fontWeight: '800' }} color={"white"} fontSize='5xl'>Don’t let your <span className="doubt">doubt</span></Text>
                        <Text style={{ fontWeight: '800' }} color={"white"} fontSize='5xl'>bother you!</Text>
                        <Text fontWeight={"extrabold"} maxW={"xs"} fontSize='xl' color={"white"}>Our Community is there to help you out</Text>

                    </Flex>
                </HStack>
            </Center>
            <Center padding={"10"}>
                <HStack>
                    <Flex flexDirection={"column"} style={{ marginRight: "10rem" }}>
                        <Text style={{ fontWeight: '800' }} color={"white"} fontSize='5xl'>A <span className="decen">Decentralised</span>
                            <Text style={{ fontWeight: '800' }} color={"white"} fontSize='5xl'>Platform</Text>
                        </Text>
                        <HStack>
                            <Text color={"white"} fontSize='xl'>Powered by </Text>
                            <Tezos height={"2rem"} style={{ color: '#FBD87D' }} />
                            <Text color={"white"} fontSize='xl'>Blockchain</Text>
                        </HStack>
                    </Flex>
                    <Crypto />
                </HStack>
            </Center>
        </Box>
    )
}

export default Home

