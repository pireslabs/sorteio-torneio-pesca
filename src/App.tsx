import React from 'react';
import './App.css';
import {Box, Heading} from "@chakra-ui/react";

function App() {
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
            <Heading size={"lg"} textAlign={"center"}>Torneio de Pesca - A Casa do Lago</Heading>
        </Box>
    );
}

export default App;
