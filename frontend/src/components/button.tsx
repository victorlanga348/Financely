export default function Button(props: { children: React.ReactNode, onClick?: () => void, type?: "button" | "submit" | "reset", disabled?: boolean }) {
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className="btn-primary flex items-center justify-center gap-2"
        >
            {props.children}
        </button>
    );
}