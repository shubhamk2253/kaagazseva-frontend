export const Loader: React.FC<{ fullScreen?: boolean }> = ({ fullScreen }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-gray-500 font-medium animate-pulse">KaagazSeva is loading...</p>
    </div>
  );

  if (fullScreen) {
    return <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">{content}</div>;
  }

  return content;
};