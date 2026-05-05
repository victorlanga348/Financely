function Input(props: { type: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            className="input-field text-sm md:text-base"
            value={props.value}
            onChange={props.onChange}
            required
        />
    );
}

export default Input;