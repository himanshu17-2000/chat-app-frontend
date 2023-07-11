export default function ChatAvatar({ userId, username }) {
  const colors = [
    "bg-red-300",
    "bg-green-300",
    "bg-slate-300",
    "bg-blue-300",
    "bg-yellow-300",
    "bg-teal-300",
  ];
  const userIdBase16 = parseInt(userId, 16);
  return (
    <div
      className={`w-9 h-9 ${
        colors[userIdBase16 % colors.length]
      }  flex items-center rounded-full border border-fuchsia-900`}
    >
      <div className=" opacity-70 text-center w-full">{username[0]}</div>
    </div>
  );
}
