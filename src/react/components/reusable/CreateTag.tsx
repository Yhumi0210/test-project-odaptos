export default function CreateTag({
  tag,
  onClick,
}: {
  tag: string;
  onClick?: (tag: string) => void;
}) {
  return (
    <li
      className="tags"
      onClick={() => {
        onClick?.(tag);
      }}
    >
      {tag}
    </li>
  );
}
