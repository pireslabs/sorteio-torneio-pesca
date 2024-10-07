import React from 'react';
import './App.css';
import {Box, Center, VStack} from "@chakra-ui/react";

function App() {
    return (
        <Center>
            <VStack width={'90%'} marginTop={'2rem'} backgroundColor={'rgba(255, 255, 255, 0.4)'} padding={'2rem'} rounded={'md'}>
                <Box>
                    Sorteio - Torneio de Pesca
                </Box>
            </VStack>
        </Center>
    );
}

export default App;
