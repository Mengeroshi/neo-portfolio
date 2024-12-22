export const Label = ({
  children,
  name,
  errorMessage,
  required,
}: {
  children: React.ReactNode;
  name: string;
  errorMessage?: string;
  required?: boolean;
}) => {
  return (
    <label className="block w-full">
      <div className="w-fit bg-blue-900 px-2 font-semibold">
        {name} {required && "*"}
      </div>
      {children}
      {errorMessage && <div className="text-red-900">{errorMessage}</div>}
    </label>
  );
};
