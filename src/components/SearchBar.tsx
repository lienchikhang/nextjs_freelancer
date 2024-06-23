"use client";
import Link from "next/link";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/search.scss";
import { useRouter } from "next/navigation";

interface Props {
    className?: string
}

const SearchBar: React.FC<Props> = ({ className }) => {
    const [search, setSearch] = useState<string>("");
    const navigate = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && search) {
            e.preventDefault();
            navigate.push(`/search?name=${search}`)
        }
    }

    return (
        <div className={`search__bar ${className}`}>
            <input
                type="text"
                placeholder="Search for any services..."
                onChange={handleSearch}
                onKeyDown={handleEnter}
            />
            <Link
                className="search-btn"
                href={{
                    pathname: "/search",
                    query: search && {
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