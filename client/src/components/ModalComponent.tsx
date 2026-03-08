import { useContext } from 'react'
import ReactModal from 'react-modal'
import { ModalContext } from '../contexts/ModalContext';

export const ModalComponent = (children) => {
    const [modalIsOpen, setModalIsOpen] = useContext(ModalContext)

    return (
        <ReactModal isOpen={modalIsOpen} >
            {children}
        </ReactModal>
    )
}
