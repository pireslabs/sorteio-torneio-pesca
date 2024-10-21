import React from 'react';
import './App.css';
import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    css,
    Flex,
    Heading,
    Image,
    ListItem,
    OrderedList,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";
import {Alocacao, Sorteio} from "./services/Sorteio";
import PairCard from "./components/PairCard/PairCard";
import TrophyIcon from "./icons/material/TrophyIcon";
import SunnyIcon from "./icons/material/SunnyIcon";
import DarkModeIcon from "./icons/material/DarkModeIcon";


function App() {

    const [etapa, setEtapa] = React.useState<number>(0);
    const [mapaAlocacaoDiurna, setMapaAlocacaoDiurna] = React.useState<Map<number, Alocacao[]>>(new Map<number, Alocacao[]>());
    const [mapaAlocacaoNoturna, setMapaAlocacaoNoturna] = React.useState<Map<number, Alocacao[]>>(new Map<number, Alocacao[]>());

    const [selectedCards, setSelectedCards] = React.useState<Set<number>>(new Set());
    const [totalSelected, setTotalSelected] = React.useState<number>(0);

    const toast = useToast();

    function handleClick() {
        let sorteio = new Sorteio(20, 4);
        setMapaAlocacaoDiurna(sorteio.getMapaSorteado());
    }

    function handleVoltar(): void {
        setEtapa(0);
        setMapaAlocacaoDiurna(new Map<number, Alocacao[]>());
        setMapaAlocacaoNoturna(new Map<number, Alocacao[]>());
        setSelectedCards(new Set<number>());
        setTotalSelected(0);
    }

    function getCorSetor(setor: number): string {
        switch (setor) {
            case 1:
                return "red";
            case 2:
                return "blue";
            case 3:
                return "yellow";
            case 4:
                return "green";
            default:
                return "black";
        }
    }

    return (
        <Box
            marginLeft={"auto"}
            marginRight={"auto"}
            marginTop={"1em"}
            marginBottom={"1em"}
            paddingLeft={{base: "1em", md:"3em"}}
            paddingRight={{base: "1em", md:"3em"}}
            paddingTop={"1em"}
            paddingBottom={"1em"}>
            <VStack gap={8}>
                <VStack gap={5}>
                    <Box bg={"rgba(255, 255, 255, 0.7)"} padding={2} borderRadius={"full"}>
                        <Image boxSize={"160px"} src={"./static/logo-cdl.png"}/>
                    </Box>
                    <Box bg={"rgba(255, 255, 255, 0.7)"} paddingTop={3} paddingBottom={3} paddingLeft={5}
                         borderRadius={"xl"}
                         paddingRight={5}>
                        <Heading textAlign={"center"} fontSize={{base: "2em", md: "4em"}}>7º Torneio de Pesca Esportiva
                            - Sorteio</Heading>
                    </Box>
                </VStack>

                {
                    etapa !== 0 &&
                    <>
                        <Button css={css({"@media print": {display: "none"}})} size={"lg"}
                                onClick={handleVoltar}>Voltar</Button>
                    </>
                }

                {
                    etapa === 0 &&
                    <>
                        <Flex flexFlow={{base: "column", md: "row"}} gap={{base: "5", md: "10"}}
                              justifyContent={"center"}>
                            <Card bg={"rgba(255, 255, 255, 0.7)"} cursor={"pointer"} minW={{md: "350px"}}
                                  onClick={() => setEtapa(1)}>
                                <CardBody>
                                    <VStack>
                                        <SunnyIcon width={{base:"3em", md:"5em"}} height={{base:"3em", md:"5em"}} />
                                        <Text fontSize={{base: "2em", md: "3em"}} fontWeight={"medium"}>Etapa
                                            Diurna</Text>
                                    </VStack>
                                </CardBody>
                            </Card>
                            <Card bg={"rgba(255, 255, 255, 0.7)"} cursor={"pointer"} minW={{md: "350px"}}
                                  onClick={() => setEtapa(2)}>
                                <CardBody>
                                    <VStack>
                                        <DarkModeIcon width={{base:"3em", md:"5em"}} height={{base:"3em", md:"5em"}}/>
                                        <Text fontSize={{base: "2em", md: "3em"}} fontWeight={"medium"}>Etapa
                                            Noturna</Text>
                                    </VStack>
                                </CardBody>
                            </Card>
                        </Flex>
                    </>
                }
                {
                    etapa === 1 &&
                    <>
                        {
                            mapaAlocacaoDiurna.size === 0 &&
                            <Card bg={"rgba(255, 255, 255, 0.8)"} css={css({"@media print": {display: "none"}})} onClick={handleClick} cursor={"pointer"}>
                                <CardBody _hover={{bg:"rgba(6,73,248,0.6)"}}>
                                    <Flex flexFlow={"column"} alignItems={"center"}>
                                        <TrophyIcon width={{base:"3em", md:"5em"}} height={{base:"3em", md:"5em"}} />
                                        <Text fontSize={"2em"} fontWeight={"medium"}>Sortear</Text>
                                    </Flex>
                                </CardBody>
                            </Card>
                        }
                        <Flex css={css({
                            "@media print": {gap: 0}
                        })} flexFlow={"row"} flexWrap={"wrap"} gap={"6"} justifyContent={"center"}>
                            {
                                [...mapaAlocacaoDiurna.entries()].map(([key, value]) =>
                                    <Card css={css({
                                        "@media print": {
                                            minW: "0px",
                                            minH: "0px", ...(key % 4 === 0) ? {pageBreakAfter: "always"} : {pageBreakAfter: "auto"}
                                        }
                                    })} minW={"260px"} minH={"280px"} bg={"rgba(255, 255, 255, 0.8)"}>
                                        <CardBody display={"flex"} flexFlow={"column"} justifyContent={"center"}>
                                            <VStack alignContent={"baseline"}>
                                                <Heading css={css({"@media print": {fontSize: "6em"}})}
                                                         fontSize={{base:"8em", md:"10em"}} textAlign={"center"}>{key}</Heading>
                                                <OrderedList>
                                                    {
                                                        value.map((item) => (
                                                            <ListItem css={css({
                                                                "@media print": {marginBottom: 0}
                                                            })} marginBottom={"2"} fontSize={"xl"}
                                                                      fontWeight={"medium"}><Badge fontSize={"xl"}
                                                                                                   colorScheme={getCorSetor(item.setor)}> Setor {item.setor} -
                                                                Raia {item.raia.toString().padStart(2, "0")}</Badge></ListItem>
                                                        ))
                                                    }
                                                </OrderedList>
                                            </VStack>
                                        </CardBody>
                                    </Card>
                                )
                            }
                        </Flex>
                    </>
                }
                {
                    etapa === 2 && mapaAlocacaoNoturna.size === 0 &&
                    <>
                        {
                            <>
                                <Card bg={"rgba(255, 255, 255, 0.8)"} cursor={"pointer"} onClick={() => {
                                    if (selectedCards.size === 10) {
                                        const duplasSelecionadas = Array.from(selectedCards);
                                        const sorteio = new Sorteio(duplasSelecionadas, 2);
                                        setMapaAlocacaoNoturna(sorteio.getMapaSorteado());
                                    } else {
                                        toast({
                                            title: 'Duplas não selecionadas.',
                                            description: 'Por favor, informe as 10 duplas da etapa noturna.',
                                            status: 'error',
                                            duration: 3000,
                                            isClosable: false
                                        })
                                    }
                                }}>
                                    <CardBody display={"flex"} flexFlow={"column"}
                                              justifyContent={"center"}>
                                        <VStack alignContent={"baseline"}>
                                            <Text fontWeight={"medium"} fontSize={"2em"}>Duplas selecionadas</Text>
                                            <Heading fontSize={"3em"}
                                                     textAlign={"center"}>{totalSelected}/10</Heading>
                                            {
                                                totalSelected === 10 &&
                                                <Badge fontSize={"2em"}
                                                       colorScheme={"green"}>Sortear</Badge>
                                            }

                                        </VStack>
                                    </CardBody>
                                </Card>
                                <Flex flexFlow={"row"} flexWrap={"wrap"} gap={"6"} justifyContent={"center"}>
                                    {
                                        [...Array(20)].map((x, y) => (
                                            <PairCard selectEnabled={(selectedCards.size < 10)} pairNumber={(y + 1).toString()} onSelected={() => {
                                                let r = selectedCards.delete((y + 1));
                                                if ((!r) && selectedCards.size < 10) {
                                                    selectedCards.add(y + 1);
                                                } else if (selectedCards.size === 10) {
                                                    toast({
                                                        title: 'Limite de duplas selecionadas atingido',
                                                        description: 'Somente 10 duplas podem ser selecionadas para e etapa noturna.',
                                                        status: 'error',
                                                        duration: 3000,
                                                        isClosable: false
                                                    });
                                                }
                                                setTotalSelected(selectedCards.size);
                                            }}/>
                                        ))
                                    }
                                </Flex>
                            </>
                        }
                    </>
                }
                {
                    etapa === 2 && mapaAlocacaoNoturna.size > 0 &&
                    <>
                        {
                            <>
                                <Flex css={css({"@media print": {gap: 0}})} flexFlow={"row"} flexWrap={"wrap"}
                                      gap={"6"}
                                      justifyContent={"center"}>
                                    {
                                        [...mapaAlocacaoNoturna.entries()].map(([key, value]) =>
                                            <Card css={css({
                                                "@media print": {
                                                    minW: "0px",
                                                    minH: "0px", ...(key % 4 === 0) ? {pageBreakAfter: "always"} : {pageBreakAfter: "auto"}
                                                }
                                            })} minW={"260px"} minH={"280px"} bg={"rgba(255, 255, 255, 0.8)"}>
                                                <CardBody display={"flex"} flexFlow={"column"}
                                                          justifyContent={"center"}>
                                                    <VStack alignContent={"baseline"}>
                                                        <Heading css={css({"@media print": {fontSize: "6em"}})}
                                                                 fontSize={"10em"}
                                                                 textAlign={"center"}>{key}</Heading>
                                                        <OrderedList>
                                                            {
                                                                value.map((item) => (
                                                                    <ListItem css={css({
                                                                        "@media print": {marginBottom: 0}
                                                                    })} marginBottom={"2"} fontSize={"xl"}
                                                                              fontWeight={"medium"}><Badge
                                                                        fontSize={"xl"}
                                                                        colorScheme={getCorSetor(item.setor)}> Setor {item.setor} -
                                                                        Raia {item.raia.toString().padStart(2, "0")}</Badge></ListItem>
                                                                ))
                                                            }
                                                        </OrderedList>
                                                    </VStack>
                                                </CardBody>
                                            </Card>
                                        )
                                    }
                                </Flex>
                            </>
                        }
                    </>
                }
            </VStack>
        </Box>
    );
}

export default App;
