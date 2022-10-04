import { ExclamationCircleIcon, TagIcon, CheckCircleIcon, ExclamationIcon, ClipboardCopyIcon, HomeIcon } from '@heroicons/react/outline'
import { span } from '../../stories/Text.stories'

export interface IBadgeProps extends React.HTMLProps<HTMLDivElement> {
    text?: string
    className?: string
    variant: 'warning' | 'infoPrimary' | 'infoSecondary' | 'success' | 'primary' | 'secondary' | 'error'
    classNameIcon?: string
    icon?: string
}

const badgeVariants: { [key: string]: string } = {
    warning: 'bg-yellow-100 border border-yellow-500 text-gray-500',
    infoPrimary: 'bg-blue-50 border border-blue-300 text-gray-500',
    infoSecondary: 'bg-transparent border border-blue-300 text-gray-500',
    success: 'bg-green-50 border border-green-300 text-gray-500 font-medium',
    primary: 'bg-transparent border border-blue-700 text-blue-700',
    secondary: 'bg-transparent border border-white text-white hover:bg-gray-50 hover:text-black',
    error: 'bg-red-50 border border-red-300 text-gray-500 font-medium'
}

const iconsSwitch = (iconType: string = 'HomeIcon', classNameIcon?: string) => {
    switch (iconType) {
        case 'tag':
            return <TagIcon className={classNameIcon ?? ''} />
        case 'warning':
            return <ExclamationIcon className={classNameIcon ?? ''} />
        case 'check':
            return <CheckCircleIcon className={classNameIcon ?? ''} />
        case 'success':
            return <CheckCircleIcon className={classNameIcon ?? ''} />
        case 'exclamation':
            return <ExclamationCircleIcon className={classNameIcon ?? ''} />
        case 'clipboard-copy':
            return <ClipboardCopyIcon className={classNameIcon ?? ''} />
        case 'none':
            return <></>
        default:
            return <HomeIcon className={classNameIcon ?? ''} />
    }
}

export const Badge = ({ text, className, variant, classNameIcon, icon, ...props }: IBadgeProps) => {
    const classNameByVariant = badgeVariants[variant] || ''

    return (
        <div
            id={icon}
            role="container-badge"
            className={`${className ?? ''} ${classNameByVariant} rounded-full flex items-center gap-1 text-xs ${icon ? '' : 'justify-center'}`}
            {...props}
        >
            {iconsSwitch(icon, classNameIcon)} <small role="text-badge">{text ?? ''}</small>
        </div>
    )
}
export default Badge