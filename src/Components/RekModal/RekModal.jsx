import { useEffect, useState } from 'react';
import modal from '../../assets/images/modal.jpeg';
import modal2 from '../../assets/images/modal-2.jpeg';
import modal3 from '../../assets/images/modal-3.jpeg';
import modal4 from '../../assets/images/modal-4.jpeg';

const images = [modal, modal2, modal3, modal4];

export default function RekModal() {
    const [showModal, setShowModal] = useState(false);
    const [randomImage, setRandomImage] = useState(null);
    const [canClose, setCanClose] = useState(false);
    const [countdown, setCountdown] = useState(5);


    useEffect(() => {
        let modalTimer;
        if (!showModal) {
            modalTimer = setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * images.length);
                setRandomImage(images[randomIndex]);
                setShowModal(true);
                setCanClose(false);
                setCountdown(5);

                const closeTimer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(closeTimer);
                            setCanClose(true);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }, 60000);
        }

        return () => clearTimeout(modalTimer);
    }, [showModal]);


    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : 'auto';
        return () => (document.body.style.overflow = 'auto');
    }, [showModal]);

    const handleFakeError = () => {
        alert('Что-то пошло не так...');
    };

    if (!showModal) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.closeWrapper}>
                    {canClose ? (
                        <button onClick={() => setShowModal(false)} style={styles.closeBtn}>×</button>
                    ) : (
                        <div style={styles.timer}>{countdown}</div>
                    )}
                </div>
                {randomImage && (
                    <img src={randomImage} alt="Реклама" style={styles.image} />
                )}
                <button style={styles.actionBtn} onClick={handleFakeError}>
                    Подробнее
                </button>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    modal: {
        position: 'relative',
        background: '#fff',
        borderRadius: '10px',
        overflow: 'hidden',
        maxWidth: '600px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
    },
    closeWrapper: {
        position: 'absolute',
        top: '10px',
        right: '15px',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    closeBtn: {
        fontSize: '24px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        lineHeight: '1',
    },
    timer: {
        fontSize: '18px',
        color: '#666',
    },
    image: {
        width: '100%',
        height: '80vh',
        objectFit: 'cover',
        display: 'block',
    },
    actionBtn: {
        backgroundColor: '#e63946',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        margin: '15px 0',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};
