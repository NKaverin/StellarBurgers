import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ( {closeHandler} ) => {
    return (
        <div className={styles.modalOverlay} onClick ={() => closeHandler()}></div>
    )
}

ModalOverlay.propTypes = {  
    closeHandler: PropTypes.func.isRequired
}

export default ModalOverlay;