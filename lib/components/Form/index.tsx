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
            const data : Record<string, FormDataEntryValue> = Object.fromEntries(formData.entries());

            Array.from(event.currentTarget.elements).map(x => {
                const input = x as HTMLInputElement;

                if(input.type == "checkbox"){
                    data[input.name] = `${input.checked}`
                }

                if(input.type == "radio" && input.checked){
                    data[input.name] = `${input.value}`
                }
            })

            handleSubmit(data);
        }
    }

    return <form onSubmit={submit} {...props}/>
}