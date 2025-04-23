export const LabelWithUnderLine = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-fit w-full flex-col">
      <div className="mb-1 border-b border-blue-900/40 text-sm leading-none tracking-widest text-blue-900/40">
        {label}
      </div>
      {children}
    </div>
  );
};
