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

export const Flex : FC<FlexProps> = ({
                                         orientation = Orientation.horizontal,
                                         justifyContent = JustifyContent.start,
                                         alignItems = AlignmentItems.stretch,
                                         className,
                                         children,
                                         ...props}) => {
    const unionClassName = [
        "flex",
        orientation,
        justifyContent,
        alignItems,
        className
    ].filter(x => x).join(" ")

    return <div className={unionClassName} {...props}>
        {children}
    </div>
}