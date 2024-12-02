import React from "react";
import {Icon, IconProps} from "@chakra-ui/react";

function DarkModeIcon({viewBox = '0 -960 960 960', width = '32px', height = '32px', ...props}: IconProps) {
    return (
        <>
            <Icon viewBox={viewBox} width={width} height={height} {...props}>
                <path
                    d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480-120Zm0-60q109 0 190-67.5T771-406q-25 11-53.67 16.5Q688.67-384 660-384q-114.69 0-195.34-80.66Q384-545.31 384-660q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180-480q0 125 87.5 212.5T480-180Zm-4-297Z"/>
            </Icon>
        </>
    );
}

export default DarkModeIcon;