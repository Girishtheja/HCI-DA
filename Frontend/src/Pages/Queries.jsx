import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import QueryCard from "../components/QueryCard"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Spinner } from "@chakra-ui/react"
import { Audio, Circles, Bars } from 'react-loader-spinner'

const Query = () => {

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getQueries = async () => {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/question/get-question");
            setQuestions(response.data);
            setLoading(false);
        };
        getQueries();
    }, []);

    return (
        <Box bg="background" minHeight={"100vh"}>
            <Navbar queryBar={true} />
            <VStack padding={"6"}>
                {!loading && <Heading color={"#19376D"} marginBottom={"10"}>Top Queries</Heading>}
                {loading && <Bars
                    height="80"
                    width="80"
                    radius="9"
                    color="#19376D"
                    ariaLabel="loading"
                />}
                {!loading && questions.length === 0 && <Text color={"white"}>No queries yet</Text>}
                {!loading && questions.map((question) => (
                    <Link to={`/answer/${question._id}`}>
                        <QueryCard
                            key={question._id}
                            title={question.title}
                            total={question.ans}
                            description={question.description}
                            code={question.code}
                            codeLanguage={question.codeLanguage}
                            image={question.image}
                            user={question.userId.account}
                        />
                    </Link>
                ))}
            </VStack>
        </Box>
    )
}

export default Query
