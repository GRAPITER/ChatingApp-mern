import { useRef, useState } from "react";
import { useMessageStore } from "../../stores/messages-store";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

export default function ChatInput() {
  const [text, setText] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const { sendMessage } = useMessageStore();
  const refInputFile = useRef(null);
  //handel image
  async function handleImagechange(e) {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("plz enter image");
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    reader.readAsDataURL(file);
  }
  // remove image from state and field
  function removeImage() {
    setPreviewImage(null);
    if (refInputFile.current) {
      refInputFile.current.value = "";
    }
  }
  //sending messages to databse
  async function handleSendMessages(e) {
    e.preventDefault();
    if (!text.trim() && !previewImage) return;
    try {
      await sendMessage({
        message: text.trim(),
        image: previewImage,
      });

      setText("");
      setPreviewImage(null);
      if (refInputFile.current) refInputFile.current.value = "";
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-fill p-4">
      {previewImage && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessages} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md focus:border-0 "
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={refInputFile}
            onChange={handleImagechange}
          />

          <button
            type="button"
            className={`sm:flex btn btn-circle
                     ${previewImage ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => refInputFile.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !previewImage}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}
