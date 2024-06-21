"use client";
import Link from "next/link";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/search.scss";

interface Props {
    className?: string
}

const SearchBar: React.FC<Props> = ({ className }) => {
    const [search, setSearch] = useState<string>("");

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    };

    return (
        <div className={`search__bar ${className}`}>
            <input
                type="text"
                placeholder="Search for any services..."
                onChange={handleSearch}
            />
            <Link
                className="search-btn"
                href={{
                    pathname: "/search",
                    query: {
                        name: search,
                    },
                }}
            >
                <SearchIcon />
            </Link>
        </div>
    );
};

export default SearchBar;