import {Card, CardBody, Heading, VStack} from "@chakra-ui/react";
import React from "react";

interface CardPairProps {
    pairNumber: string;
    onSelected: any;
    selectEnabled: boolean;
}

function PairCard({onSelected, pairNumber, selectEnabled}: CardPairProps) {

    const [backgroundColor, setBackgroundColor] = React.useState<string>("rgba(255, 255, 255, 0.8)");

    function handleOnClick() {
        onSelected();
        if ((backgroundColor === "rgba(255, 255, 255, 0.8)") && (selectEnabled)) {
            setBackgroundColor("rgba(32,178,170, 0.8)");
        } else {
            setBackgroundColor("rgba(255, 255, 255, 0.8)");
        }
    }

    return (
        <>
            <Card minW={"260px"} minH={"280px"} bg={backgroundColor} onClick={handleOnClick} cursor={"pointer"}>
                <CardBody display={"flex"} flexFlow={"column"}
                          justifyContent={"center"}>
                    <VStack alignContent={"baseline"}>
                        <Heading fontSize={{base:"8em", md:"10em"}} textAlign={"center"}>{pairNumber}</Heading>
                    </VStack>
                </CardBody>
            </Card>
        </>
    );
}

export default PairCard;