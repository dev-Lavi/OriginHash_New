import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// Enhanced Video Player Component
const VideoPlayer = ({ videoUrl, title, onClose }) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const fullVideoUrl = videoUrl?.startsWith('http') ? videoUrl : `${baseURL}${videoUrl}`;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-800 ml-4">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <CloseIcon />
          </button>
        </div>
        
        <div className="p-6 bg-gray-900">
          <video 
            controls 
            width="100%" 
            height="500"
            preload="metadata"
            className="rounded-xl shadow-lg"
            onError={(e) => {
              console.error('Video playback error:', e);
              alert('Error playing video. Please check if the file exists.');
            }}
          >
            <source src={fullVideoUrl} type="video/mp4" />
            <source src={fullVideoUrl} type="video/webm" />
            <source src={fullVideoUrl} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

// Enhanced Icon Components
const CloseIcon = () => (
  <svg className="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const VideoIcon = () => (
  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707a1 1 0 00.707.293H15a2 2 0 012 2v3a2 2 0 01-2 2H9a2 2 0 01-2-2v-3a2 2 0 012-2zm6-8a4 4 0 00-8 0v2h8V2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707a1 1 0 00.707.293H15a2 2 0 012 2v3a2 2 0 01-2 2H9a2 2 0 01-2-2v-3a2 2 0 012-2zm6-8a4 4 0 00-8 0v2h8V2z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ChevronIcon = ({ isExpanded }) => (
  <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const ModuleIcon = () => (
  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

export default function ModulesPage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({ url: '', title: '' });
  const [currentModuleId, setCurrentModuleId] = useState(null);
  const [lessonForm, setLessonForm] = useState({
    title: "",
    duration: "",
    videoFile: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch modules from backend
  useEffect(() => {
    if (courseId) {
      fetchModules();
    }
  }, [courseId]);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/course/modules/fetchCourseDetails/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setModules(data.modules || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching modules:", error);
      setLoading(false);
      setModules([]);
    }
  };

  const toggleModule = (moduleId) => {
    setModules(
      modules.map((module) =>
        module._id === moduleId
          ? { ...module, isExpanded: !module.isExpanded }
          : module
      )
    );
  };

  const handleAddModule = async (courseId) => {
    const newModule = {
      title: `Module ${modules.length + 1}: New Module`,
      lessonCount: 0,
      isExpanded: true,
      lessons: [],
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/course/addModules/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newModule),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdModule = await response.json();
      setModules((prevModules) => [...prevModules, createdModule]);
    } catch (error) {
      console.error("Error creating module:", error);
      const tempModule = {
        ...newModule,
        _id: Date.now(),
        id: Date.now(),
      };
      setModules((prevModules) => [...prevModules, tempModule]);
    }
  };

  const deleteModule = async (moduleId) => {
    if (!confirm("Are you sure you want to delete this module and all its lessons?")) return;

    try {
      const token = localStorage.getItem("token");
      const moduleElement = document.querySelector(`[data-module-id="${moduleId}"]`);
      if (moduleElement) {
        moduleElement.style.opacity = '0.5';
        moduleElement.style.pointerEvents = 'none';
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/course/${courseId}/module/${moduleId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          }
        }
      );

      if (response.ok) {
        setModules((prevModules) => prevModules.filter((m) => m._id !== moduleId));
        alert("Module and all its lessons deleted successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete module");
      }
    } catch (error) {
      console.error("Error deleting module:", error);
      
      const moduleElement = document.querySelector(`[data-module-id="${moduleId}"]`);
      if (moduleElement) {
        moduleElement.style.opacity = '1';
        moduleElement.style.pointerEvents = 'auto';
      }
      
      alert(`Failed to delete module: ${error.message}`);
    }
  };

  const openLessonModal = (moduleId) => {
    setCurrentModuleId(moduleId);
    setShowLessonModal(true);
    setLessonForm({ title: "", duration: "", videoFile: null });
    setUploadProgress(0);
    setIsUploading(false);
  };

  const closeLessonModal = () => {
    setShowLessonModal(false);
    setCurrentModuleId(null);
    setLessonForm({ title: "", duration: "", videoFile: null });
    setUploadProgress(0);
    setIsUploading(false);
  };

  const openVideoPlayer = (videoUrl, title) => {
    setCurrentVideo({ url: videoUrl, title });
    setShowVideoPlayer(true);
  };

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false);
    setCurrentVideo({ url: '', title: '' });
  };

  const handleVideoFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        alert("Please select a valid video file");
        return;
      }

      const maxSize = 500 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size too large. Maximum allowed is 500MB");
        return;
      }

      setLessonForm((prev) => ({
        ...prev,
        videoFile: file,
      }));
    }
  };

  const handleLessonFormChange = (field, value) => {
    setLessonForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addLesson = async () => {
    if (!lessonForm.title.trim() || !lessonForm.duration.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    if (!lessonForm.videoFile) {
      alert("Please upload a video file");
      return;
    }

    if (!currentModuleId || !courseId) {
      alert("Module ID or Course ID is missing");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      const formData = new FormData();
      formData.append('videoFile', lessonForm.videoFile);
      formData.append('title', lessonForm.title);
      formData.append('duration', lessonForm.duration);
      formData.append('type', 'video');
      formData.append('courseId', courseId);

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/course/module/addLesson/${currentModuleId}`,
        {
          method: 'POST',
          body: formData
        }
      );
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const createdLesson = await response.json();

      setModules(prevModules => prevModules.map(module => 
        module._id === currentModuleId 
          ? { 
              ...module, 
              lessons: [...(module.lessons || []), createdLesson],
              lessonCount: (module.lessonCount || 0) + 1
            }
          : module
      ));

      setIsUploading(false);
      closeLessonModal();
      alert('Lesson added successfully!');
    } catch (error) {
      console.error('Error creating lesson:', error);
      setIsUploading(false);
      alert(`Failed to add lesson: ${error.message}`);
    }
  };

  const deleteLesson = async (moduleId, lessonId) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/course/module/${moduleId}/lesson/${lessonId}`,
        {
          method: 'DELETE'
        }
      );

      if (response.ok) {
        setModules(
          modules.map((module) =>
            module._id === moduleId
              ? {
                  ...module,
                  lessons: (module.lessons || []).filter(
                    (lesson) => lesson._id !== lessonId
                  ),
                  lessonCount: Math.max(0, (module.lessonCount || 0) - 1),
                }
              : module
          )
        );
        alert('Lesson deleted successfully!');
      } else {
        throw new Error('Failed to delete lesson');
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
      alert('Failed to delete lesson. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading course modules...</p>
          <p className="text-sm text-gray-400 mt-2">Please wait while we fetch your content</p>
        </div>
      </div>
    );
  }

  if (!courseId) {
    return (
      <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Course Not Found</h3>
          <p className="text-gray-600 mb-4">The course ID is missing or invalid.</p>
          <p className="text-sm text-gray-500">Please make sure you're accessing this page from a valid course link.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <div className="flex items-center gap-3">
                  <ModuleIcon />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">Course Modules</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your course content and lessons</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleAddModule(courseId)}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Module
              </span>
            </button>
          </div>
        </div>

        {modules.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ModuleIcon />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No modules yet</h3>
            <p className="text-gray-600 mb-6">Start building your course by adding your first module.</p>
            <button
              onClick={() => handleAddModule(courseId)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
            >
              Create First Module
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {modules.map((module, moduleIndex) => (
              <div
                key={module._id}
                data-module-id={module._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {moduleIndex + 1}
                      </div>
                      <button
                        onClick={() => toggleModule(module._id)}
                        className="flex items-center gap-3 hover:bg-white/50 p-2 rounded-lg transition-colors duration-200"
                      >
                        <ChevronIcon isExpanded={module.isExpanded} />
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-800 text-lg">
                            {module.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {module.lessonCount || 0} lessons
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openLessonModal(module._id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Lesson
                    </button>
                    
                    <button
                      onClick={() => deleteModule(module._id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete Module"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>

                {module.isExpanded && (
                  <div className="divide-y divide-gray-100">
                    {(module.lessons || []).length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <VideoIcon />
                        </div>
                        <p className="text-gray-500 mb-4">No lessons in this module yet</p>
                        <button
                          onClick={() => openLessonModal(module._id)}
                          className="px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 font-medium"
                        >
                          Add Your First Lesson
                        </button>
                      </div>
                    ) : (
                      (module.lessons || []).map((lesson, index) => (
                        <div
                          key={lesson._id || index}
                          className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <VideoIcon />
                              <div>
                                <h4 className="font-medium text-gray-800">
                                  {lesson.title}
                                </h4>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                    {lesson.duration}
                                  </span>
                                  {lesson.videoUrl && (
                                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                      ✓ Video Available
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button 
                              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              title="Edit Lesson"
                            >
                              <EditIcon />
                            </button>
                            {lesson.videoUrl && (
                              <button 
                                onClick={() => openVideoPlayer(lesson.videoUrl, lesson.title)}
                                className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-all duration-200"
                                title="Play Video"
                              >
                                <PlayIcon />
                              </button>
                            )}
                            <button
                              onClick={() => deleteLesson(module._id, lesson._id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                              title="Delete Lesson"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Add Lesson Modal */}
      {/* {showLessonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Add New Lesson</h2>
                    <p className="text-sm text-gray-500">Create engaging content for your students</p>
                  </div>
                </div>
                <button
                  onClick={closeLessonModal}
                  className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  value={lessonForm.title}
                  onChange={(e) => handleLessonFormChange("title", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter an engaging lesson title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  value={lessonForm.duration}
                  onChange={(e) => handleLessonFormChange("duration", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="e.g., 15:30 or 25 minutes"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Video Content *
                </label>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer group">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoFileChange}
                      className="hidden"
                      id="videoUpload"
                    />

                    {!lessonForm.videoFile ? (
                      <label htmlFor="videoUpload" className="cursor-pointer">
                        <div className="group-hover:scale-110 transition-transform duration-300">
                          <UploadIcon />
                        </div>
                        <h4 className="mt-4 text-lg font-semibold text-gray-700">
                          Upload Video File
                        </h4>
                        <p className="mt-2 text-sm text-gray-600">
                          <span className="font-medium text-blue-600 hover:text-blue-500">
                            Click to browse
                          </span>{" "}
                          or drag and drop your video
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Supports MP4, AVI, MOV • Max size: 500MB
                        </p>
                      </label>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-800">
                              {lessonForm.videoFile.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {(lessonForm.videoFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setLessonForm((prev) => ({ ...prev, videoFile: null }))}
                          className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          Remove file
                        </button>
                      </div>
                    )}
                  </div>

                  {isUploading && (
                    <div className="bg-blue-50 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="font-medium text-blue-800">Uploading video...</span>
                        </div>
                        <span className="font-bold text-blue-600">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button
                onClick={closeLessonModal}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                onClick={addLesson}
                disabled={isUploading || !lessonForm.videoFile || !lessonForm.title.trim() || !lessonForm.duration.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600"
              >
                {isUploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </span>
                ) : (
                  "Create Lesson"
                )}
              </button>
            </div>
          </div>
        </div>
      )} */}

{showLessonModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 backdrop-blur-sm">
    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[95vh] overflow-hidden shadow-2xl mx-2 sm:mx-4 flex flex-col">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Add New Lesson</h2>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Create engaging content for your students</p>
            </div>
          </div>
          <button
            onClick={closeLessonModal}
            className="p-1.5 sm:p-2 hover:bg-white/50 rounded-lg transition-colors duration-200 flex-shrink-0"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lesson Title *
          </label>
          <input
            type="text"
            value={lessonForm.title}
            onChange={(e) => handleLessonFormChange("title", e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
            placeholder="Enter an engaging lesson title"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Duration *
          </label>
          <input
            type="text"
            value={lessonForm.duration}
            onChange={(e) => handleLessonFormChange("duration", e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
            placeholder="e.g., 15:30 or 25 minutes"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Video Content *
          </label>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer group">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
                className="hidden"
                id="videoUpload"
              />

              {!lessonForm.videoFile ? (
                <label htmlFor="videoUpload" className="cursor-pointer block">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h4 className="mt-2 sm:mt-4 text-base sm:text-lg font-semibold text-gray-700">
                    Upload Video File
                  </h4>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      Click to browse
                    </span>{" "}
                    <span className="hidden sm:inline">or drag and drop your video</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="block sm:inline">Supports MP4, AVI, MOV</span>
                    <span className="block sm:inline sm:before:content-['•'] sm:before:mx-1">Max size: 500MB</span>
                  </p>
                </label>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <p className="font-medium text-gray-800 truncate text-sm sm:text-base">
                        {lessonForm.videoFile.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {(lessonForm.videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLessonForm((prev) => ({ ...prev, videoFile: null }))}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    Remove file
                  </button>
                </div>
              )}
            </div>

            {isUploading && (
              <div className="bg-blue-50 rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-medium text-blue-800">Uploading video...</span>
                  </div>
                  <span className="font-bold text-blue-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-1.5 sm:h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Fixed */}
      <div className="flex-shrink-0 p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          onClick={closeLessonModal}
          className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium text-sm sm:text-base order-2 sm:order-1"
          disabled={isUploading}
        >
          Cancel
        </button>
        <button
          onClick={addLesson}
          disabled={isUploading || !lessonForm.videoFile || !lessonForm.title.trim() || !lessonForm.duration.trim()}
          className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600 text-sm sm:text-base order-1 sm:order-2"
        >
          {isUploading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Uploading...
            </span>
          ) : (
            "Create Lesson"
          )}
        </button>
      </div>
    </div>
  </div>
)}

      {/* Enhanced Video Player Modal */}
      {showVideoPlayer && (
        <VideoPlayer 
          videoUrl={currentVideo.url} 
          title={currentVideo.title} 
          onClose={closeVideoPlayer}
        />
      )}
    </div>
  );
}