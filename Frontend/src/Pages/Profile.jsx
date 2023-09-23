import { Avatar, Box, Button, Card, CardBody, CardHeader, CardFooter, Center, Flex, Heading, HStack, IconButton, Image, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { bytes2Char, char2Bytes } from '@taquito/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NFTCard from '../components/NFTCard';
import useGlobalContext from '../hooks/useGlobalContext';
import { BiLike, BiChat, BiShare } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import ProfileQuestion from '../components/ProfileQuestion';
// import { contractAddress } from '../utils/Tezos';

function Profile() {

    const contractAddress = "KT1NSMmpfLZUBY4naxi4CKQ4dhU692F59G3t"
    const nftTypeContract = 1;

    // get NFTs by owner

    const [userNfts, setUserNfts] = useState([])
    const [requests, setRequests] = useState([])
    const [questions, setQuestions] = useState([])

    const navigate = useNavigate()

    const [upvotes, setUpvotes] = useState(0)
    const { userId, walletAddress } = useGlobalContext()

    useEffect(() => {

        const getNFTsByOwner = async () => {
            const response = await axios.get(
                `https://api.ghostnet.tzkt.io/v1/contracts/${contractAddress}/bigmaps/ledger/keys`
            );
            const data = response.data;
            console.log(data);

            // eslint-disable-next-line array-callback-return
            const arr = data.filter((val, ind) => {
                if (val.key.address === walletAddress)
                    return val
            })
            setUserNfts(arr)
        };



        const getUpvotes = async () => {
            try {
                const URL = "http://localhost:5000/user"
                console.log(userId, 'jaydeep')
                const response = await axios.post(`${URL}/all-upvotes`, {
                    user: userId
                })
                setUpvotes(response.data.totalUpvotes)
            }
            catch (error) {
                console.log(error)
            }
        }
        const getQuestions = async () => {
            try {
                const URL = "http://localhost:5000/user"
                const response = await axios.post(`${URL}/get-question-by-user`, {
                    userId: userId
                })
                setQuestions(response.data)
                console.log("aryan", response.data)
            }
            catch (error) {
                console.log(error)

            }
        }


        if (userId) {
            getNFTsByOwner()
            getUpvotes()
            getQuestions()
        }
    }, [userId, walletAddress])

    useEffect(() => {
        if (!walletAddress)
            navigate('/', { replace: true });
    }, [walletAddress, navigate])


    useEffect(() => {

        const checkRequest = async () => {
            if (walletAddress && upvotes >= 5) {
                // request NFT
                const res = await axios.post("http://localhost:5000/request/add-requests", {
                    address: walletAddress,
                    nftType: 1,
                    isApproved: false
                })
                const ans = res.data;
                console.log("dasdasd", ans)

                // if(ans.message && ans.message==="Request already exists"){
                //     console.log("Request already exists")
                // }
                // 
                if (ans.walletAddress) {
                    setRequests([...requests, ans.data]);
                }
            }
        }
        // if(requests.length === 0)
        checkRequest();
    }, [upvotes, walletAddress, requests])

    useEffect(() => {
        const getRequests = async () => {

            const res = await axios.get("http://localhost:5000/request/get-requests");
            const ans = res.data;
            setRequests(ans)
            console.log("requests", ans)
        }
        getRequests();

    }, [])

    return (
        <>
            <Box bg="background" minH={"100%"}>
                <Navbar />
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Text color={"white"} fontSize={"3xl"} as="b" marginBottom={"7"}>Profile</Text>
                    <Card maxWidth={"2xl"} marginBottom={"16"} >
                        <CardBody>
                            <VStack justifyContent={"center"}>
                                <Avatar size={"2xl"} margin="6" src="https://api.dicebear.com/6.x/identicon/svg?seed=Fluffy" />
                                <Stack mt='6' spacing='3' marginTop={"16"} >
                                    <Heading margin="auto" size='md'> {walletAddress.slice(0, 8) + "..." + walletAddress.slice(-4)} </Heading>
                                    <Flex justifyContent={"space-between"}>
                                        <Card margin={"4"}>
                                            <CardBody padding="3" justifyContent={"center"} textAlign="center">
                                                <Text>Upvotes</Text>
                                                <Text fontSize={"xl"} as="b" align="center">{upvotes}</Text>
                                            </CardBody>
                                        </Card>
                                        <Card margin={"4"}>
                                            <CardBody padding="3" justifyContent={"center"} textAlign="center">
                                                <Text>NFTs</Text>
                                                <Text fontSize={"xl"} as="b" align="center">{userNfts.length}</Text>
                                            </CardBody>
                                        </Card>
                                    </Flex>
                                </Stack>
                            </VStack>
                        </CardBody>
                    </Card>


                    {requests.length > 0 && <Text color={"white"} fontSize={"2xl"} as="b">Remaining Requests</Text>}
                    <Box marginTop={"2"} >
                        <VStack padding={"5"}>
                            {requests.map((request) => {
                                return <Card width={"4xl"}>
                                    <CardBody display={"flex"} justifyContent={"space-between"}>
                                        <HStack>
                                            {/* <Avatar size={"sm"} /> */}
                                            <Text fontSize={"sm"}>Congratulations! You have Earned <span style={{ fontWeight: '700' }}>#{request.nftType}</span> NFT. You'll be recieving the NFT soon</Text>
                                        </HStack>
                                    </CardBody>
                                </Card>
                            })}
                        </VStack>
                    </Box>
                    <Heading color={"white"} margin={"10"} fontSize={"3xl"} as="b">Your NFTs</Heading>
                    {userNfts.length === 0 && <Text color={"white"} fontSize={"2xl"} as="b">No NFTs Found</Text>}
                    <SimpleGrid columns={[1, 2, 3]} gap={6} width={"5xl"} paddingBottom="10">
                        {
                            userNfts.map((val, idx) => {
                                return <NFTCard key={idx} id={val.key.nat} nftTypeContract={nftTypeContract} />
                            })
                        }
                    </SimpleGrid>
                    <Heading color={"white"} margin={"10"} fontSize={"3xl"} as="b">Your Questions</Heading>
                    {questions.length === 0 && <Text color={"white"} fontSize={"2xl"} as="b">No Questions Found</Text>}
                    <Box padding="5" >
                        <Center padding="5">
                            <SimpleGrid columns={[1, 2, 3]} gap={6} width={"5xl"}>
                                {questions.map((question, idx) => {
                                    return <Link to={`/answer/${question._id}`}><ProfileQuestion key={idx} question={question} /></Link>
                                })}
                            </SimpleGrid>
                        </Center>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default Profile