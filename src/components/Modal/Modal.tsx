import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { useEffect } from 'react';

const Modal = ({children, closeHandler, title}) => {
    
    {/* при открытии добавляем листенер на Esc */}
    useEffect(() => {
        const closeModal = (event) => {
            if(event.key === 'Escape'){
                closeHandler();
            }
        }
        window.addEventListener('keydown', closeModal);
        return () => {
            window.removeEventListener('keydown', closeModal);
        }
    },[])

    const container = document.getElementById('modal-root');
    if (!container) {
        return null;
    }

    return ReactDOM.createPortal(    
        (<div className={styles.modal}>
        <ModalOverlay />
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

Modal.propTypes = {  
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
    closeHandler: PropTypes.func
}

export default Modal;