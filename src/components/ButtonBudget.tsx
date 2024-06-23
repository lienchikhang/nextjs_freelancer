"use client";
import {
    Collapse,
    List,
    ListItemButton,
    ListItemText,
    Menu,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Listbox, ListboxOption, ListboxOptions } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ButtonBudget = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [filter, setFilter] = useState('');
    const [curPrice, setCurPrice] = useState(0);
    const router = useRouter();
    const pathname = usePathname();
    const query = useSearchParams();
    const open = Boolean(anchorEl);

    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, [])

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(query as any);
        console.log('search::', query.toString());
        console.log('param::', params.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        setFilter(`${pathname}?${params.toString()}` as string);
    }

    const handleChangeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateQuery(e.currentTarget.name, e.currentTarget.value);
        setCurPrice(+e.currentTarget.value);
    }

    const handleConfirm = () => {
        if (!filter) return;
        router.push(filter);
    }

    const handleCancel = () => {
        const params = new URLSearchParams(query as any);
        params.delete('price');
        setFilter('');
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <React.Fragment>
            <button className="navbar__btn" onClick={handleClick}>
                Budget
                {open ? <ExpandLess /> : <ExpandMore />}
            </button>
            <Menu
                className="navbar__menu p-4"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <input name='price' type="text" defaultValue={curPrice} placeholder="Enter budget" className="input-price" onChange={handleChangeSelect} />
                <div className="btn-section">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleConfirm}>Apply</button>
                </div>
            </Menu>
        </React.Fragment>
    );
};

export default ButtonBudget;