export const Form = ({
  ref,
  onSubmit,
  children,
}: {
  children: React.ReactNode;
  ref: React.RefObject<HTMLFormElement>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form
      ref={ref}
      onSubmit={onSubmit}
      style={{ scrollbarGutter: "stable !important" }}
      className="scrollbar-thumb-rounded-none flex w-[50vw] flex-col gap-4 overflow-auto border border-blue-900 p-8 scrollbar scrollbar-track-blue-200/[.40] scrollbar-thumb-blue-900/[.40]"
    >
      {children}
    </form>
  );
};
