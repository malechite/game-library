import { useRef, type ChangeEvent } from "react";
import { VStack, Box, Img } from "@game-library/armature";
import { Size, type ApiAsset } from "@game-library/types";
import { Button, Icon, type CinderIconType } from "@game-library/cinder";
import { vars } from "@game-library/cinder/theme";
import { useUploadAsset } from "@game-library/sdk";

export interface ImageUploadProps {
  /** Current image URL, if any. */
  value?: string | null;
  /** Called with the stored asset's public URL (and the asset itself) after a successful upload. */
  onUploaded: (url: string, asset: ApiAsset) => void;
  /** Placeholder icon shown when there is no image. */
  placeholderIcon?: CinderIconType;
  /** Square preview size in px. */
  size?: number;
  alt?: string;
}

/** Square image picker backed by the asset service (`POST /assets/upload`). */
export const ImageUpload = ({
  value,
  onUploaded,
  placeholderIcon = "Image",
  size = 160,
  alt = "Uploaded image"
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadAsset();

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;
    const asset = await upload.mutateAsync({ file });
    onUploaded(asset.url, asset);
  };

  return (
    <VStack gap={2} padding={0} stay>
      <Box
        stay
        center
        rounded={Size.Medium}
        style={{ width: size, height: size, background: vars.color.muted, color: vars.color.mutedForeground }}
      >
        {value ? (
          <Img src={value} style={{ width: size, height: size, objectFit: "contain" }} alt={alt} />
        ) : (
          <Icon type={placeholderIcon} size={4} weight="fill" />
        )}
      </Box>
      <input ref={inputRef} type="file" accept="image/*" onChange={(e) => void handleFile(e)} style={{ display: "none" }} />
      <Button variant="outline" size="sm" icon="Camera" loading={upload.isPending} onClick={() => inputRef.current?.click()}>
        {value ? "Change image" : "Upload image"}
      </Button>
    </VStack>
  );
};
