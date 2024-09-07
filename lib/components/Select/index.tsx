import {Option} from "./Option.ts";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import {SelectLabel} from "./SelectLabel.tsx";

export interface ISelect {
    placeholder?: string,
    options: Option[]
}

export const Select : FC<ISelect> = (props) => {
    const [isOptionsVisible, setVisible] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setVisible(false)
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return <div className={styles.select} ref={ref}>
        <SelectLabel onClick={() => setVisible(!isOptionsVisible)}>
            {props.placeholder}
        </SelectLabel>
        <div className={styles.selectListOptions}
             style={{display: isOptionsVisible ? "block" : "none", width: ref.current!.offsetWidth}}>
            {
                props.options.map(x => <div className={styles.selectOption} key={x.value}>
                    {x.label}
                </div>)
            }
        </div>
    </div>
}