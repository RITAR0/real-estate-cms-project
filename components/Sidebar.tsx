import React from "react";
import { LayoutDashboard, Building2, Users, UserCircle, Briefcase, FileText, MapPin, Settings } from "lucide-react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "properties", label: "Properties", icon: Building2 },
    { id: "brokers", label: "Brokers", icon: Users },
    { id: "clients", label: "Clients", icon: UserCircle },
    // { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "locations", label: "Locations", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0a1128] text-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-orange-400">RealEstate CMS</h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === item.id
                ? "bg-orange-500 text-white shadow-lg"
                : "text-gray-400 hover:bg-[#1a233a] hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-800">
        <p className="text-xs text-gray-500">Real Estate CMS v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
