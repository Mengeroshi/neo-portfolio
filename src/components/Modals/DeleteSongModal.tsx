"use client";
import { onDeleteSongByIdAction } from "@/server/actions/Song";
import { ConfettiIcon, ErrorOutlineIcon } from "@sanity/icons";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./Dialog";
import { Button } from "../Buttons/Button";

export const DeleteSongModal = () => {
  const router = useRouter();
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const deleteId = searchParams.get("delete")
    ? Number(searchParams.get("delete"))
    : null;
  const songName = searchParams.get("songName");

  function onDismiss() {
    router.back();
  }
  const { isPending, execute } = useServerAction(onDeleteSongByIdAction);

  const onDelete = async () => {
    if (!deleteId) return;
    const [response, error] = await execute({
      id: deleteId,
      albumSlug: slug as string,
    });
    if (error) {
      toast.error(error.message, {
        icon: <ErrorOutlineIcon className="size-5" />,
      });
    } else {
      toast.success(`Song ${response[1].name} deleted`, {
        icon: <ConfettiIcon className="size-5" />,
      });
      onDismiss();
    }
  };
  return (
    <Dialog open={deleteId !== null} onOpenChange={onDismiss}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Do you want to delete &quot;{songName}&quot; ?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this song?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="flex-1"
            text="Confirm"
            variant="secondary"
            onClick={onDismiss}
            disabled={isPending}
          />
          <Button
            className="flex-1"
            text="Confirm"
            disabled={isPending}
            onClick={onDelete}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
