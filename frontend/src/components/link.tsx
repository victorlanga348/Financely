import { Link as RouterLink } from "react-router-dom";

function Link(props: { children: React.ReactNode, onClick?: () => void, href?: string }) {
    return (
        <RouterLink 
            to={props.href}
            onClick={props.onClick}
            className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
        >
            {props.children}
        </RouterLink>
    );
}

export default Link;