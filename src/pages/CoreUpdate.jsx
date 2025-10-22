import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Upload, Plus, Trash2, Eye, UtensilsCrossed } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuSelection from "@/components/MenuSelection";
import axiosInstance from "@/api/axiosInstance";

const CoreDetailsUpdate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // New states for menu count and active tab
  const [menuCount, setMenuCount] = useState(0);
  const [activeTab, setActiveTab] = useState("menu-1");
  const [menuData, setMenuData] = useState([]);

  // Function to handle menu count submission
  const handleMenuCountSubmit = (count) => {
    setMenuCount(count);
    const initialData = Array(count).fill(null).map((_, index) => ({
      id: `menu-${index + 1}`,
      coreTitle: "",
      sno: "",
      menuItems: [
        { 
          id: 1, 
          picture: null, 
          picturePreview: null, 
          name: "", 
          details: "", 
          price: "" 
        }
      ]
    }));
    setMenuData(initialData);
    setActiveTab("menu-1");
  };

  // Handle image upload for specific menu
  const handleImageUpload = (menuId, itemIndex, event) => {
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

      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedMenuData = menuData.map(menu => {
          if (menu.id === menuId) {
            const updatedItems = [...menu.menuItems];
            updatedItems[itemIndex].picture = file;
            updatedItems[itemIndex].picturePreview = e.target.result;
            return { ...menu, menuItems: updatedItems };
          }
          return menu;
        });
        setMenuData(updatedMenuData);
        toast.success("Image uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new menu row to specific menu
  const addNewRow = (menuId) => {
    const updatedMenuData = menuData.map(menu => {
      if (menu.id === menuId) {
        const newItem = {
          id: menu.menuItems.length + 1,
          picture: null,
          picturePreview: null,
          name: "",
          details: "",
          price: ""
        };
        return { ...menu, menuItems: [...menu.menuItems, newItem] };
      }
      return menu;
    });
    setMenuData(updatedMenuData);
    toast.info("New row added");
  };

  // Delete menu row from specific menu
  const deleteRow = (menuId, itemIndex) => {
    const currentMenu = menuData.find(m => m.id === menuId);
    if (currentMenu.menuItems.length === 1) {
      toast.warning("At least one menu item is required");
      return;
    }

    const updatedMenuData = menuData.map(menu => {
      if (menu.id === menuId) {
        const updatedItems = menu.menuItems.filter((_, i) => i !== itemIndex);
        return { ...menu, menuItems: updatedItems };
      }
      return menu;
    });
    setMenuData(updatedMenuData);
    toast.success("Row deleted");
  };

  // Update menu item field for specific menu
  const updateMenuItem = (menuId, itemIndex, field, value) => {
    const updatedMenuData = menuData.map(menu => {
      if (menu.id === menuId) {
        const updatedItems = [...menu.menuItems];
        updatedItems[itemIndex][field] = value;
        return { ...menu, menuItems: updatedItems };
      }
      return menu;
    });
    setMenuData(updatedMenuData);
  };

  // Handle update/publish
  const handleUpdate = async () => {
    const currentMenu = menuData.find(menu => menu.id === activeTab);
    if (!currentMenu.coreTitle || !currentMenu.sno) {
      toast.error("Please fill in Core Title and SNO");
      return;
    }

    const incompleteItems = currentMenu.menuItems.filter(
      item => !item.name || !item.details || !item.price || !item.picture
    );

    if (incompleteItems.length > 0) {
      toast.error("Please complete all menu item fields");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("coreTitle", currentMenu.coreTitle);
      formData.append("sno", currentMenu.sno);

      const menuItemsData = currentMenu.menuItems.map(item => ({
        name: item.name,
        details: item.details,
        price: item.price
      }));

      formData.append("menuItems", JSON.stringify(menuItemsData));

      currentMenu.menuItems.forEach((item, index) => {
        if (item.picture) {
          formData.append(`menuItems[${index}][picture]`, item.picture);
        }
      });

      const response = await axiosInstance.post(
        "/api/core-menu/update",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success("Menu updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update menu");
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        {menuCount === 0 ? (
          <MenuSelection onSubmit={handleMenuCountSubmit} />
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                Core Details Update and Menu Creation
              </h1>
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? "Hide Preview" : "Preview"}
              </Button>
            </div>

            {/* Tabs for Menu Selection */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                {menuData.map((menu, index) => (
                  <TabsTrigger key={menu.id} value={menu.id}>
                    Menu {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>

              {menuData.map((menu, menuIndex) => (
                <TabsContent key={menu.id} value={menu.id}>
                  {/* Core Details Section */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Core Details - Menu {menuIndex + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor={`coreTitle-${menu.id}`}>Core Title</Label>
                          <Input
                            id={`coreTitle-${menu.id}`}
                            placeholder="Lunch Special Menu"
                            value={menu.coreTitle}
                            onChange={(e) => {
                              const updatedMenuData = menuData.map(m => {
                                if (m.id === menu.id) {
                                  return { ...m, coreTitle: e.target.value };
                                }
                                return m;
                              });
                              setMenuData(updatedMenuData);
                            }}
                          />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1 space-y-2">
                            <Label htmlFor={`sno-${menu.id}`}>SNO</Label>
                            <Input
                              id={`sno-${menu.id}`}
                              placeholder="LSM-001"
                              value={menu.sno}
                              onChange={(e) => {
                                const updatedMenuData = menuData.map(m => {
                                  if (m.id === menu.id) {
                                    return { ...m, sno: e.target.value };
                                  }
                                  return m;
                                });
                                setMenuData(updatedMenuData);
                              }}
                            />
                          </div>
                          <Button 
                            onClick={handleUpdate} 
                            disabled={loading} 
                            className="bg-teal-700 hover:bg-teal-800 w-full sm:w-auto mt-2 sm:mt-8"
                          >
                            {loading ? "Updating..." : "Update"}
                          </Button>
                        </div>
                      </div>

                      {/* Menu Items Section */}
                      <div className="mt-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                          <h3 className="text-lg font-semibold">Menu Items</h3>
                          <Button onClick={() => addNewRow(menu.id)} variant="outline" className="w-full sm:w-auto gap-2">
                            <Plus className="w-4 h-4" />
                            Add New Row
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {menu.menuItems.map((item, itemIndex) => (
                            <Card key={item.id}>
                              <CardContent className="p-4">
                                {/* Mobile View */}
                                <div className="block sm:hidden">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem value={`item-${itemIndex}`}>
                                      <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-2">
                                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                                            {item.picturePreview ? (
                                              <img
                                                src={item.picturePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                              />
                                            ) : (
                                              <div className="flex items-center justify-center h-full">
                                                <Upload className="w-4 h-4 text-gray-400" />
                                              </div>
                                            )}
                                          </div>
                                          <span className="font-medium">{item.name || 'New Item'}</span>
                                        </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <div className="space-y-4 pt-4">
                                          <div>
                                            <Label className="text-xs text-gray-500 mb-2 block">Picture</Label>
                                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-teal-500 transition-colors cursor-pointer bg-white h-32 flex items-center justify-center">
                                              <input
                                                type="file"
                                                accept="image/png,image/jpeg,image/jpg"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={(e) => handleImageUpload(menu.id, itemIndex, e)}
                                              />
                                              {item.picturePreview ? (
                                                <img
                                                  src={item.picturePreview}
                                                  alt="Preview"
                                                  className="w-full h-full object-cover rounded"
                                                />
                                              ) : (
                                                <div className="text-center">
                                                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                                  <p className="text-xs text-gray-500">Upload</p>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                          <div>
                                            <Label className="text-xs text-gray-500 mb-2 block">Name</Label>
                                            <Input
                                              placeholder="Crispy Chicken Poblano"
                                              value={item.name}
                                              onChange={(e) => updateMenuItem(menu.id, itemIndex, "name", e.target.value)}
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-xs text-gray-500 mb-2 block">Details</Label>
                                            <Input
                                              placeholder="Beef, chicken, turkey"
                                              value={item.details}
                                              onChange={(e) => updateMenuItem(menu.id, itemIndex, "details", e.target.value)}
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-xs text-gray-500 mb-2 block">Price</Label>
                                            <div className="flex gap-2">
                                              <Input
                                                placeholder="$123"
                                                value={item.price}
                                                onChange={(e) => updateMenuItem(menu.id, itemIndex, "price", e.target.value)}
                                                className="flex-1"
                                              />
                                              <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => deleteRow(menu.id, itemIndex)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                              >
                                                <Trash2 className="w-4 h-4" />
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                </div>

                                {/* Desktop View */}
                                <div className="hidden sm:block">
                                  <div className="grid grid-cols-12 gap-4 items-start">
                                    <div className="col-span-12 md:col-span-2">
                                      <Label className="text-xs text-gray-500 mb-2 block">Picture</Label>
                                      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-teal-500 transition-colors cursor-pointer bg-white h-24 flex items-center justify-center">
                                        <input
                                          type="file"
                                          accept="image/png,image/jpeg,image/jpg"
                                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                          onChange={(e) => handleImageUpload(menu.id, itemIndex, e)}
                                        />
                                        {item.picturePreview ? (
                                          <img
                                            src={item.picturePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded"
                                          />
                                        ) : (
                                          <div className="text-center">
                                            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                            <p className="text-xs text-gray-500">Upload</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-3">
                                      <Label className="text-xs text-gray-500 mb-2 block">Name</Label>
                                      <Input
                                        placeholder="Crispy Chicken Poblano"
                                        value={item.name}
                                        onChange={(e) => updateMenuItem(menu.id, itemIndex, "name", e.target.value)}
                                      />
                                    </div>
                                    <div className="col-span-12 md:col-span-4">
                                      <Label className="text-xs text-gray-500 mb-2 block">Details</Label>
                                      <Input
                                        placeholder="Beef, chicken, turkey"
                                        value={item.details}
                                        onChange={(e) => updateMenuItem(menu.id, itemIndex, "details", e.target.value)}
                                      />
                                    </div>
                                    <div className="col-span-10 md:col-span-2">
                                      <Label className="text-xs text-gray-500 mb-2 block">Price</Label>
                                      <Input
                                        placeholder="$123"
                                        value={item.price}
                                        onChange={(e) => updateMenuItem(menu.id, itemIndex, "price", e.target.value)}
                                      />
                                    </div>
                                    <div className="col-span-2 md:col-span-1 flex items-end">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteRow(menu.id, itemIndex)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        <p className="text-sm text-gray-500 mt-4">
                          Tip: Added rows will mirror below in the Result Section automatically.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            {/* Preview Section - Shows ALL Menus */}
            {showPreview && (
              <Card>
                <CardHeader>
                  <CardTitle>Preview - All Menus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-12">
                    {menuData.map((menu, menuIndex) => (
                      <div key={menu.id} className="bg-[#f5f1e8] rounded-lg p-8">
                        {/* Menu Title */}
                        <div className="text-center mb-8">
                          {menu.coreTitle ? (
                            <h2 className="text-3xl font-serif text-gray-900 mb-2">{menu.coreTitle}</h2>
                          ) : (
                            <Skeleton className="h-10 w-64 mx-auto mb-2" />
                          )}
                          {menu.sno ? (
                            <p className="text-sm text-gray-500">SNO: {menu.sno}</p>
                          ) : (
                            <Skeleton className="h-4 w-32 mx-auto" />
                          )}
                        </div>

                        {/* Menu Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {menu.menuItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-300">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                {item.picturePreview ? (
                                  <img src={item.picturePreview} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                  <Skeleton className="w-full h-full" />
                                )}
                              </div>
                              <div className="flex-1">
                                {item.name ? (
                                  <h3 className="font-semibold text-teal-700 text-base">{item.name}</h3>
                                ) : (
                                  <Skeleton className="h-5 w-40 mb-1" />
                                )}
                                {item.details ? (
                                  <p className="text-sm text-gray-500">{item.details}</p>
                                ) : (
                                  <Skeleton className="h-4 w-32" />
                                )}
                              </div>
                              <div className="flex-shrink-0">
                                {item.price ? (
                                  <span className="text-lg font-semibold text-teal-700">{item.price}</span>
                                ) : (
                                  <Skeleton className="h-6 w-12" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Book Table Button */}
                        <div className="flex justify-center mt-8">
                          <Button className="bg-teal-700 hover:bg-teal-800 gap-2">
                            <span>Book a Table</span>
                            <UtensilsCrossed className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CoreDetailsUpdate;
