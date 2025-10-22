import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Upload, ArrowLeft, Save, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";

const UpdateFooterRegion = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Section 1: Our Culture
  const [cultureTitle, setCultureTitle] = useState("");
  const [cultureImages, setCultureImages] = useState([null, null, null, null, null, null]);
  const [cultureImagePreview, setCultureImagePreview] = useState([null, null, null, null, null, null]);

  // Section 2: Testimonial
  const [testimonialTitle, setTestimonialTitle] = useState("");
  const [testimonialText, setTestimonialText] = useState("");
  const [testimonialImage, setTestimonialImage] = useState(null);
  const [testimonialImagePreview, setTestimonialImagePreview] = useState(null);

  // Handle culture image upload
  const handleCultureImageUpload = (index, event) => {
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
      const newImages = [...cultureImages];
      newImages[index] = file;
      setCultureImages(newImages);

      const reader = new FileReader();
      reader.onload = (e) => {
        const newPreviews = [...cultureImagePreview];
        newPreviews[index] = e.target.result;
        setCultureImagePreview(newPreviews);
      };
      reader.readAsDataURL(file);
      toast.success(`Image ${index + 1} uploaded successfully`);
    }
  };

  // Handle testimonial image upload
  const handleTestimonialImageUpload = (event) => {
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
      setTestimonialImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setTestimonialImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      toast.success("Testimonial image uploaded successfully");
    }
  };

  // Handle publish
  const handlePublish = async () => {
    if (!cultureTitle || !testimonialTitle || !testimonialText) {
      toast.error("Please fill in all required fields");
      return;
    }

    const uploadedCultureImages = cultureImages.filter(img => img !== null).length;
    if (uploadedCultureImages === 0) {
      toast.error("Please upload at least one culture image");
      return;
    }

    if (!testimonialImage) {
      toast.error("Please upload a testimonial image");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      
      // Section 1 data
      formData.append("cultureTitle", cultureTitle);
      cultureImages.forEach((image, index) => {
        if (image) {
          formData.append('cultureImages', image);
        }
      });

      // Section 2 data
      formData.append("testimonialTitle", testimonialTitle);
      formData.append("testimonialText", testimonialText);
      formData.append("testimonialImage", testimonialImage);

      const response = await axiosInstance.post(
        "/api/footer-region/update", 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success("Footer region updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update footer region");
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update footer region");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 max-[474px]:flex-col max-[474px]:items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-blue-500" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">Update Footer Region</h1>
          </div>
          <div className="flex gap-3 max-[474px]:w-full max-[474px]:mt-3">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="gap-2 max-[474px]:w-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="gap-2 max-[474px]:w-full"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? "Hide Preview" : "Preview"}
            </Button>
          </div>
        </div>

        {/* Section 1: Culture Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Our Culture Section</CardTitle>
            <CardDescription>Add title and 6 images showcasing your culture</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cultureTitle">Culture Title</Label>
                <Input
                  id="cultureTitle"
                  placeholder="Our Culture"
                  value={cultureTitle}
                  onChange={(e) => setCultureTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Culture Images (6 Pictures)</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleCultureImageUpload(index, e)}
                        />
                        {cultureImagePreview[index] ? (
                          <div className="flex flex-col items-center">
                            <img
                              src={cultureImagePreview[index]}
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
          </CardContent>
        </Card>

        {/* Section 2: Testimonial Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Testimonial Section</CardTitle>
            <CardDescription>Add testimonial title, text, and featured image</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="testimonialTitle">Testimonial Title</Label>
                  <Input
                    id="testimonialTitle"
                    placeholder="Customer Testimonial"
                    value={testimonialTitle}
                    onChange={(e) => setTestimonialTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonialText">Testimonial Text</Label>
                  <Textarea
                    id="testimonialText"
                    placeholder="Enter testimonial content..."
                    value={testimonialText}
                    onChange={(e) => setTestimonialText(e.target.value)}
                    rows={8}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Testimonial Image</Label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 h-[280px] flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleTestimonialImageUpload}
                  />
                  {testimonialImagePreview ? (
                    <div className="flex flex-col items-center w-full h-full">
                      <img
                        src={testimonialImagePreview}
                        alt="Testimonial Preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Upload className="w-12 h-12 text-gray-400" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">Upload Testimonial Image</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        {showPreview && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your footer region will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-12">
                {/* Culture Section Preview */}
                <div className="bg-[#f5f1e8] rounded-lg p-8">
                  <div className="text-center mb-8">
                    {cultureTitle ? (
                      <h2 className="text-3xl md:text-4xl font-serif text-gray-900">{cultureTitle}</h2>
                    ) : (
                      <Skeleton className="h-10 w-64 mx-auto" />
                    )}
                  </div>

                  {/* Culture Images Carousel */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        const container = document.getElementById('culture-scroll-container');
                        container.scrollBy({ left: -200, behavior: 'smooth' });
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>

                    <div
                      id="culture-scroll-container"
                      className="flex items-center justify-start gap-4 overflow-x-auto pb-4 px-12 scrollbar-hide"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {cultureImagePreview.map((preview, index) => (
                        <div
                          key={index}
                          className={`rounded-xl overflow-hidden bg-gray-200 border-2 border-gray-300 flex-shrink-0
                            ${index % 2 === 0 ? 'w-[160px] h-[160px]' : 'w-[200px] h-[200px]'}
                          `}
                        >
                          {preview ? (
                            <img src={preview} alt={`Culture ${index + 1}`} className="w-full h-full object-cover" />
                          ) : (
                            <Skeleton className="w-full h-full" />
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        const container = document.getElementById('culture-scroll-container');
                        container.scrollBy({ left: 200, behavior: 'smooth' });
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Testimonial Section Preview */}
                <div className="bg-[#FFA726] rounded-lg p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left: Text Content */}
                    <div className="text-gray-800">
                      {testimonialTitle ? (
                        <h3 className="text-2xl font-bold mb-4">{testimonialTitle}</h3>
                      ) : (
                        <Skeleton className="h-8 w-48 mb-4" />
                      )}
                      {testimonialText ? (
                        <p className="text-base leading-relaxed">{testimonialText}</p>
                      ) : (
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      )}
                    </div>

                    {/* Right: Image */}
                    <div className="flex justify-center">
                      {testimonialImagePreview ? (
                        <img
                          src={testimonialImagePreview}
                          alt="Testimonial"
                          className="w-full max-w-md h-64 object-cover rounded-2xl shadow-lg"
                        />
                      ) : (
                        <Skeleton className="w-full max-w-md h-64 rounded-2xl" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border-t border-gray-200 p-4 rounded-lg gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="inline-block w-4 h-4 rounded-full border-2 border-gray-400" />
            All changes will be saved automatically
          </div>

          {/* buttons container: stack publish below cancel for devices < 474px */}
          <div className="flex gap-3 w-full sm:w-auto max-[474px]:flex-col">
            <Button variant="outline" onClick={() => navigate(-1)} className="flex-1 sm:flex-initial max-[474px]:w-full">
              Cancel
            </Button>
            <Button 
              onClick={handlePublish} 
              disabled={loading} 
              className="gap-2 flex-1 sm:flex-initial max-[474px]:w-full max-[474px]:mt-2"
            >
              <Save className="w-4 h-4" />
              {loading ? "Publishing..." : "Publish Changes"}
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UpdateFooterRegion;
