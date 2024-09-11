import {Orientation} from "../../types/Orientation.ts";
import React, {FC} from "react";
import {JustifyContent} from "../../types/JustifyContent.ts";
import {AlignmentItems} from "../../types/AlignmentItems.ts";

interface IFlex{
    orientation?: Orientation,
    justifyContent?: JustifyContent,
    alignItems?: AlignmentItems
}

type FlexProps = React.HTMLAttributes<HTMLDivElement> & IFlex

export const Flex : FC<FlexProps> = ({orientation, justifyContent, alignItems, className, children, ...props}) => {
    const unionClassName = [
        "flex",
        orientation || Orientation.horizontal,
        justifyContent || JustifyContent.start,
        alignItems || AlignmentItems.stretch,
        className
    ].filter(x => x).join(" ")

    return <div className={unionClassName} {...props}>
        {children}
    </div>
}