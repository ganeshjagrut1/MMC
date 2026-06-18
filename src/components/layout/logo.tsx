import Image from "next/image";

const RATIO = 486 / 513; // intrinsic width / height of the logo file

/** The official Mauli Medical College emblem. `size` is the height in px. */
export function Logo({
  size = 40,
  className,
  priority,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/logo.png"
      alt="Mauli Medical College, Hospital & Research Centre logo"
      width={Math.round(RATIO * size)}
      height={size}
      priority={priority}
      className={className}
    />
  );
}
