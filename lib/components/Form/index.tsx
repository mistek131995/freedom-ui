import React, {FC, HTMLAttributes} from "react";

interface IForm{
    handleSubmit: (form: Record<string, FormDataEntryValue>) => void
}

type PropsForm = HTMLAttributes<HTMLFormElement> & IForm

export const Form : FC<PropsForm> = ({onSubmit, handleSubmit, ...props}) => {

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (onSubmit) {
            onSubmit(event)
        }

        if (event.currentTarget) {
            const formData = new FormData(event.currentTarget);

            handleSubmit(Object.fromEntries(formData.entries()));
        }
    }

    return <form onSubmit={submit} {...props}/>
}