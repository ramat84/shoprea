import { useContext } from 'react'
import ReactModal from 'react-modal'
import { ModalContext } from '../contexts/ModalContext';
import '../css/modal.css'

ReactModal.setAppElement('#root')

export const ModalComponent = () => {
    const [modalContent, setModalContent] = useContext(ModalContext)

    return (
        <ReactModal className="modal-small" isOpen={modalContent !== false}>
            <button className="modal-close" onClick={() => setModalContent(false)}>x</button>
            {modalContent}
        </ReactModal>
    )
}
