import React, { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import JavaScript from "../assets/courses/javascript.jpg";
import reactImg from "../assets/courses/react.jpg";
import sql from "../assets/courses/sql.jpg";
import kotlin from "../assets/courses/kotlin.jpg";
import styles from './Dashboard.module.css';

// Example course categories
const categories = ["All", "Frontend", "Backend", "Mobile", "Database"];

const mockCourses = [
  { id: 1, title: 'Complete JavaScript', thumbnail: JavaScript, creator: 'Dr. Angela Yu', category: 'Frontend', rating: 4.8, reviews: 1234 },
  { id: 2, title: 'Complete ReactJS', thumbnail: reactImg, creator: 'Dr. Angela Yu', category: 'Frontend', rating: 4.9, reviews: 987 },
  { id: 3, title: 'Complete SQL', thumbnail: sql, creator: 'Dr. Angela Yu', category: 'Database', rating: 4.7, reviews: 2341 },
  { id: 4, title: 'Complete Kotlin', thumbnail: kotlin, creator: 'Dr. Angela Yu', category: 'Mobile', rating: 4.9, reviews: 1567 }
];

function FilterPanel({ selectedCategory, setSelectedCategory, minRating, setMinRating }) {
  return (
    <div className="w-64 space-y-6 p-4 border-r bg-gray-50">
      <div>
        <label className="block font-bold mb-1">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <Card className="p-4 flex flex-col items-stretch h-full">
      <img src={course.thumbnail} alt={course.title} className="rounded h-32 object-cover mb-2" />
      <h4 className="font-bold mt-2">{course.title}</h4>
      <span className="text-sm text-gray-500 mb-1">{course.creator}</span>
      <span className="text-xs text-indigo-600 mb-1">{course.category}</span>
      <div className="flex items-center space-x-2">
        <span>{"★".repeat(Math.floor(course.rating))}</span>
        <span className="text-sm text-gray-400">({course.reviews})</span>
      </div>
      <Button className="mt-2" variant="default">Know more</Button>
    </Card>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredCourses = useMemo(
    () =>
      courses.filter(
        (course) =>
          (selectedCategory === "All" || course.category === selectedCategory) &&
          course.rating >= minRating
      ),
    [courses, selectedCategory, minRating]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-8 max-w-7xl mx-auto">
        {/* Header and Filters on one row */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-3xl font-bold">Explore Our Courses</h2>
            <p className="text-gray-600 mt-1">Browse, filter, and find your next skill!</p>
          </div>
          <div className="flex space-x-4">
            {/* Category filter */}
            <div className="w-48">
              <label className="block font-bold mb-1">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Minimum rating filter */}
            <div className="w-48">
              <label className="block font-bold mb-1">Minimum Rating</label>
              <Input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                placeholder="Min rating"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="p-4 animate-pulse flex flex-col">
                  <Skeleton className="h-32 rounded mb-2" />
                  <Skeleton className="h-6 w-2/3 mb-1" />
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </Card>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-full text-xl text-gray-500 flex items-center my-16">
                No courses found for selected filters.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

