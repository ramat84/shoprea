import type { ReactNode, MouseEventHandler } from "react"
type type = 'action' | 'view' | 'trash'
type params = {type : type, children?: ReactNode, icon? : string, onClick: MouseEventHandler<HTMLButtonElement>}

export const Button = ({type, children, icon, onClick} : params ) => {
    return (
        <button className={'btn ' + type} onClick={onClick}>
            {icon && <i>{icon}</i>}
            {children ? children : <></>}
        </button>
    )
}
