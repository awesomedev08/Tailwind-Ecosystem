import React from 'react'
import { Spinner } from '../Spinners'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?:
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'outline'
        | 'link'
        | 'ghost'
        | 'cancel'
        | 'success'
        | 'outlineWhite'
        | 'outlineBlue'
        | 'disabled'
        | 'danger'
        | 'outlineWhiteRed'

    size?: 'small' | 'medium' | 'large'
    padding?: number
    disabled?: boolean
    isLoading?: boolean
    className?: string
    paddingX?: number
    paddingY?: number
    fontWeight?: 'normal' | 'bold' | 'medium' | 'light' | 'semibold'
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    role?: string
    loadingComponent?: React.ReactElement
}

const Button = React.memo(
    ({
        variant = 'primary',
        size = 'medium',
        onClick,
        children,
        isLoading,
        className = '',
        padding,
        paddingX,
        paddingY,
        loadingComponent,
        ...props
    }: IButtonProps) => {
        const buttonsVariants: { [key: string]: string } = {
            primary: 'bg-blue-700 hover:bg-blue-800 text-white disabled:bg-gray-300',
            secondary: 'bg-transparent border border-black hover:bg-white disabled:opacity-20',
            cancel: 'bg-white text-black hover:text-white hover:bg-red-500 disabled:opacity-75',
            error: 'text-white bg-red-500 hover:bg-red-600 disabled:opacity-75',
            outlineBlue: 'bg-transparent border border-blue-700 text-blue-700',
            success: 'bg-green-500 hover:bg-green-600 text-white',
            outlineWhite: 'bg-transparent border border-white text-white hover:bg-gray-50 hover:text-black',
            danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300',
            outlineWhiteRed: 'bg-white border border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
        }

        const sizeVariants: { [key: string]: string } = {
            large: 'rounded-lg w-auto'
        }

        const buttonPadding = React.useCallback(() => {
            if (paddingX && paddingY) {
                return `px-${paddingX} py-${paddingY}`
            }

            if (paddingX) {
                return `px-${paddingX}`
            }

            if (paddingY) {
                return `py-${paddingY}`
            }

            if (padding) {
                return `p-${padding}`
            }

            return 'p-2'
        }, [padding, paddingX, paddingY])

        return (
            <button
                className={`rounded-md ${buttonPadding()} font-bold transition duration-500 ease-out hover:ease-in ${
                    isLoading || props.disabled ? 'cursor-not-allowed' : ''
                } ${buttonsVariants[variant]} ${sizeVariants[size]} ${className}`}
                onClick={(e) => {
                    if (!props.disabled && onClick !== undefined && !isLoading) {
                        onClick(e)
                    }
                }}
                {...props}
            >
                {isLoading ? (
                    <div className="flex items-center gap-2 justify-center">
                        {loadingComponent ?? <Spinner color="#FFF" width="2rem" height="2rem" border={5} />}
                    </div>
                ) : (
                    children
                )}
            </button>
        )
    }
)

export default Button
