import React from 'react';
import './App.css';
import {Box, Button, Heading, Input, VStack} from "@chakra-ui/react";
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
             paddingLeft={"3em"}
             paddingRight={"3em"}
             paddingTop={"2em"}
             paddingBottom={"2em"}>
            <VStack>
                <Heading size={"lg"} textAlign={"center"}>Torneio de Pesca - A Casa do Lago</Heading>
                <span>
                    Duplas:
                </span>
                <Input size={"md"} bg={"white"} type={"number"} placeholder={"Número de duplas."} onChange={handleChangeTotalDuplas} />
                <span>Setores:</span>
                <Input size={"md"} bg={"white"} type={"number"} placeholder={"Número de setores."} onChange={handleChangeTotalSetores} />
                <Button colorScheme={"blackAlpha"} onClick={handleClick}>Sortear</Button>
            </VStack>
        </Box>
    );
}

export default App;
