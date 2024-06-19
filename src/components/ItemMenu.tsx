"use client";
import React, { useState } from "react";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";

interface Props {
    heading: string;
    items?: string[];
    isDefault?: boolean;
}

const ItemMenu: React.FC<Props> = ({
    heading,
    items = null,
    isDefault = false,
}) => {
    const [open, setOpen] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={heading} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {!isDefault ? (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {items &&
                            items.map((item, idx) => {
                                return (
                                    <ListItemButton key={idx} sx={{ pl: 4 }}>
                                        <ListItemText primary={item} />
                                    </ListItemButton>
                                );
                            })}
                    </List>
                </Collapse>
            ) : (
                <Collapse in={true} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {items &&
                            items.map((item, idx) => {
                                return (
                                    <ListItemButton key={idx} sx={{ pl: 4 }}>
                                        <ListItemText primary={item} />
                                    </ListItemButton>
                                );
                            })}
                    </List>
                </Collapse>
            )}
        </React.Fragment>
    );
};

export default ItemMenu;