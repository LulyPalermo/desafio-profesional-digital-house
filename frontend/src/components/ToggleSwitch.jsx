import PropTypes from "prop-types";
import { useState } from "react";

export const IconToggle = ({ initialOn = false, onToggle, label }) => {
    const [isOn, setIsOn] = useState(initialOn);

    const handleClick = () => {
        const newState = !isOn;
        setIsOn(newState);
        onToggle(newState);
    };

    return (
         <div className="icon-toggle-container" onClick={handleClick}>
            <i className={`icon-toggle ${isOn ? "on" : "off"} ${isOn ? "ri-toggle-fill" : "ri-toggle-line"}`}></i>
            {label && <span className="icon-toggle-label">{label}</span>}
        </div>
    );
};

IconToggle.propTypes = {
    initialOn: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
    label: PropTypes.string,
};
