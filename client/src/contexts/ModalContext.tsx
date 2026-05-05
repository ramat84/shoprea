import { createContext } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";
import ReactModal from "react-modal";

const mountTo = document.getElementById('modal-container')

export const ModalContext = createContext<any>(false)

export const useModal = () => {
    ReactModal.setAppElement('#root')

    const ModalPortal = ({ children, isOpen, setIsOpen }: { children: ReactNode, isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
        if (!mountTo || !isOpen) return;

        const CloseModal = () => { setIsOpen(false) }

        return createPortal(
            <ReactModal isOpen={isOpen}>
                <button className="modal-close" onClick={CloseModal}>x</button>
                {children}
            </ReactModal>,
            mountTo
        )
    }

    return { ModalPortal }
}
