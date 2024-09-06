import {FlexOrientation} from "./FlexOrientation.ts";
import React, {FC} from "react";

interface IFlex{
    orientation?: FlexOrientation
}

type FlexProps = React.HTMLAttributes<HTMLDivElement> & IFlex

export const Flex : FC<FlexProps> = ({orientation, className, children, ...props}) => {
    const unionClassName = ["flex", orientation || FlexOrientation.horizontal, className].filter(x => x).join(" ")

    return <div className={unionClassName} {...props}>
        {children}
    </div>
}