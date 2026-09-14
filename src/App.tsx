import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Settings as SettingsIcon,
  ShoppingCart,
  Users,
  Store,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import Products from "./pages/Products";
import Settings from "./pages/Settings";

const navigation = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Sales",
    url: "/sales",
    icon: ShoppingCart,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: SettingsIcon,
  },
];

function AppLayout() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-2 group-data-[collapsible=icon]:justify-center">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-400 text-primary-foreground">
              <Store className="h-4 w-4" />
            </div>

            <span className="truncate font-semibold group-data-[collapsible=icon]:hidden">
              Jack's IMS
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>IMS</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => {
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            `group-data-[collapsible=icon]:justify-center ${
                              isActive ? "bg-accent text-accent-foreground" : ""
                            }`
                          }
                        >
                          <Icon />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <main className="min-h-screen flex-1 bg-background text-foreground">
        <div className="flex items-center border-b px-4 py-3">
          <SidebarTrigger />
        </div>

        <div className="p-8">
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/" element={<Navigate to="/products" replace />} />
          </Routes>
        </div>
      </main>
    </SidebarProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
