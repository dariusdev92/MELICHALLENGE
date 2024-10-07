import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar()
{
    // Start
    const navigate = useNavigate();     
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';    
    const [searchText, setSearchText] = useState(searchQuery);   

    // Handlers
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault(); 

        if(searchText.trim()) 
        {
            navigate(`/items?search=${encodeURIComponent(searchText)}`);
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setSearchText(value);
    };

    // Render
    return (        
        <form 
            role="search" 
            aria-label="Buscar productos"
            onSubmit={handleSubmit} 
        >

            <input id="search-input" 
                type="text"  
                name="search" 
                placeholder="Nunca dejes de buscar"               
                aria-required="true"
                required 
                value={searchText}
                onChange={handleInputChange} 
            />

            <button type="submit">
                <span className="material-symbols-outlined">
                    search
                </span>
            </button>

        </form>
    )
}