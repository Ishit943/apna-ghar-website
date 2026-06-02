// Initialize demo users and data if not already present
export function initializeDemoData() {
  const existingUsers = localStorage.getItem("users");
  
  if (!existingUsers) {
    const demoUsers = [
      {
        id: "admin-001",
        name: "Admin User",
        email: "admin@apnaghar.com",
        password: "admin123",
        role: "admin",
        joinedDate: new Date().toISOString().split("T")[0],
      },
      {
        id: "team-001",
        name: "Raj Kumar",
        email: "team@apnaghar.com",
        password: "team123",
        role: "team_member",
        joinedDate: new Date().toISOString().split("T")[0],
      },
    ];
    
    localStorage.setItem("users", JSON.stringify(demoUsers));
  }
}
