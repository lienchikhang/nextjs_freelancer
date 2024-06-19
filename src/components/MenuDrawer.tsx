import { Box, Divider, List, ListSubheader, SwipeableDrawer } from '@mui/material'
import React from 'react'
import ItemMenu from './ItemMenu';

interface Props {
    isOpen: boolean,
    toggleDrawer: (open: boolean) => any;
}

const MenuDrawer: React.FC<Props> = ({ isOpen, toggleDrawer }) => {


    const list = () => (
        <Box sx={{ width: 300, padding: "24px" }} role="presentation">
            <button className="modal__button text-white bg-black rounded-md px-7 py-2 font-semibold">
                Join fiverr
            </button>
            <List>
                <ItemMenu heading="Sign in" />
                <ItemMenu heading="Browse Categories" />
                <ItemMenu heading="Explore" />
            </List>
            <Divider />
            <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        General
                    </ListSubheader>
                }
            >
                <ItemMenu heading="Home" />
                <ItemMenu heading="English" />
                <ItemMenu heading="Explore" />
            </List>
        </Box>
    );


    return (
        <SwipeableDrawer
            anchor={"left"}
            open={isOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            {list()}
        </SwipeableDrawer>
    )
}

export default MenuDrawer