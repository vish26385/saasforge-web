type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea(props: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500 ${
        props.className || ""
      }`}
    />
  );
}