import { Avatar, Box, Card, CardBody, Flex, Heading, Button, Text, CardHeader, CardFooter, IconButton, VStack } from "@chakra-ui/react"
import useGlobalContext from "../hooks/useGlobalContext"
import { BsThreeDotsVertical } from "react-icons/bs"
import { BiLike, BiChat, BiShare, BiDislike } from "react-icons/bi"
import { useEffect, useState } from "react"
// import { useState } from "react"
// import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
// import { HiThumbDown, HiThumbUp } from 'react-icons/hi'

const QueryCard = (props) => {
    // const [toggleLike, setToggleLike] = useState(false)
    // const [count, setCount] = useState(5)
    const { walletAddress } = useGlobalContext()


    const text = props.description
    return (
        // <Card minW={"lg"} marginBottom={"7"}>
        //     <CardBody>
        //         <Flex flexDirection={"column"}>
        //             <Flex>
        //                 <Heading size={"sm"} >{props.title}</Heading>
        //                 Box
        //             </Flex>
        //             <Container paddingLeft={0}>
        //                 <Text>{text.slice(0, 170) + "..."}</Text>
        //             </Container>
        //             <Flex justifyContent={"space-between"} marginTop={"3"}>
        //                 <HStack>
        //                     <Avatar size={"sm"} />
        //                     <Box display={"flex"} flexDirection={"column"}>
        //                         {/* <Text fontSize={"smaller"}>Fidal Mathew</Text> */}
        //                         <Text fontSize={"smaller"}>{props.user === walletAddress ? "You" : props.user.slice(0, 7) + '...' + props.user.slice(-4)}</Text>
        //                     </Box>
        //                 </HStack>
        //                 {/* <HStack alignItems={"center"}>
        //                     {!toggleLike ? <FiThumbsUp onClick={() => {
        //                         setToggleLike(prev => !prev)
        //                         setCount(prev=>prev+1)
        //                     }
        //                     } /> : <HiThumbUp onClick={() => {
        //                         setToggleLike(prev => !prev)
        //                         setCount(prev => prev - 1)
        //                     }
        //                     } />}
        //                     <Text>{count}</Text>
        //                     <FiThumbsDown />
        //                     <Text>-100</Text>
        //                 </HStack> */}
        //             </Flex>
        //         </Flex>
        //     </CardBody>
        // </Card>
        <Card w={"50rem"} background={"#FFFBEB"}>
            <CardHeader paddingBottom={0}>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Aryan Vigyat' src="" />

                        <Box>
                            {/* <Heading size='sm'>Segun Adebayo</Heading> */}
                            <Text>{props.user === walletAddress ? "You" : props.user.slice(0, 7) + '...' + props.user.slice(-4)}</Text>
                        </Box>
                    </Flex>
                    {/* <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<BsThreeDotsVertical />}
                    /> */}

                    <Text>{props.total} {props.total === 1 ? 'Answer' : 'Answers'} </Text>
                </Flex>
            </CardHeader>
            <CardBody>
                <Heading size={"sm"} marginBottom={5}>{props.title}</Heading>
                <Text>
                    {props.description}
                </Text>
            </CardBody>
        </Card>
    )
}

export default QueryCard
