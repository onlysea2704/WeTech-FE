import Lottie from 'lottie-react';
import animation from '../../assets/sign-up.json';
import './Popup.css';

const Popup = ({ message }) => {
    return (
        <div className={`app-container blurred`}>
            <div className="animation-overlay">
                <div className="animation-popup">
                    <div className="animation-header">
                        <p>{message}</p>
                    </div>
                    <div className="animation-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 16px' }}>
                        <Lottie animationData={animation} loop={true} style={{ height: 180, width: 180 }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
