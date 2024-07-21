import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import { Box, Divider } from '@mui/material';

const DetailTypeSelect = () => {
    return (
        <>
            <>
                <ListSubheader className="!p-0">
                    <ListItemButton className="item__strong">
                        <div>
                            <div
                                className={`item__strong-icon`}
                            >
                            </div>
                        </div>
                        <span> bài học</span>
                    </ListItemButton>
                </ListSubheader>
            </>

        </>
    )
}

export default DetailTypeSelect