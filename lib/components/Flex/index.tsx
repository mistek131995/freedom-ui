import {Orientation} from "../../types/Orientation.ts";
import React, {RefObject, forwardRef} from "react";
import {JustifyContent} from "../../types/JustifyContent.ts";
import {AlignmentItems} from "../../types/AlignmentItems.ts";

interface IFlex{
    ref?: RefObject<HTMLDivElement>
    orientation?: Orientation,
    justifyContent?: JustifyContent,
    alignItems?: AlignmentItems,
    noWrap?: boolean,
}

type FlexProps = React.HTMLAttributes<HTMLDivElement> & IFlex

// Используем forwardRef для передачи ref
export const Flex = forwardRef<HTMLDivElement, FlexProps>(({
                                                               orientation = Orientation.horizontal,
                                                               justifyContent = JustifyContent.start,
                                                               alignItems = AlignmentItems.stretch,
                                                               noWrap = false,
                                                               className,
                                                               children,
                                                               ...props
                                                           }, ref) => {
    const unionClassName = [
        "flex",
        noWrap ? "no-wrap" : "",
        orientation,
        justifyContent,
        alignItems,
        className
    ].filter(x => x).join(" ");

    return <div ref={ref} className={unionClassName} {...props}>
        {children}
    </div>;
});