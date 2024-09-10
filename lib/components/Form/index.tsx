import React, {FC, HTMLAttributes} from "react";

type FormValue = {
    name: string,
    value: string,
}

interface IForm{
    handleSubmit: (form: FormValue[]) => void
}

type PropsForm = HTMLAttributes<HTMLFormElement> & IForm

export const Form : FC<PropsForm> = ({onSubmit, ...props}) => {

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (onSubmit) {
            onSubmit(event)
        }

        if (event.currentTarget) {
            const formData = new FormData(event.currentTarget);
            console.log(Object.fromEntries(formData.entries()));
        }
    }

    return <form onSubmit={submit} {...props}/>
}