import { createContext, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import ReactModal from "react-modal";

const mountTo = document.getElementById('modal-container')

export const ModalContext = createContext<any>(false)

export const useModal = () => {
    const [modalContent, setModalContent] = useState<ReactNode>(false)

    const ModalPortal = ({ children, isOpen }: { children: ReactNode, isOpen: boolean }) => {
        if (!mountTo || !isOpen) return

        console.log(mountTo)

        return createPortal(
            <ReactModal isOpen={isOpen}>
                <button className="modal-close" onClick={() => setModalContent(false)}>x</button>
                {children}
            </ReactModal>
            ,
            mountTo
        )
    }

    return { ModalPortal }
}
