export default function ChatAvatar({ userId, username, online }) {
  const colors = ['bg-teal-500', 'bg-red-500',
    'bg-green-500', 'bg-purple-500',
    'bg-blue-500', 'bg-yellow-500',
    'bg-orange-500', 'bg-pink-500', 'bg-fuchsia-500', 'bg-rose-500'];
  const userIdBase10 = parseInt(userId.substring(10), 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];
  return (
    <div className={"border border-purple-500 w-9 h-9 relative rounded-full flex items-center " + color}>
      <div className="text-center capitalize  w-full opacity-80 ">{username[0]}</div>
      {online && (
        <div className="absolute w-3 h-3 bg-green-400 bottom-0 right-0 rounded-full border border-grey"></div>
      )}
      {!online && (
        <div className="absolute w-3 h-3 bg-gray-400 bottom-0 right-0 rounded-full border border-grey"></div>
      )}
    </div>
  );
}