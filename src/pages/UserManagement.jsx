import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserPlus, Trash2, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManagement = () => {
  // Add User States
  const [addUsername, setAddUsername] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  // Delete User States
  const [deleteEmail, setDeleteEmail] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Handle Add User
  const handleAddUser = async () => {
    if (!addUsername || !addEmail || !addPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(addEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password validation
    if (addPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setAddLoading(true);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usersection/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          username: addUsername,
          email: addEmail,
          password: addPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success("User created successfully!");
        // Reset form
        setAddUsername("");
        setAddEmail("");
        setAddPassword("");
      } else {
        toast.error(data.message || "Failed to create user");
      }

    } catch (error) {
      toast.error("Failed to create user");
      console.error(error);
    } finally {
      setAddLoading(false);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async () => {
    if (!deleteEmail) {
      toast.error("Please enter an email address");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(deleteEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setDeleteLoading(true);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          email: deleteEmail
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success("User deleted successfully!");
        setDeleteEmail("");
      } else {
        toast.error(data.message || "Failed to delete user");
      }

    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:ml-64">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          </div>
          <p className="text-gray-600 ml-13">Add new users or remove existing ones from the system</p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Note:</strong> Make sure to securely share credentials with new users. Deleted users cannot be recovered.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add User Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-green-900">Add New User</CardTitle>
                  <CardDescription className="text-green-700">Create a new user account</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="add-username" className="text-sm font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="add-username"
                      placeholder="Enter username"
                      value={addUsername}
                      onChange={(e) => setAddUsername(e.target.value)}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="add-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="add-email"
                      type="email"
                      placeholder="user@example.com"
                      value={addEmail}
                      onChange={(e) => setAddEmail(e.target.value)}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="add-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="add-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={addPassword}
                      onChange={(e) => setAddPassword(e.target.value)}
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
                </div>

                {/* Create Button */}
                <Button
                  onClick={handleAddUser}
                  disabled={addLoading}
                  className="w-full bg-green-600 hover:bg-green-700 mt-6"
                >
                  {addLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Delete User Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-red-900">Delete User</CardTitle>
                  <CardDescription className="text-red-700">Remove an existing user account</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="delete-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="delete-email"
                      type="email"
                      placeholder="Enter user email to delete"
                      value={deleteEmail}
                      onChange={(e) => setDeleteEmail(e.target.value)}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Enter the email address of the user you want to delete</p>
                </div>

                {/* Warning Alert */}
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800 text-sm">
                    <strong>Warning:</strong> This action cannot be undone. The user will be permanently removed.
                  </AlertDescription>
                </Alert>

                {/* Delete Button */}
                <Button
                  onClick={handleDeleteUser}
                  disabled={deleteLoading}
                  variant="destructive"
                  className="w-full mt-6"
                >
                  {deleteLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete User
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Tips */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900">Best Practices</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use strong passwords with a mix of letters, numbers, and symbols</li>
                  <li>• Double-check email addresses before creating or deleting users</li>
                  <li>• Inform users immediately after creating their accounts</li>
                  <li>• Keep a record of user management activities for security purposes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UserManagement;
