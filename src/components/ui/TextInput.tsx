type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function TextInput(props: TextInputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500 ${
        props.className || ""
      }`}
    />
  );
}