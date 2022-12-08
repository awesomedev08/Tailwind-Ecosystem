import React, { useRef } from 'react'
import { ChevronDoubleLeftIcon, ExclamationIcon, ClockIcon, ExclamationCircleIcon } from '@heroicons/react/outline'
import Text from '../Typography'
import ToolTipHover from '../ToolTipHover'
import './sideBar.css'

export interface SideBarProps {
    sideBarList?: Array<{ title: string; active: boolean; to: () => void; icon?: JSX.Element; disabled?: boolean }>
    sideBarName: string
    sideBarSubTitle?: string | React.ReactElement
    defaultExpand?: boolean
    dangerZone?: { show: boolean; text: string; active: boolean; callBack?: () => void }
    disabledOptionsTag?: string
    top?: number
    left?: number
}

const SideBar = ({ sideBarList, sideBarName, sideBarSubTitle, defaultExpand, disabledOptionsTag, top, left, ...props }: SideBarProps) => {
    const sidebarRef: React.MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null)
    const [expand, setExpand] = React.useState(false)
    const [timer, setTimer] = React.useState(false)
    const [isOptionClicked, setIsOptionClicked] = React.useState(false)

    const activeStyle = React.useCallback((activeLink: boolean) => {
        return {
            width: '6px',
            minWidth: '6px',
            height: '64px',
            backgroundColor: `${activeLink ? '#1d4ed8' : 'transparent'}`,
            borderRadius: '0px 8px 8px 0px'
        }
    }, [])

    const shotTimer = () => {
        setTimeout(() => {
            setTimer(!expand)
        }, 300)
    }

    React.useEffect(() => {
        if (defaultExpand) {
            setExpand(true)
            shotTimer()
        }
        return () => {
            setExpand(false)
            shotTimer()
            defaultExpand = false
        }
    }, [defaultExpand])

    return (
        <>
            <div
                className={`${timer ? 'fixed' : 'hidden'} ${expand ? 'fade-in' : 'fade-out'} lg:hidden w-full h-screen z-40`}
                style={{ backgroundColor: 'rgba(17, 24, 39, 0.75)', top: top ?? 0, left: left ?? 0 }}
            />
            <div
                ref={sidebarRef}
                role="container-sidebar"
                className={`shadow-lg border-t-0 box-border ${
                    expand ? 'w-72' : 'w-0 lg:w-16'
                } overflow-hidden h-full bg-white fixed transition-all delay-75 duration-200 ease-in z-40`}
                style={{ maxHeight: `calc(100vh - ${sidebarRef.current?.offsetTop}px)`, top: top ?? 0, left: left ?? 0 }}
            >
                <div className="h-full flex flex-col transition-all delay-300 ease-out">
                    <div className="flex justify-between border-b items-center w-full h-16 lg:h-20">
                        <div
                            role="active-sidebar"
                            className="fixed ml-6 lg:ml-3.5 border rounded-full hover:bg-blue-50 focus:bg-blue-700 focus:text-white text-blue-700 cursor-pointer transition-all duration-300 ease-in-out"
                            onClick={() => {
                                setExpand(!expand)
                                shotTimer()
                            }}
                        >
                            <div
                                className={`${
                                    expand ? 'rotate-0' : 'rotate-180'
                                } w-9 h-9 flex justify-center items-center transform transition-all duration-200 ease-in-out`}
                            >
                                <ChevronDoubleLeftIcon className="transition-all duration-200 ease-in-out" width={25} />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center gap-1 col-span-2 p-3 ml-16 w-full h-24">
                            <Text variant="span" size="base" bold className="block w-52 letter-spacing-negative capitalize">
                                {sideBarName}
                            </Text>
                            {sideBarSubTitle && (
                                <Text variant="small" fontBold="medium" className="text-gray-400 whitespace-nowrap">
                                    {sideBarSubTitle}
                                </Text>
                            )}
                        </div>
                    </div>
                    <div className={`${!expand ? 'hide-scroll' : ''} overflow-y-auto overflow-x-hidden flex-grow`}>
                        {sideBarList?.map(({ title, active, to, icon, disabled }, index: number) => (
                            <div
                                key={index.toString()}
                                className={`w-72 h-16 hover:text-red-500 transition-all duration-300 ease-out letter-spacing-negative flex items-center justify-start gap-1  ${
                                    active ? 'bg-blue-50' : ''
                                } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
                                onClick={() => {
                                    if (disabled || active) return
                                    setIsOptionClicked(true)
                                    to()
                                }}
                            >
                                <ToolTipHover
                                    element={
                                        <div role={`option-icon-${index}`} className="w-16 flex items-center">
                                            <div style={activeStyle(active)}></div>
                                            <div
                                                className={`w-6 h-6 ml-3.5 flex items-center ${disabled ? 'text-gray-300' : 'text-gray-400'} ${
                                                    active ? 'text-blue-700' : ''
                                                }`}
                                            >
                                                {icon ? icon : <ExclamationCircleIcon />}
                                            </div>
                                        </div>
                                    }
                                    variantPopup="dark"
                                    disabled={expand || isOptionClicked}
                                    complementPosition={{ top: 55, left: 85 }}
                                >
                                    {!disabled ? (
                                        title
                                    ) : (
                                        <span className="flex items-center gap-1">
                                            <ClockIcon width={15} />
                                            {disabledOptionsTag}
                                        </span>
                                    )}
                                </ToolTipHover>
                                <Text
                                    role={`option-${index}`}
                                    variant="span"
                                    className={`${disabled ? 'text-gray-300' : 'text-gray-500'} w-56 whitespace-nowrap font-semibold`}
                                >
                                    {disabled && (
                                        <span className="mr-10 flex items-center gap-1 italic" style={{ fontSize: '10px' }}>
                                            <ClockIcon width={15} />
                                            {disabledOptionsTag}
                                        </span>
                                    )}
                                    {title}
                                </Text>
                            </div>
                        ))}
                    </div>
                    {props.dangerZone?.show && (
                        <div
                            role="danger-zone"
                            className={`w-72 border-t ${
                                props.dangerZone?.active ? 'bg-red-600' : 'bg-gray-50'
                            } border-gray-300 hover:bg-red-200 transition ease-in duration-300`}
                        >
                            <div
                                className="w-full h-20 lg:h-32 flex items-center cursor-pointer group"
                                onClick={() => {
                                    if (props.dangerZone?.callBack) {
                                        setIsOptionClicked(true)
                                        props.dangerZone?.callBack()
                                    }
                                }}
                            >
                                <ToolTipHover
                                    variantPopup="dark"
                                    disabled={expand || isOptionClicked}
                                    complementPosition={{ top: 55, left: 85 }}
                                    element={
                                        <div className="h-20 w-16 flex items-center">
                                            <ExclamationIcon width={25} className={`${props.dangerZone?.active ? 'text-white' : 'text-red-600'} ml-5`} />
                                        </div>
                                    }
                                >
                                    {props?.dangerZone?.text}
                                </ToolTipHover>
                                <Text className={`${props.dangerZone?.active ? 'text-white' : 'text-gray-500'} font-semibold`}>{props?.dangerZone?.text}</Text>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SideBar
