import React from 'react';
import './App.css';
import {Box, Button, Card, CardBody, Flex, Heading, Input, ListItem, OrderedList, VStack} from "@chakra-ui/react";
import {Alocacao, Sorteio} from "./services/Sorteio";

function App() {

    const [totalDuplas, setTotalDuplas] = React.useState<number>(0);
    const [totalSetores, setTotalSetores] = React.useState<number>(0);
    const [mapaAlocacao, setMapaAlocacao] = React.useState<Map<number, Alocacao[]>>(new Map<number, Alocacao[]>());

    const handleChangeTotalDuplas = (event: React.ChangeEvent<HTMLInputElement>) => setTotalDuplas(parseInt(event.target.value));
    const handleChangeTotalSetores = (event: React.ChangeEvent<HTMLInputElement>) => setTotalSetores(parseInt(event.target.value));

    function handleClick() {
        let sorteio = new Sorteio(totalDuplas, totalSetores);
        setMapaAlocacao(sorteio.getMapaSorteado());
    }

    return (
        <Box bg={"rgba(255, 255, 255, 0.5)"}
             rounded={"md"}
             maxW={"container.xl"}
             marginLeft={"auto"}
             marginRight={"auto"}
             marginTop={"3em"}
             marginBottom={"3em"}
             paddingLeft={"3em"}
             paddingRight={"3em"}
             paddingTop={"2em"}
             paddingBottom={"2em"}>
            <VStack>
                <Heading size={"lg"} textAlign={"center"}>Torneio de Pesca - A Casa do Lago</Heading>
                <span>
                    Duplas:
                </span>
                <Input size={"md"} bg={"white"} type={"number"} placeholder={"Número de duplas."}
                       onChange={handleChangeTotalDuplas}/>
                <span>Setores:</span>
                <Input size={"md"} bg={"white"} type={"number"} placeholder={"Número de setores."}
                       onChange={handleChangeTotalSetores}/>
                <Button colorScheme={"blackAlpha"} onClick={handleClick}>Sortear</Button>
                <Flex flexFlow={"row"} flexWrap={"wrap"} gap={"6"} justifyContent={"center"}>
                    {
                        [...mapaAlocacao.entries()].map(([key, value]) =>
                            <Card minW={"260px"} minH={"280px"}>
                                <CardBody display={"flex"} flexFlow={"column"} justifyContent={"center"}>
                                    <VStack alignContent={"baseline"}>
                                        <Heading size={"4xl"} textAlign={"center"}>{key}</Heading>
                                        <OrderedList>
                                            {
                                                value.map((item) => (
                                                    <ListItem>Setor: {item.setor} - Raia: {item.raia.toString().padStart(2, "0")}</ListItem>
                                                ))
                                            }
                                        </OrderedList>
                                    </VStack>
                                </CardBody>
                            </Card>
                        )
                    }
                </Flex>
            </VStack>
        </Box>
    );
}

export default App;
