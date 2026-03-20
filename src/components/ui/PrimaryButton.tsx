type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-lg bg-slate-900 text-white px-4 py-2 disabled:opacity-60 ${
        props.className || ""
      }`}
    />
  );
}