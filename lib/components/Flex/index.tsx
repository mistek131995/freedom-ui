import {FlexOrientation} from "./FlexOrientation.ts";
import React, {FC} from "react";
import {FlexJustifyContent} from "./FlexJustifyContent.ts";
import {FlexAlignmentItems} from "./FlexAlignmentItems.ts";

interface IFlex{
    orientation?: FlexOrientation,
    justifyContent?: FlexJustifyContent,
    alignItems?: FlexAlignmentItems
}

type FlexProps = React.HTMLAttributes<HTMLDivElement> & IFlex

export const Flex : FC<FlexProps> = ({orientation, justifyContent, alignItems, className, children, ...props}) => {
    const unionClassName = [
        "flex",
        orientation || FlexOrientation.horizontal,
        justifyContent || FlexJustifyContent.start,
        alignItems || FlexAlignmentItems.stretch,
        className
    ].filter(x => x).join(" ")

    return <div className={unionClassName} {...props}>
        {children}
    </div>
}