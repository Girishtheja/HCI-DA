import { Avatar, Box, Button, Card, CardBody, Center, HStack, Text, VStack } from "@chakra-ui/react"
import QuestionCard from "../components/QuestionCard"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import AnswerCard from "../components/AnswerCard"
import { useParams } from "react-router-dom"
import axios from "axios"
import useGlobalContext from "../hooks/useGlobalContext"
import { Audio, Circles, Bars } from 'react-loader-spinner'

const Answer = () => {

    const [question, setQuestion] = useState({})
    const [userQuestion, setUserQuestion] = useState('')
    const [answers, setAnswers] = useState([])
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    const { userId } = useGlobalContext()

    const URL = "http://localhost:5000"

    const newAnswer = async (newans) => {
        setAnswers([...answers, newans])
        const getAnswers = async () => {
            const answers = await axios.get(`${URL}/answer/answers/${id}`)
            setAnswers(answers.data)
        }
        getAnswers();
    }

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const ques = await axios.get(`${URL}/question/get-question/${id}`)
                setQuestion(ques.data[0])
                setUserQuestion(ques.data[0].userId.account)
            }
            catch (err) {
                console.log(err)
            }
        }

        const getAnswers = async () => {
            const answers = await axios.get(`${URL}/answer/answers/${id}`)
            setAnswers(answers.data)
        }

        getQuestions()
            .then(() => getAnswers())
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, [id, userId])

    return (
        <Box bg="background" minH={"100vh"} padding={"2"}>
            {loading ? (
                <Box
                    height="100vh"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Bars
                        height="80"
                        width="80"
                        radius="9"
                        color="#19376D"
                        ariaLabel="loading"
                    />
                </Box>
            ) : (
                <>
                    <Navbar queryBar={false} isAdmin={false} />
                    <Center marginBottom={"7"}>
                        <VStack>
                            {userQuestion !== "" && (
                                <QuestionCard
                                    key={question._id}
                                    newAnswer={newAnswer}
                                    id={question._id}
                                    user={userQuestion}
                                    title={question.title}
                                    description={question.description}
                                    code={question.code}
                                    codeLanguage={question.codeLanguage}
                                    image={question.image}
                                    length={answers.length}
                                />
                            )}
                            {answers.length === 0 && (
                                <Text color={"white"}>
                                    No one has answered this question yet
                                </Text>
                            )}
                            {answers !== undefined &&
                                answers.map((answer) => (
                                    <AnswerCard
                                        key={answer._id}
                                        id={answer._id}
                                        user={answer.userId.account}
                                        content={answer.content}
                                        code={answer.code}
                                        codeLanguage={answer.codeLanguage}
                                        upvotes={answer.upvotes}
                                        downvotes={answer.downvotes}
                                    />
                                ))}
                        </VStack>
                    </Center>
                </>
            )}
        </Box>
    )
}

export default Answer;
