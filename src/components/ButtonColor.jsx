import PropTypes from "prop-types";

const ButtonColor = ({ color, index, active }) => {
  return (
    <div
      key={index}
      className={`size-[50px] rounded-xl border bg-[${color}] ${
        active ? "border-[3px]" : ""
      } border-[${active ? "#5a5869" : "#fff"}] 
      `}
    ></div>
  );
};

ButtonColor.propTypes = {
  color: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
};

export default ButtonColor;
