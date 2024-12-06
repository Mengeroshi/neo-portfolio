export const Label = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  return (
    <label className="block w-full">
      <div className="w-fit bg-blue-900 px-2 font-semibold">{name}</div>{" "}
      {children}
    </label>
  );
};
