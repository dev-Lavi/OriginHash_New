import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Upload, ArrowLeft, Save, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";


const UpdateHeaderRegion = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Header Information States
  const [coreTitle, setCoreTitle] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [core, setCore] = useState("");
  const [contact, setContact] = useState("");

  // Hero Section States
  const [heroTitle, setHeroTitle] = useState("");
  const [menuImages, setMenuImages] = useState([null, null, null, null, null, null]);
  const [imagePreview, setImagePreview] = useState([null, null, null, null, null, null]);

  // Handle image upload
  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size should be less than 10MB");
        return;
      }
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        toast.error("Only PNG and JPG formats are allowed");
        return;
      }
      const newImages = [...menuImages];
      newImages[index] = file;
      setMenuImages(newImages);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPreviews = [...imagePreview];
        newPreviews[index] = e.target.result;
        setImagePreview(newPreviews);
      };
      reader.readAsDataURL(file);
      toast.success(`Image ${index + 1} uploaded successfully`);
    }
  };

  //Handle publish api
const handlePublish = async () => {
  if (!coreTitle || !aboutUs || !core || !contact || !heroTitle) {
    toast.error("Please fill in all required fields");
    return;
  }

  const uploadedImagesCount = menuImages.filter(img => img !== null).length;
  if (uploadedImagesCount === 0) {
    toast.error("Please upload at least one menu image");
    return;
  }

  try {
    setPublishing(true);
    const formData = new FormData();
    formData.append("coreTitle", coreTitle);
    formData.append("aboutUs", aboutUs);
    formData.append("core", core);
    formData.append("contact", contact);
    formData.append("heroTitle", heroTitle);

    // Append all images with the same key name
    menuImages.forEach((image) => {
      if (image) {
        formData.append('menuImages', image);
      }
    });

    const response = await axiosInstance.post(
      "/api/header/update",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    if (response.data.success) {
      toast.success("Header region updated successfully!");
      // Optionally navigate or reset form
    } else {
      toast.error(response.data.message || "Failed to update header region");
    }

  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Failed to update header region");
  } finally {
    setPublishing(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-blue-500" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">Update Header Region</h1>
          </div>
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        {/* Header Information Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Header Information</CardTitle>
            <CardDescription>Update your core header details and navigation information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="coreTitle">Core Title</Label>
                <Input
                  id="coreTitle"
                  placeholder="Enter your core title"
                  value={coreTitle}
                  onChange={(e) => setCoreTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aboutUs">About Us</Label>
                <Textarea
                  id="aboutUs"
                  placeholder="Enter about us description"
                  value={aboutUs}
                  onChange={(e) => setAboutUs(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="core">Core</Label>
                <Input
                  id="core"
                  placeholder="Enter core information"
                  value={core}
                  onChange={(e) => setCore(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  placeholder="Enter contact information"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                Update Header
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>Configure your hero section title and menu images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input
                  id="heroTitle"
                  placeholder="Enter your hero section title"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Menu Images (6 Pictures)</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleImageUpload(index, e)}
                        />
                        {imagePreview[index] ? (
                          <div className="flex flex-col items-center">
                            <img
                              src={imagePreview[index]}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-md mb-2"
                            />
                            <p className="text-xs text-green-600 font-medium">Image uploaded</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <div className="text-center">
                              <p className="text-sm font-medium text-gray-700">Upload Image {index + 1}</p>
                              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                Update Hero Section
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Result Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Result Section</CardTitle>
            <CardDescription>Preview will update based on your Header and Hero inputs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-[#f5f1e8] rounded-lg p-8 space-y-8">

{/* -- REPLACED: Responsive Header Preview -- */}
          <div className="hidden lg:flex items-center justify-between pb-4 border-b border-gray-300 relative">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              {coreTitle ? (
                <span className="text-lg font-medium text-gray-800">{coreTitle}</span>
              ) : (
                <Skeleton className="h-6 w-32" />
              )}
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">
              <span className="text-gray-700 cursor-pointer hover:text-gray-900">Home</span>
              <span className="text-gray-700 cursor-pointer hover:text-gray-900">Menu</span>
              {aboutUs || core ? (
                <>
                  <span className="text-gray-700 cursor-pointer hover:text-gray-900">About</span>
                  <span className="text-gray-700 cursor-pointer hover:text-gray-900">Contact</span>
                </>
              ) : (
                <>
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </>
              )}
            </div>

            <div className="flex items-center justify-end flex-1">
              {contact ? (
                <div className="border border-gray-800 rounded-full px-4 py-2 text-sm">
                  📞 {contact}
                </div>
              ) : (
                <Skeleton className="h-8 w-32 rounded-full" />
              )}
            </div>
          </div>

          {/* Mobile / Tablet Header (< lg) - hamburger left, logo center */}
          <div className="lg:hidden pb-4 border-b border-gray-300 relative">
            <div className="flex items-center justify-between">
              {/* Hamburger */}
              <button
                aria-label="Toggle menu"
                onClick={() => setMobileMenuOpen((s) => !s)}
                className="p-2 rounded-md hover:bg-black/5 transition"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Center Logo */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Z</span>
                </div>
              </div>

              {/* placeholder to keep center aligned */}
              <div className="w-9" />
            </div>

            {/* Slide-over menu panel */}
            {mobileMenuOpen && (
              <div className="mt-3 bg-white/90 backdrop-blur-sm border rounded-lg shadow-lg p-4 space-y-3">
                <button
                  onClick={() => { /* navigate or set state */ setMobileMenuOpen(false); }}
                  className="w-full text-left text-gray-700 hover:text-gray-900"
                >
                  Home
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); }}
                  className="w-full text-left text-gray-700 hover:text-gray-900"
                >
                  Menu
                </button>
                {(aboutUs || core) ? (
                  <>
                    <button onClick={() => setMobileMenuOpen(false)} className="w-full text-left text-gray-700 hover:text-gray-900">About</button>
                    <button onClick={() => setMobileMenuOpen(false)} className="w-full text-left text-gray-700 hover:text-gray-900">Contact</button>
                  </>
                ) : (
                  <>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  </>
                )}
                <div className="pt-2 border-t">
                  {contact ? (
                    <div className="text-sm text-gray-700">📞 {contact}</div>
                  ) : (
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  )}
                </div>
              </div>
            )}
          </div>
 
                    {/* Hero Preview */}
                    <div className="text-center space-y-8 pt-4">
  {heroTitle ? (
    <h2 className="text-3xl md:text-4xl font-serif text-gray-900 leading-tight">
      {heroTitle}
    </h2>
  ) : (
    <div className="flex justify-center">
      <Skeleton className="h-12 w-96" />
    </div>
  )}

  {/* Images carousel with scroll buttons */}
  <div className="relative pt-4">
    {/* Left scroll button */}
    <button
      onClick={() => {
        const container = document.getElementById('image-scroll-container');
        container.scrollBy({ left: -200, behavior: 'smooth' });
      }}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
      aria-label="Scroll left"
    >
      <ChevronLeft className="w-6 h-6 text-gray-700" />
    </button>

    {/* Images container with hidden scrollbar */}
    <div
      id="image-scroll-container"
      className="flex items-center justify-start gap-4 overflow-x-auto pb-4 px-12 scrollbar-hide"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {imagePreview.map((preview, index) => (
        <div
          key={index}
          className={`rounded-xl overflow-hidden bg-gray-200 border-2 border-gray-300 flex-shrink-0
            ${index % 2 === 0 ? 'w-[160px] h-[160px]' : 'w-[200px] h-[200px]'}
          `}
        >
          {preview ? (
            <img src={preview} alt={`Menu ${index + 1}`} className="w-full h-full object-cover" />
          ) : (
            <Skeleton className="w-full h-full" />
          )}
        </div>
      ))}
    </div>

    {/* Right scroll button */}
    <button
      onClick={() => {
        const container = document.getElementById('image-scroll-container');
        container.scrollBy({ left: 200, behavior: 'smooth' });
      }}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
      aria-label="Scroll right"
    >
      <ChevronRight className="w-6 h-6 text-gray-700" />
    </button>
  </div>
</div>

            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border-t border-gray-200 p-4 rounded-lg gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="inline-block w-4 h-4 rounded-full border-2 border-gray-400" />
            All changes will be saved automatically
          </div>
          <div className="flex gap-3 w-full sm:w-auto max-[474px]:flex-col">
            <Button variant="outline" onClick={() => navigate(-1)} className="flex-1 sm:flex-initial max-[474px]:w-full">
              Cancel
            </Button>
            <Button 
              onClick={handlePublish} 
              disabled={publishing} 
              className="gap-2 flex-1 sm:flex-initial max-[474px]:w-full max-[474px]:mt-2"
            >
              <Save className="w-4 h-4" />
              {publishing ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UpdateHeaderRegion;
