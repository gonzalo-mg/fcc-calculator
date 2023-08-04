/* 
button
*/
import "./index.css";
import PropTypes from "prop-types";

export const Button = ({id, label, className}) => {
  
  return (
    <button type="button" id={id} className={className}>{label}</button>
  );
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
