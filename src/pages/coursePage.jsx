import React, { useEffect, useState } from "react";
import { Search, Grid, List, BookOpen, Clock, Users, Star, Calendar, Play, ArrowRight, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AvailableCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

useEffect(() => {
  setLoading(true);
  
  // Get token from localStorage
  const token = localStorage.getItem("authToken");
  
  // Create headers object with Authorization
  const headers = {
    'Content-Type': 'application/json'
  };
  
  // Add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Make the API call with authentication
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/courses`, {
    method: 'GET',
    headers: headers,
    credentials: 'include' // Include credentials if needed
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      setCourses(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('API Error:', err);
      setLoading(false);
      // Mock data for demo purposes (your existing fallback data)
      setCourses([
        {
          _id: '1',
          title: 'Advanced Digital Marketing',
          description: 'Master digital marketing strategies with advanced techniques and tools for modern businesses.',
          thumbnail: '/uploads/images/marketing.jpg',
          createdAt: '2024-08-10T10:00:00Z',
          modules: [{}, {}],
          studentsEnrolled: 245,
          rating: 4.8,
          price: 89,
          category: 'Marketing'
        },
        {
          _id: '2',
          title: 'React Development Masterclass',
          description: 'Complete guide to building modern web applications with React, hooks, and best practices.',
          thumbnail: '/uploads/images/react.jpg',
          createdAt: '2024-08-08T14:30:00Z',
          modules: [{}, {}, {}],
          studentsEnrolled: 189,
          rating: 4.9,
          price: 129,
          category: 'Development'
        },
        {
          _id: '3',
          title: 'UI/UX Design Fundamentals',
          description: 'Learn the principles of user interface and user experience design for digital products.',
          thumbnail: '/uploads/images/design.jpg',
          createdAt: '2024-08-05T09:15:00Z',
          modules: [{}],
          studentsEnrolled: 156,
          rating: 4.7,
          price: 79,
          category: 'Design'
        },
        {
          _id: '4',
          title: 'Python for Data Science',
          description: 'Learn Python programming for data analysis, visualization, and machine learning applications.',
          thumbnail: '/uploads/images/python.jpg',
          createdAt: '2024-08-03T11:20:00Z',
          modules: [{}, {}, {}, {}],
          studentsEnrolled: 298,
          rating: 4.6,
          price: 99,
          category: 'Development'
        }
      ]);
    });
}, []);


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const categories = ['all', ...new Set(courses.map(course => course.category || 'Other'))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    let matchesFilter = true;
    if (selectedFilter === 'popular') {
      matchesFilter = (course.studentsEnrolled || 0) > 200;
    } else if (selectedFilter === 'new') {
      const isNew = new Date(course.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      matchesFilter = isNew;
    } else if (selectedFilter === 'top-rated') {
      matchesFilter = (course.rating || 0) >= 4.8;
    }
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-sm">
                  <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredCourses.map((course) => (
        <div
          key={course._id}
          className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
          onClick={() => navigate(`/course/${course._id}`)}
        >
          {/* Course Thumbnail */}
          <div className="relative overflow-hidden rounded-t-xl">
            <img
              src={course.thumbnail ? `${import.meta.env.VITE_BACKEND_URL}${course.thumbnail}` : 'https://via.placeholder.com/400x200?text=Course+Image'}
              alt={course.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white rounded-full p-4">
                  <Play className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>
            {/* Price Badge */}
            {course.price && (
              <div className="absolute top-3 left-3">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ${course.price}
                </span>
              </div>
            )}
            {/* Category Badge */}
            <div className="absolute top-3 right-3">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {course.category || 'Course'}
              </span>
            </div>
          </div>

          {/* Course Content */}
          <div className="p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {course.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {course.description}
            </p>

            {/* Rating */}
            {course.rating && (
              <div className="flex items-center space-x-1 mb-3">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.floor(course.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">{course.rating}</span>
                <span className="text-sm text-gray-500">({course.studentsEnrolled} students)</span>
              </div>
            )}

            {/* Course Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{course.modules?.length || 0} modules</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{course.studentsEnrolled || 0}</span>
              </div>
            </div>

            {/* Enroll Button */}
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 group"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/course/${course._id}`);
              }}
            >
              <span>View Course</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {filteredCourses.map((course) => (
        <div
          key={course._id}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
          onClick={() => navigate(`/course/${course._id}`)}
        >
          <div className="p-6">
            <div className="flex items-center space-x-6">
              {/* Course Thumbnail */}
              <div className="flex-shrink-0 relative">
                <img
                  src={course.thumbnail ? `${import.meta.env.VITE_BACKEND_URL}${course.thumbnail}` : 'https://via.placeholder.com/120x80?text=Course'}
                  alt={course.title}
                  className="w-32 h-20 object-cover rounded-lg"
                />
                {course.price && (
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      ${course.price}
                    </span>
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-900 truncate pr-4">
                    {course.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0">
                    {course.category || 'Course'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {course.description}
                </p>

                {/* Rating */}
                {course.rating && (
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(course.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{course.rating}</span>
                    <span className="text-sm text-gray-500">({course.studentsEnrolled} students)</span>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.modules?.length || 0} modules</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.studentsEnrolled || 0} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(course.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0">
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/course/${course._id}`);
                  }}
                >
                  <span>View Course</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Courses</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover and enroll in our comprehensive collection of courses designed to help you learn and grow
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{courses.length}</p>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {courses.reduce((total, course) => total + (course.studentsEnrolled || 0), 0)}
              </p>
              <p className="text-sm font-medium text-gray-600">Students Learning</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-3">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">4.8</p>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
              <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">24/7</p>
              <p className="text-sm font-medium text-gray-600">Access</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>

              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Courses</option>
                <option value="popular">Popular</option>
                <option value="new">New</option>
                <option value="top-rated">Top Rated</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          </div>
        </div>

        {/* Course Content */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search terms or filters to find what you're looking for
            </p>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? <GridView /> : <ListView />}
          </>
        )}
      </div>
    </div>
  );
}
