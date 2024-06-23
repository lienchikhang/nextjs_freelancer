'use client';
import React, { useCallback, useState } from 'react';
import {
    FormControl,
    FormControlLabel,
    Menu,
    Radio,
    RadioGroup,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import '../styles/buttonDelivery.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
}

const ButtonDeliveryTime: React.FC<Props> = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [filter, setFilter] = useState('');
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

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        setFilter(`${pathname}?${params.toString()}` as string);
    };

    const handleChangeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateQuery(e.currentTarget.name, e.currentTarget.value);
    }

    const handleConfirm = () => {
        if (!filter) return;
        router.push(filter);
    }

    const handleCancel = () => {
        const params = new URLSearchParams(query as any);
        params.delete('deliveryTime');
        setFilter('');
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <React.Fragment>
            <button className="navbar__btn" onClick={handleClick}>
                Delivery time
                {open ? <ExpandLess /> : <ExpandMore />}
            </button>
            <Menu
                className="navbar__menu p-4"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="any"
                        name="radio-buttons-group"
                        onChange={handleChangeSelect}
                    // value={select}
                    >
                        <FormControlLabel

                            value={'1'}
                            name='deliveryTime'
                            control={<Radio />}
                            label="Express 24H"
                        />
                        <FormControlLabel
                            name='deliveryTime'
                            value="3"
                            control={<Radio />}
                            label="Up to 3 days"
                        />
                        <FormControlLabel
                            name='deliveryTime'
                            value="7"
                            control={<Radio />}
                            label="Up to 7 days"
                        />
                        <FormControlLabel
                            name='deliveryTime'
                            value=""
                            control={<Radio />}
                            label="Anytime"
                        />
                    </RadioGroup>
                </FormControl>
                <div className="btn-section">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleConfirm}>Apply</button>
                </div>
            </Menu>
        </React.Fragment>
    )
}

export default ButtonDeliveryTime