import SearchBar from "./SeachBar"
import ShoppingCartSheet from "./ShoppingCartSheet"
import UserAvatar from "./UserAvatar"

type HeaderProps = {
    showAvatar?: boolean
    showSearchBar?: boolean
    showShoppingCart?: boolean
}

export default function Header({ showAvatar = true, showSearchBar = true, showShoppingCart = true }: HeaderProps) {
    return (
        <nav className="sticky top-0 flex justify-around px-3 py-2 bg-white">
            {showAvatar && <UserAvatar />}
            {showSearchBar && <SearchBar />}
            {showShoppingCart && <ShoppingCartSheet />}
        </nav>
    )
}