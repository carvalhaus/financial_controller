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

function AddCategory() {
  const [emojiIcon, setEmojiIcon] = react.useState("🙄");
  const [openEmojiPicker, setOpenEmojiPicker] = react.useState(false);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center justify-center bg-white border border-softGray rounded-md drop-shadow md:w-96 h-[158px] md:h-full text-4xl cursor-pointer hover:drop-shadow-lg transition duration-150 ease-out hover:ease-in">
          &#43;
        </div>
      </DialogTrigger>

      <DialogContent className="w-11/12 rounded-md">
        <DialogHeader>
          <DialogTitle>Criar Categoria</DialogTitle>
          <DialogDescription>
            Crie uma categoria para organizar suas despesas!
          </DialogDescription>
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

          <Button>Criar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddCategory;
