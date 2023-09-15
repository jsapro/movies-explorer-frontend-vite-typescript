interface AuthInputProps {
    inputDescription: string,
    name: string,
    minLength: number,
    maxLength: number,
    type: string,
    handleChange: () => void,
    inputError: string,
    value: string,
    title: string,
    emailRegex: string,
}

export type {AuthInputProps}