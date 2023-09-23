import { Avatar, Box, Button, Card, CardBody, CardHeader, CardFooter, Center, Flex, Heading, HStack, IconButton, Image, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';

const ProfileQuestion = (props) => {
    return (
        <Card maxW='md'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        {/* <Avatar name='Segun Adebayo' src='https://api.dicebear.com/6.x/identicon/svg?seed=Fluffy' /> */}

                        <Box justifyContent={"center"} >
                            <Heading size='md' noOfLines={[1]}>{props.question.title}</Heading>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                    // icon={<BsThreeDotsVertical />}
                    />
                </Flex>
            </CardHeader>
            <CardBody>
                <Text noOfLines={[1]}>
                    {props.question.description}
                </Text>
            </CardBody>
            <CardFooter justify='center' color={"blue.400"}
                sx={{
                    '& > button': {
                        minW: '136px',
                    },
                }}>
                <Text>{`${props.question.ans}`} Answers</Text>
            </CardFooter>
        </Card>
    )
}

export default ProfileQuestion
