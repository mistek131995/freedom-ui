import {Orientation} from "../../types/Orientation.ts";
import React, {FC, RefObject} from "react";
import {JustifyContent} from "../../types/JustifyContent.ts";
import {AlignmentItems} from "../../types/AlignmentItems.ts";

interface IFlex{
    ref?: RefObject<HTMLDivElement>
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
                                         ref,
                                         ...props}) => {
    const unionClassName = [
        "flex",
        orientation,
        justifyContent,
        alignItems,
        className
    ].filter(x => x).join(" ")

    return <div ref={ref} className={unionClassName} {...props}>
        {children}
    </div>
}