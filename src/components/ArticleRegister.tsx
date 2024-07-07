import { Avatar } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";

const ArticleRegister = () => {
    return (
        <div className="ArticalDefault">
            <img
                src="https://fiverr-res.cloudinary.com/npm-assets/layout-service/standard.0638957.png"
                alt=""
            />
            <div className="modal__info">
                <div className="info__item">
                    <Avatar alt="Remy Sharp" src="/images/w3.png" />
                    <p>Remy</p>
                    <CheckIcon />
                </div>
                <div className="info__item">
                    <Avatar alt="Remy Sharp" src="/images/w2.png" />
                    <p>Remy Sharp</p>
                    <CheckIcon />
                </div>
            </div>
        </div>
    )
}

export default ArticleRegister