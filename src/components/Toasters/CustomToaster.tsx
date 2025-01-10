import { Toaster } from "sonner";

export const CustomToaster = () => {
  return (
    <Toaster
      toastOptions={{
        unstyled: true,
        closeButton: true,
        className: "font-sans",

        classNames: {
          toast:
            "w-full border flex items-center gap-1  p-4 group !leading-none",
          success: "success bg-blue-200 text-blue-900 border-blue-900",
          error: "error bg-red-200 text-red-900 border-red-900 ",
          closeButton:
            "!bg-blue-200  mx-0 !left-[unset]  !right-[-8px] top-[6px] group-[.success]:border-blue-900 group-[.error]:border-red-900  rounded-none group-[.success]:hover:!bg-blue-900 group-[.success]:hover:!border-blue-900 group-[.success]:hover:!text-blue-200 group-[.error]:hover:!bg-red-900 group-[.error]:hover:!border-red-900 group-[.error]:hover:!text-red-200",
        },
      }}
    />
  );
};
