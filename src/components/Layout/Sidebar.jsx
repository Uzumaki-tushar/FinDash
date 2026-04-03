import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  LayoutDashboard, 
  Settings, 
  CreditCard, 
  PieChart, 
  Menu,
  Moon,
  Sun,
  Shield,
  User,
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Sidebar() {
  const { role, toggleRole, isDarkMode, toggleTheme } = useStore();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    // { icon: CreditCard, label: 'Transactions', active: false },
    // { icon: PieChart, label: 'Analytics', active: false },
    // { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-md bg-card border shadow-sm"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <aside className={cn(
        "fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r flex flex-col transition-transform duration-300",
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex items-center h-16 px-6 border-b">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-black">F</span>
            </div>
            FinDash
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200",
                  item.active 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t space-y-4">
          {/* Controls */}
          <div className="bg-secondary/50 rounded-xl p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Dark Mode</span>
              <button 
                onClick={toggleTheme}
                className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-secondary hover:bg-secondary/80"
              >
                <span className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full bg-background shadow-sm ring-0 transition-transform duration-200",
                  isDarkMode ? "translate-x-5" : "translate-x-0"
                )}>
                  {isDarkMode ? <Moon className="h-3 w-3 text-primary" /> : <Sun className="h-3 w-3 text-orange-400" />}
                </span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Role</span>
              <button 
                onClick={toggleRole}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background shadow-sm border text-xs font-semibold hover:border-primary/50 transition-colors"
                title="Toggle Admin/Viewer"
              >
                {role === 'Admin' ? (
                  <><Shield className="w-3.5 h-3.5 text-emerald-500" /> Admin</>
                ) : (
                  <><User className="w-3.5 h-3.5 text-blue-500" /> Viewer</>
                )}
              </button>
            </div>
          </div>

         
        </div>
      </aside>
      
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
