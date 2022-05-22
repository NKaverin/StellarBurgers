import styles from './ModalOverlay.module.css';

const ModalOverlay = ( {closeHandler} : { closeHandler: (() => void)}) => {
    return (
        <div className={styles.modalOverlay} onClick ={() => closeHandler()}></div>
    )
}

export default ModalOverlay;