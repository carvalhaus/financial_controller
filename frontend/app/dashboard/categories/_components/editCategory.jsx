"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmojiPicker from "emoji-picker-react";
import react from "react";

function EditCategory() {
  const [emojiIcon, setEmojiIcon] = react.useState("🙄");
  const [openEmojiPicker, setOpenEmojiPicker] = react.useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button className="w-full">Editar categoria</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Categoria</DialogTitle>
          <DialogDescription>Edite a categoria selecionada</DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-6">
          <div>
            <Button
              variant="outline"
              className="text-lg size-10 border border-[#292E33]/40"
              onClick={(e) => {
                e.preventDefault();
                setOpenEmojiPicker(!openEmojiPicker);
              }}
            >
              {emojiIcon}
            </Button>
            <div className="absolute">
              <EmojiPicker
                open={openEmojiPicker}
                onEmojiClick={(e) => {
                  setEmojiIcon(e.emoji);
                  setOpenEmojiPicker(false);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" defaultValue="" placeholder="Saúde" />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="limit">Limite da categoria</Label>
            <Input id="limit" defaultValue="" placeholder="R$ 300,00" />
          </div>

          <Button>Editar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategory;
