/* 
button
*/
import "./index.css";
import PropTypes from "prop-types";

export const Button = ({ id, label, className, recoverKey }) => {

  const clickHandler= () => {
    recoverKey(label);
  }

  return (
    <button type="button" id={id} className={className} onClick={clickHandler}>
      {label}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  func: PropTypes.func
};
