import React from 'react';
import CheckIcon from "@mui/icons-material/Check";

const ArticalDefault = () => {
  return (
    <React.Fragment>
      <img
        src="https://fiverr-res.cloudinary.com/npm-assets/layout-service/standard.0638957.png"
        alt=""
      />
      <div className="modal__info">
        <h2>Success starts here</h2>
        <ul>
          <li>
            <CheckIcon />
            <p>Over 600 categories</p>
          </li>
          <li>
            <CheckIcon />
            <p>Pay per project, not per hour</p>
          </li>
          <li>
            <CheckIcon />
            <p>Access to talent and businesses across the globe</p>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}

export default ArticalDefault