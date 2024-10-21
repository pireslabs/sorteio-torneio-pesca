import {Card, CardBody, Heading, VStack} from "@chakra-ui/react";
import React from "react";

interface CardPairProps {
    pairNumber: string;
    onSelected: any;
}

function PairCard({onSelected, pairNumber}: CardPairProps) {

    const [backgroundColor, setBackgroundColor] = React.useState<string>("rgba(255, 255, 255, 0.8)");

    function handleOnClick() {
        onSelected();
        if (backgroundColor === "rgba(255, 255, 255, 0.8)") {
            setBackgroundColor("rgba(32,178,170, 0.8)");
        } else {
            setBackgroundColor("rgba(255, 255, 255, 0.8)");
        }
    }

    return (
        <>
            <Card minW={"260px"} minH={"280px"} bg={backgroundColor} onClick={handleOnClick}>
                <CardBody display={"flex"} flexFlow={"column"}
                          justifyContent={"center"}>
                    <VStack alignContent={"baseline"}>
                        <Heading fontSize={"10em"} textAlign={"center"}>{pairNumber}</Heading>
                    </VStack>
                </CardBody>
            </Card>
        </>
    );
}

export default PairCard;