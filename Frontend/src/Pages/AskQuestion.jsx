import {
    Box, Heading, Text, VStack, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Textarea,
    Center,
    Button,
    Menu,
    HStack,
    MenuList,
    MenuItem,
    MenuButton
} from '@chakra-ui/react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import useGlobalContext from '../hooks/useGlobalContext'
// import useNavigate
import { useNavigate } from 'react-router-dom'
import { ChevronDownIcon } from '@chakra-ui/icons'
const AskQuestion = () => {
    const { userId } = useGlobalContext();
    const navigate = useNavigate()
    const [input, setInput] = useState({
        title: '', description: '', code: '', codeLanguage: '', image: ''
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }


    const handleSubmit = async () => {

        console.log("jaydeep")
        const URL = "http://localhost:5000/question/"
        // e.preventDefault()

        console.log(userId, input.title)
        try {
            const res = await axios.post(`${URL}add-question`, {
                userId: userId,
                title: input.title,
                description: input.description,
                code: input.code,
                codeLanguage: input.codeLanguage,
                image: input.image
            })
            console.log(res)

            // navigate to query page
            navigate('/query')
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <Box bg={"background"} minH={"100vh"}>
                <Navbar />
                <Center>
                    <VStack padding={"10"} color={"white"} maxWidth="sm">
                        <Heading>Ask Question</Heading>
                        <FormControl color="white" width={"xl"}>
                            <FormLabel>Title</FormLabel>
                            <Input required color={"black"} name="title" onChange={handleOnChange} marginBottom={"4"} backgroundColor="white" placeholder='Enter your Question' />
                            <FormControl>
                                {/* <FormLabel>Title</FormLabel>
                                    <Input name="title" onChange={handleAnswer} placeholder="Answer title" /> */}
                                <Menu>
                                    <HStack alignItems={"center"} justifyContent={"space-between"} padding={"2"}>
                                        <FormLabel>Code</FormLabel>
                                        <MenuButton backgroundColor={"white"} color={"black"} size={"sm"} px={2} py={1} as={Button} rightIcon={<ChevronDownIcon />}>
                                            {input.codeLanguage === '' ? 'Select Language' : input.codeLanguage}
                                        </MenuButton>
                                    </HStack>
                                    <MenuList>
                                        <MenuItem color={"black"} onClick={() => setInput({ ...input, codeLanguage: 'javascript' })}>Javascript</MenuItem>
                                        <MenuItem color={"black"} onClick={() => setInput({ ...input, codeLanguage: 'c++' })}>C++</MenuItem>
                                        <MenuItem color={"black"} onClick={() => setInput({ ...input, codeLanguage: 'css' })}>CSS</MenuItem>
                                        <MenuItem color={"black"} onClick={() => setInput({ ...input, codeLanguage: 'java' })}>Java</MenuItem>
                                        <MenuItem color={"black"} onClick={() => setInput({ ...input, codeLanguage: 'python' })}>Python</MenuItem>
                                    </MenuList>
                                </Menu>

                            </FormControl>
                            <Textarea required height={"36"} name="code" color={"black"} onChange={handleOnChange}
                                marginBottom={"4"} backgroundColor="white" placeholder='Put your code' />
                            <FormLabel>Description</FormLabel>
                            <Textarea required name="description" color={"black"} onChange={handleOnChange}
                                marginBottom={"4"} height={"36"} backgroundColor="white" placeholder='Put your query here' />
                            <Button width={"100%"} variant={"solid"} colorScheme="blue" onClick={handleSubmit}>Submit</Button>
                        </FormControl>
                    </VStack>
                </Center>
            </Box>
        </>
    )
}

export default AskQuestion
