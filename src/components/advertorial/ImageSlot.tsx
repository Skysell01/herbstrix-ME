import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, Loader2, X, ImageIcon } from "lucide-react";

type Aspect = "21/9" | "16/9" | "4/3" | "1/1";

interface ImageSlotProps {
  /** Unique key — used to remember the image in this browser */
  slotKey: string;
  /** Label shown in the empty placeholder */
  label?: string;
  /** Aspect ratio */
  aspect?: Aspect;
  /** Optional className for the wrapper */
  className?: string;
  /** Alt text for the image */
  alt?: string;
}

const aspectClass: Record<Aspect, string> = {
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

export function ImageSlot({
  slotKey,
  label = "Click to upload image",
  aspect = "16/9",
  className = "",
  alt = "",
}: ImageSlotProps) {
  const storageKey = `image_slot:${slotKey}`;
  const [url, setUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setUrl(saved);
  }, [storageKey]);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB for local storage");
      return;
    }
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUrl(base64String);
        localStorage.setItem(storageKey, base64String);
        toast.success("Image uploaded to local storage");
        setUploading(false);
      };
      reader.onerror = () => {
        toast.error("Failed to read file");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (e: any) {
      toast.error(e?.message || "Upload failed");
      setUploading(false);
    }
  }

  function clearImage() {
    setUrl(null);
    localStorage.removeItem(storageKey);
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />

      {url ? (
        <div className="relative group">
          <img
            src={url}
            alt={alt}
            className={`w-full rounded-xl border border-rule object-cover ${aspectClass[aspect]}`}
          />
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              Replace
            </Button>
            <Button size="sm" variant="destructive" onClick={clearImage}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`flex w-full items-center justify-center rounded-xl border-2 border-dashed border-rule bg-card/40 text-ink-muted hover:bg-card/70 transition-colors ${aspectClass[aspect]}`}
        >
          <div className="text-center px-4">
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin mx-auto" />
            ) : (
              <ImageIcon className="h-6 w-6 mx-auto" />
            )}
            <p className="text-sm font-medium mt-2">
              {uploading ? "Uploading..." : label}
            </p>
            <p className="text-xs mt-1">PNG, JPG, WEBP up to 10MB</p>
          </div>
        </button>
      )}
    </div>
  );
}
