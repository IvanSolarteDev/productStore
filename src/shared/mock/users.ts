export type UserRole = "admin" | "sales" | "buyer";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
};

export const mockUsers: MockUser[] = [
  {
    id: "user-admin-001",
    name: "Alex Administrador",
    email: "admin@productstore.test",
    role: "admin",
    isActive: true,
  },
  {
    id: "user-sales-001",
    name: "Sofía Ventas",
    email: "ventas@productstore.test",
    role: "sales",
    isActive: true,
  },
  {
    id: "user-buyer-001",
    name: "Daniel Comprador",
    email: "comprador@productstore.test",
    role: "buyer",
    isActive: true,
  },
];
