import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Mail, Upload, X, Save } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UpdateCompanyInfo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form States
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove Image
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  // Handle Submit
  const handleSubmit = async () => {
    // Validation
    if (!companyName || !address || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!image) {
      toast.error("Please upload a company logo");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('companyName', companyName);
      formData.append('address', address);
      formData.append('email', email);
      formData.append('image', image);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/company-info/update`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Company information updated successfully!");
        // Reset form if needed
      } else {
        toast.error(data.message || "Failed to update company information");
      }

    } catch (error) {
      toast.error("Failed to update company information");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:ml-64">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Update Company Information</h1>
          </div>
          <p className="text-gray-600 ml-13">Update your company details and logo</p>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle>Company Details</CardTitle>
            <CardDescription>Enter your company information below</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium">
                  Company Name
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="companyName"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Company Address
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="address"
                    placeholder="Enter full company address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Contact Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="company@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              {/* Company Logo */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Company Logo</Label>
                
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="company-logo"
                    />
                    <label htmlFor="company-logo" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG (max. 5MB)</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center gap-4">
                      <img
                        src={imagePreview}
                        alt="Company Logo Preview"
                        className="w-24 h-24 object-cover rounded-lg border"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{image.name}</p>
                        <p className="text-xs text-gray-500">{(image.size / 1024).toFixed(2)} KB</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveImage}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                )}
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
                      Update Company Information
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
                ℹ️
              </div>
              <div>
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> This information will be displayed on your website footer and contact pages. 
                  Make sure all details are accurate and up-to-date.
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

export default UpdateCompanyInfo;
