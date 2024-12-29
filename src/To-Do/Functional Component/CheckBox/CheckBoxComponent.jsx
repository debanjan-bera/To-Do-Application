import PropTypes from "prop-types";
import './checkBox.css'
export const CheckBoxUiComponent = ({onChecked}) => {

  return (
<div className="checkbox-wrapper-12">
          <div className="cbx">
            <input  type="checkbox" id="cbx-12" onChange={onChecked}/>

            <label htmlFor="cbx-12"></label>
            <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
              <path d="M2 8.36364L6.23077 12L13 2"></path>
            </svg>
          </div>

          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo-12">
                <feGaussianBlur result="blur" stdDeviation="4" in="SourceGraphic"
                ></feGaussianBlur>
                <feColorMatrix result="goo-12" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" mode="matrix" in="blur"
                ></feColorMatrix>
                <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
              </filter>
            </defs>
          </svg>
        </div>

  );
};

CheckBoxUiComponent.propTypes ={
    onChecked: PropTypes.func.isRequired,
}