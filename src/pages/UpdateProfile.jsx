import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Lock, Upload, X, Save, Key, Eye, EyeOff, Camera } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Form States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [existingPicture, setExistingPicture] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fetch current user profile
  const fetchUserProfile = async () => {
    try {
      setFetchingProfile(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setUsername(data.data.username);
        setEmail(data.data.email);
        setReferenceNumber(data.data.referenceNumber);
        if (data.data.profilePicture) {
          setExistingPicture(`${import.meta.env.VITE_BACKEND_URL}${data.data.profilePicture}`);
          setProfilePicturePreview(`${import.meta.env.VITE_BACKEND_URL}${data.data.profilePicture}`);
        }
      } else {
        toast.error("Failed to load profile");
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error("Failed to load profile");
    } finally {
      setFetchingProfile(false);
    }
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error("Please upload a valid image file");
        return;
      }

      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove Image
  const handleRemoveImage = () => {
    setProfilePicture(null);
    setProfilePicturePreview(existingPicture);
  };

  // Handle Submit
  const handleSubmit = async () => {
    // Validation
    if (!username || !email) {
      toast.error("Username and email are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password && password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      if (password) formData.append('password', password);
      if (profilePicture) formData.append('profilePicture', profilePicture);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/update`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Profile updated successfully!");
        setPassword(""); // Clear password field
        fetchUserProfile(); // Refresh profile data
      } else {
        toast.error(data.message || "Failed to update profile");
      }

    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 lg:ml-64">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-xl p-6 h-96"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:ml-64">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Update Profile</h1>
          </div>
          <p className="text-gray-600 ml-13">Manage your account information and preferences</p>
        </div>

        {/* Reference Number Alert */}
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Key className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 flex items-center justify-between">
            <span>
              <strong>Your Reference Number:</strong> {referenceNumber}
            </span>
            <span className="text-xs">(This cannot be changed)</span>
          </AlertDescription>
        </Alert>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details below</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-6">
                <Label className="text-sm font-medium mb-4">Profile Picture</Label>
                
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100 flex items-center justify-center">
                    {profilePicturePreview ? (
                      <img
                        src={profilePicturePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profile-picture"
                  />
                  <label
                    htmlFor="profile-picture"
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </label>
                </div>

                {profilePicture && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="mt-3 text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove new picture
                  </Button>
                )}
                <p className="text-xs text-gray-500 mt-2">PNG, JPG, JPEG (max. 5MB)</p>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  New Password (Optional)
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <p className="text-xs text-gray-500">Leave blank to keep current password</p>
              </div>

              {/* Update Button */}
              <div className="pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Profile
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5">
                ⚠️
              </div>
              <div>
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> Updating your email may require re-verification. 
                  Your reference number is permanent and cannot be modified.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UpdateProfile;
