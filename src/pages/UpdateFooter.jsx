import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Save, Eye, Phone, MapPin, Mail, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UpdateFooter = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Contact Section
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  // Navigate Section
  const [navLink1, setNavLink1] = useState("");
  const [navLink2, setNavLink2] = useState("");
  const [navLink3, setNavLink3] = useState("");

  // Menu Section
  const [menuLink1, setMenuLink1] = useState("");
  const [menuLink2, setMenuLink2] = useState("");
  const [menuLink3, setMenuLink3] = useState("");

  // Follow Us Section
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");

  // Handle publish
  const handlePublish = async () => {
    if (!phone || !address || !email) {
      toast.error("Please fill in all contact details");
      return;
    }

    if (!navLink1 || !navLink2 || !navLink3) {
      toast.error("Please fill in all navigation links");
      return;
    }

    if (!menuLink1 || !menuLink2 || !menuLink3) {
      toast.error("Please fill in all menu links");
      return;
    }

    try {
      setLoading(true);

      const footerData = {
        contact: {
          phone,
          address,
          email
        },
        navigate: {
          link1: navLink1,
          link2: navLink2,
          link3: navLink3
        },
        menu: {
          link1: menuLink1,
          link2: menuLink2,
          link3: menuLink3
        },
        socialMedia: {
          facebook: facebookLink,
          instagram: instagramLink,
          linkedin: linkedinLink,
          twitter: twitterLink
        }
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/footer/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(footerData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Footer updated successfully!");
      } else {
        toast.error(data.message || "Failed to update footer");
      }

    } catch (error) {
      toast.error("Failed to update footer");
      console.error(error);
    } finally {
      setLoading(false);
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
            <h1 className="text-2xl font-semibold text-gray-800">Update Footer</h1>
          </div>
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="gap-2">
            <Eye className="w-4 h-4" />
            {showPreview ? "Hide Preview" : "Preview"}
          </Button>
        </div>

        {/* Contact Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Add phone, address, and email details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="602-774-4735"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="address"
                    placeholder="11022 South 51st Street Suite 105"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="hi@unicuisine.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigate Links Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Navigate Links</CardTitle>
            <CardDescription>Add navigation menu links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="navLink1">Link 1 (e.g., Home)</Label>
                <Input
                  id="navLink1"
                  placeholder="Home"
                  value={navLink1}
                  onChange={(e) => setNavLink1(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="navLink2">Link 2 (e.g., Menu)</Label>
                <Input
                  id="navLink2"
                  placeholder="Menu"
                  value={navLink2}
                  onChange={(e) => setNavLink2(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="navLink3">Link 3 (e.g., About)</Label>
                <Input
                  id="navLink3"
                  placeholder="About"
                  value={navLink3}
                  onChange={(e) => setNavLink3(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Links Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Menu Links</CardTitle>
            <CardDescription>Add menu-related links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="menuLink1">Link 1 (e.g., Breakfast)</Label>
                <Input
                  id="menuLink1"
                  placeholder="Breakfast"
                  value={menuLink1}
                  onChange={(e) => setMenuLink1(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="menuLink2">Link 2 (e.g., Lunch)</Label>
                <Input
                  id="menuLink2"
                  placeholder="Lunch"
                  value={menuLink2}
                  onChange={(e) => setMenuLink2(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="menuLink3">Link 3 (e.g., Dinner)</Label>
                <Input
                  id="menuLink3"
                  placeholder="Dinner"
                  value={menuLink3}
                  onChange={(e) => setMenuLink3(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Follow Us Links</CardTitle>
            <CardDescription>Add social media profile URLs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook URL</Label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="facebook"
                    placeholder="https://facebook.com/yourpage"
                    value={facebookLink}
                    onChange={(e) => setFacebookLink(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram URL</Label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="instagram"
                    placeholder="https://instagram.com/yourpage"
                    value={instagramLink}
                    onChange={(e) => setInstagramLink(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/company/yourpage"
                    value={linkedinLink}
                    onChange={(e) => setLinkedinLink(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter URL</Label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="twitter"
                    placeholder="https://twitter.com/yourpage"
                    value={twitterLink}
                    onChange={(e) => setTwitterLink(e.target.value)}
                    className="pl-10"
                  />
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
            </CardHeader>
            <CardContent>
              <div className="bg-[#f5f1e8] rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Contact Section */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-900">Contact</h3>
                    <div className="space-y-3 text-sm text-gray-700">
                      {phone ? (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{phone}</span>
                        </div>
                      ) : (
                        <Skeleton className="h-4 w-32" />
                      )}
                      {address ? (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-1" />
                          <span>{address}</span>
                        </div>
                      ) : (
                        <Skeleton className="h-4 w-40" />
                      )}
                      {email ? (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{email}</span>
                        </div>
                      ) : (
                        <Skeleton className="h-4 w-36" />
                      )}
                    </div>
                  </div>

                  {/* Navigate Section */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-900">Navigate</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      {navLink1 ? <div className="hover:text-blue-600 cursor-pointer">{navLink1}</div> : <Skeleton className="h-4 w-20" />}
                      {navLink2 ? <div className="hover:text-blue-600 cursor-pointer">{navLink2}</div> : <Skeleton className="h-4 w-20" />}
                      {navLink3 ? <div className="hover:text-blue-600 cursor-pointer">{navLink3}</div> : <Skeleton className="h-4 w-20" />}
                    </div>
                  </div>

                  {/* Menu Section */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-900">Menu</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      {menuLink1 ? <div className="hover:text-blue-600 cursor-pointer">{menuLink1}</div> : <Skeleton className="h-4 w-24" />}
                      {menuLink2 ? <div className="hover:text-blue-600 cursor-pointer">{menuLink2}</div> : <Skeleton className="h-4 w-24" />}
                      {menuLink3 ? <div className="hover:text-blue-600 cursor-pointer">{menuLink3}</div> : <Skeleton className="h-4 w-24" />}
                    </div>
                  </div>

                  {/* Follow Us Section */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-900">Follow Us</h3>
                    <div className="flex gap-3">
                      {facebookLink ? (
                        <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                          <Facebook className="w-5 h-5" />
                        </a>
                      ) : (
                        <Skeleton className="w-5 h-5 rounded-full" />
                      )}
                      {instagramLink ? (
                        <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700">
                          <Instagram className="w-5 h-5" />
                        </a>
                      ) : (
                        <Skeleton className="w-5 h-5 rounded-full" />
                      )}
                      {linkedinLink ? (
                        <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      ) : (
                        <Skeleton className="w-5 h-5 rounded-full" />
                      )}
                      {twitterLink ? (
                        <a href={twitterLink} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-600">
                          <Twitter className="w-5 h-5" />
                        </a>
                      ) : (
                        <Skeleton className="w-5 h-5 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
                  ©2025, Unified.UI | All right reserved.
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
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" onClick={() => navigate(-1)} className="flex-1 sm:flex-initial">
              Cancel
            </Button>
            <Button 
              onClick={handlePublish} 
              disabled={loading} 
              className="gap-2 flex-1 sm:flex-initial"
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

export default UpdateFooter;
