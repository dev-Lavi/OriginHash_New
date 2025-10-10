import React, { useEffect, useState } from "react";
import { ArrowLeft, Play, Clock, BookOpen, Users, Calendar, Video } from "lucide-react";
import { useParams } from "react-router-dom";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeModule, setActiveModule] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/course/modules/fetchCourseDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        console.log(data);
        // Set the first lesson as selected if available
        if (data.modules && data.modules.length > 0 && data.modules[0].lessons && data.modules[0].lessons.length > 0) {
          setSelectedLesson(data.modules[0].lessons[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTotalLessons = () => {
    return course.modules.reduce((total, module) => total + module.lessonCount, 0);
  };

  const getTotalDuration = () => {
    let totalMinutes = 0;
    course.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        totalMinutes += parseInt(lesson.duration) || 0;
      });
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-600 mt-1">{course.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-2 text-blue-600 mb-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm font-medium">Modules</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{course.modules.length}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-2 text-green-600 mb-2">
                  <Video className="w-5 h-5" />
                  <span className="text-sm font-medium">Lessons</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{getTotalLessons()}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-2 text-purple-600 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{getTotalDuration()}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-2 text-orange-600 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">Created</span>
                </div>
                <p className="text-sm font-bold text-gray-900">{formatDate(course.createdAt)}</p>
              </div>
            </div>

            {/* Video Player */}
            {selectedLesson && (
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="aspect-video bg-black">
                  <video
                    controls
                    className="w-full h-full"
                    src={`${import.meta.env.VITE_BACKEND_URL}${selectedLesson.videoUrl}`}
                    poster={course.thumbnail ? `${import.meta.env.VITE_BACKEND_URL}${course.thumbnail}` : undefined}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedLesson.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedLesson.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Video className="w-4 h-4" />
                      <span className="capitalize">{selectedLesson.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Course Modules */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Course Content</h2>
              </div>
              
              {course.modules.length === 0 ? (
                <div className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No modules available in this course.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={module._id} className="p-6">
                      <button
                        onClick={() => setActiveModule(activeModule === moduleIndex ? -1 : moduleIndex)}
                        className="w-full flex items-center justify-between text-left hover:text-blue-600 transition-colors"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {module.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {module.lessonCount} lesson{module.lessonCount !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className={`transform transition-transform ${activeModule === moduleIndex ? 'rotate-90' : ''}`}>
                          <Play className="w-5 h-5" />
                        </div>
                      </button>

                      {activeModule === moduleIndex && (
                        <div className="mt-4 space-y-2">
                          {module.lessons.length === 0 ? (
                            <p className="text-gray-500 text-sm ml-4">No lessons in this module.</p>
                          ) : (
                            module.lessons.map((lesson, lessonIndex) => (
                              <button
                                key={lesson._id || lessonIndex}
                                onClick={() => setSelectedLesson(lesson)}
                                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                                  selectedLesson === lesson 
                                    ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                                    : 'hover:bg-gray-50'
                                }`}
                              >
                                <div className="flex-shrink-0">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    selectedLesson === lesson ? 'bg-blue-600' : 'bg-gray-200'
                                  }`}>
                                    <Play className={`w-4 h-4 ${
                                      selectedLesson === lesson ? 'text-white' : 'text-gray-600'
                                    }`} />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">{lesson.title}</p>
                                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    <span>{lesson.duration} min</span>
                                    <span className="capitalize">• {lesson.type}</span>
                                  </div>
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Thumbnail */}
            {course.thumbnail && (
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${course.thumbnail}`}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

            {/* Course Details */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Created by:</span>
                  <p className="text-sm text-gray-900">{course.createdBy?.username || 'Unknown'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Created on:</span>
                  <p className="text-sm text-gray-900">{formatDate(course.createdAt)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Last updated:</span>
                  <p className="text-sm text-gray-900">{formatDate(course.updatedAt)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Version:</span>
                  <p className="text-sm text-gray-900">v{course.__v}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





