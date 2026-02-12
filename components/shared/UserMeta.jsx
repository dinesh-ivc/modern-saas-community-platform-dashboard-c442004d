export default function UserMeta({ name, role, timestamp }) {
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'moderator':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-semibold text-slate-900">{name}</span>
      {role && (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(role)}`}>
          {role}
        </span>
      )}
      {timestamp && (
        <>
          <span className="text-slate-400">•</span>
          <span className="text-sm text-slate-500">{timestamp}</span>
        </>
      )}
    </div>
  );
}