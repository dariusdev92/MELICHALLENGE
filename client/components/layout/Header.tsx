import Logo from "../shared/Logo";
import SearchBar from "./SearchBar";

export default function Header()
{
    // Props
    const headerLogo = {
        imgSrc: "/assets/images/logo.jpg",
        desc: "Logo ML"
    }

    // Render
    return (
        <header id="top-bar">

            <div className="search-container">
                
                <Logo {...headerLogo} />

                <SearchBar />

            </div>

        </header>
    )
}