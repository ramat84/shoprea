import { useContext, Children } from 'react'
import ReactModal from 'react-modal'
import { ModalContext } from '../contexts/ModalContext';

export const ModalComponent = () => {
    const [modalContent, setModalContent] = useContext(ModalContext)

    return (
        <ReactModal isOpen={modalContent !== false}>
            <button className="modal-close" onClick={() => setModalContent(false)}>x</button>
            {modalContent}
        </ReactModal>
    )
}
