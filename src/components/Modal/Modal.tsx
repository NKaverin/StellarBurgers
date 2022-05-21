import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { ReactNode, SyntheticEvent, useEffect } from 'react';

const Modal = ({children, closeHandler, title} : IModal) => {
    
    {/* при открытии добавляем листенер на Esc */}
    useEffect(() => {
        const closeModal = (event : KeyboardEvent) : any => {
            if(event.key === 'Escape'){
                closeHandler();
            }
        }
        window.addEventListener('keydown', closeModal);
        return () => {
            window.removeEventListener('keydown', closeModal);
        }
    },[closeHandler])

    const container = document.getElementById('modal-root');
    if (!container) {
        return null;
    }

    return ReactDOM.createPortal(    
        (<div className={styles.modal}>
            <ModalOverlay closeHandler = {closeHandler} />
            <div className={styles.modal__container + " pl-10 pr-10" + (title === null ? " pt-10" : " pt-15")}>
                <div className={styles.modal__titleContainer}>
                    <p className="text text_type_main-large">{title}</p>
                    <button className={styles.modal__closeButton} onClick = {(() => closeHandler())}>
                        <CloseIcon type="primary" />
                    </button>
                </div>      
                {children}
            </div>
        </div>), 
        container)
}

interface IModal {  
    children: ReactNode,
    title?: string,
    closeHandler: () => void
}

export default Modal;