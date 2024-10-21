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
            paddingLeft={"3em"}
            paddingRight={"3em"}
            paddingTop={"2em"}
            paddingBottom={"2em"}>
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
                        <Button css={css({"@media print": {display: "none"}})} colorScheme={"blackAlpha"}
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
                                        <svg xmlns="http://www.w3.org/2000/svg" height="72px" viewBox="0 -960 960 960"
                                             width="72px">
                                            <path
                                                d="M450-770v-150h60v150h-60Zm256 106-42-42 106-107 42 43-106 106Zm64 214v-60h150v60H770ZM450-40v-150h60v150h-60ZM253-665 148-770l42-42 106 106-43 41Zm518 517L664-254l41-41 108 104-42 43ZM40-450v-60h150v60H40Zm151 302-43-42 105-105 22 20 22 21-106 106Zm289-92q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-60q75 0 127.5-52.5T660-480q0-75-52.5-127.5T480-660q-75 0-127.5 52.5T300-480q0 75 52.5 127.5T480-300Zm0-180Z"/>
                                        </svg>
                                        <Text fontSize={{base: "2em", md: "3em"}} fontWeight={"medium"}>Etapa
                                            Diurna</Text>
                                    </VStack>
                                </CardBody>
                            </Card>
                            <Card bg={"rgba(255, 255, 255, 0.7)"} cursor={"pointer"} minW={{md: "350px"}}
                                  onClick={() => setEtapa(2)}>
                                <CardBody>
                                    <VStack>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="72px" viewBox="0 -960 960 960"
                                             width="72px">
                                            <path
                                                d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480-120Zm0-60q109 0 190-67.5T771-406q-25 11-53.67 16.5Q688.67-384 660-384q-114.69 0-195.34-80.66Q384-545.31 384-660q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180-480q0 125 87.5 212.5T480-180Zm-4-297Z"/>
                                        </svg>
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
                        <Button css={css({"@media print": {display: "none"}})} colorScheme={"blackAlpha"}
                                onClick={handleClick}>Sortear</Button>
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
                                                         fontSize={"10em"} textAlign={"center"}>{key}</Heading>
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
                                            <Text fontSize={"2em"}>Duplas selecionadas</Text>
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
                                            <PairCard pairNumber={(y + 1).toString()} onSelected={() => {
                                                let r = selectedCards.delete((y + 1));
                                                if (!r) {
                                                    selectedCards.add(y + 1);
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
