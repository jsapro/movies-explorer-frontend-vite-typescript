interface AuthInputProps {
    inputDescription: string,
    name: string,
    minLength?: number,
    maxLength?: number,
    type: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    inputError: string,
    value: string,
    title?: string,
    emailRegex?: string,
}

export type {AuthInputProps}