import SearchBar from "./SeachBar"
import ShoppingCartSheet from "./ShoppingCartSheet"
import UserAvatar from "./UserAvatar"
import IconBack from "./IconBack"

type HeaderProps = {
    showAvatar?: boolean
    showSearchBar?: boolean
    showShoppingCart?: boolean
    showIconBack?: Boolean
}

export default function Header({ showAvatar = true, showSearchBar = true, showShoppingCart = true, showIconBack = false }: HeaderProps) {
    return (
        <nav className="sticky top-0 flex justify-around px-3 py-2 bg-white z-10">
            {showIconBack && <IconBack />}
            {showAvatar && <UserAvatar />}
            {showSearchBar && <SearchBar />}
            {showShoppingCart && <ShoppingCartSheet />}
        </nav>
    )
}