import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import JavaScript from "../assets/courses/javascript.jpg";
import reactImg from "../assets/courses/react.jpg";
import sql from "../assets/courses/sql.jpg";
import kotlin from "../assets/courses/kotlin.jpg";

// FULL demo course data structure
const coursesData = [
  {
    id: 1,
    title: "Complete JavaScript",
    thumbnail: JavaScript,
    creator: "Dr. Angela Yu",
    category: "Frontend",
    rating: 4.8,
    reviews: 1234,
    length: "68 hrs",
    modules: [
      {
        title: "Getting Started",
        lectures: [
          { name: "Welcome & Setup", duration: "10min" },
          { name: "Why JavaScript?", duration: "15min" },
          { name: "Course Overview", duration: "8min" }
        ]
      },
      {
        title: "JS Syntax",
        lectures: [
          { name: "Variables & Data Types", duration: "1hr" },
          { name: "Control Flow", duration: "48min" },
          { name: "Functions Deep Dive", duration: "1hr 12min" }
        ]
      }
    ],
    perks: ["Certificate", "Lifetime Access", "Assignments"],
    assignments: [
      {
        title: "Build a JavaScript Quiz",
        description: "Create a quiz app using JS fundamentals and DOM manipulation."
      }
    ],
    description: `Master modern JavaScript—Syntax, DOM, Events, AJAX, and more. Learn by building real-world projects and assignments. No prior experience required!`,
    requirements: [
      "No prior JavaScript knowledge required!",
      "Basic computer and web browser usage"
    ],
    instructor: {
      name: "Dr. Angela Yu",
      title: "Professional Web Developer & Instructor",
      avatar: reactImg, // Just reuse image for demo
      rating: 4.9,
      reviews: 350000,
      students: 820000,
      courses: 25,
      experience: `Over a decade teaching web development with hands-on experience building scalable applications. Passionate about making programming accessible to all.`
    },
    comments: [
      {
        user: "M N.",
        rating: 5,
        time: "a month ago",
        content: "The best teacher I have ever seen. Projects are fun and explanations are clear. Highly recommend for beginners!"
      },
      {
        user: "Calvin S.",
        rating: 4,
        time: "3 weeks ago",
        content: "Covers a lot of topics thoroughly. The assignments pushed me to really learn and apply concepts!"
      }
    ]
  },
  // Additional demo courses
  {
    id: 2,
    title: "Complete ReactJS",
    thumbnail: reactImg,
    creator: "Dr. Angela Yu",
    category: "Frontend",
    rating: 4.9,
    reviews: 987,
    length: "55 hrs",
    modules: [],
    perks: ["Certificate", "Projects"],
    assignments: [],
    description: "Complete introduction and hands-on with React, including components, hooks, context API, and more.",
    requirements: ["Basic JavaScript", "No prior React experience required"],
    instructor: {
      name: "Dr. Angela Yu",
      title: "Professional Web Developer & Instructor",
      avatar: reactImg,
      rating: 4.9,
      reviews: 350000,
      students: 820000,
      courses: 25,
      experience: "Over a decade teaching web development."
    },
    comments: []
  }
  // Repeat similar for SQL/Kotlin...
];

const course = coursesData[0];

export default function CourseDetails() {
  const [expandedModuleIdx, setExpandedModuleIdx] = useState(null);
  const similarCourses = coursesData.filter(
    (c) => c.category === course.category && c.id !== course.id
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Top: Image and summary */}
      <div className="flex flex-col md:flex-row mb-12 gap-8">
        <Card className="w-full md:w-1/3 max-h-96 flex-shrink-0 flex justify-center items-center overflow-hidden shadow-lg">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-auto object-cover rounded-lg max-h-96"
            style={{ aspectRatio: "16/9" }}
          />
        </Card>
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-3">{course.title}</h1>
          <div className="mb-2 text-gray-700">
            <span className="font-semibold">{course.creator}</span> | {course.category}
          </div>
          <div className="mb-2 text-yellow-700 font-semibold">
            ★ {course.rating} &nbsp; ({course.reviews} reviews)
          </div>
          <div className="mb-2 text-md text-gray-800">
            Length: <span className="font-bold">{course.length}</span>
          </div>
          <div className="my-3">
            {course.perks.map((perk) => (
              <span key={perk} className="bg-indigo-50 text-indigo-700 px-4 py-1 rounded-full text-sm font-semibold mr-2">{perk}</span>
            ))}
          </div>
          <Button size="lg" variant="default" className="mb-4 w-full md:w-auto">Buy this course</Button>
        </div>
      </div>
      
      {/* Description and Requirements */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className="mb-4 text-gray-700">{course.description}</p>
        <h2 className="text-xl font-bold mb-2">Requirements</h2>
        <ul className="mb-2 list-disc list-inside">
          {course.requirements.map(req => (
            <li key={req}>{req}</li>
          ))}
        </ul>
      </Card>

      {/* Instructor Details */}
      <Card className="p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
        <img 
          src={course.instructor.avatar}
          alt={course.instructor.name}
          className="rounded-full h-28 w-28 object-cover border-4 border-indigo-200 mb-3 md:mb-0"
        />
        <div>
          <div className="text-2xl font-bold mb-1">Instructor</div>
          <div className="text-indigo-700 font-semibold">{course.instructor.name}</div>
          <div className="text-gray-600 mb-2">{course.instructor.title}</div>
          <div className="mb-1">★ {course.instructor.rating} Instructor Rating</div>
          <div className="mb-1">{course.instructor.reviews.toLocaleString()} Reviews</div>
          <div className="mb-1">{course.instructor.students.toLocaleString()} Students</div>
          <div className="mb-1">{course.instructor.courses} Courses</div>
          <div className="text-gray-700 mt-2">{course.instructor.experience}</div>
        </div>
      </Card>

      {/* Modules/topics section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Course Content</h2>
        <div>
          {course.modules.map((mod, idx) => (
            <Card key={mod.title} className="mb-4">
              <div
                className="cursor-pointer flex justify-between items-center p-4"
                onClick={() =>
                  setExpandedModuleIdx(expandedModuleIdx === idx ? null : idx)
                }
              >
                <span className="font-semibold text-lg">{mod.title}</span>
                <span>{expandedModuleIdx === idx ? '▲' : '▼'}</span>
              </div>
              {expandedModuleIdx === idx && (
                <div className="bg-gray-50 p-4 rounded-b">
                  <ul className="space-y-2">
                    {mod.lectures.map((lec) => (
                      <li key={lec.name} className="flex justify-between text-sm">
                        <span>{lec.name}</span>
                        <span className="text-gray-500">{lec.duration}</span>
                      </li>
                    ))}
                  </ul>
                  {mod.assignment && (
                    <div className="mt-4 p-3 bg-indigo-50 rounded">
                      <span className="block font-bold mb-1 text-indigo-700">Assignment</span>
                      <span className="text-gray-700">{mod.assignment}</span>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Assignments section */}
      {!!course.assignments.length && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Assignments</h2>
          <div className="space-y-3">
            {course.assignments.map((a) => (
              <Card key={a.title} className="p-4">
                <h3 className="text-lg font-semibold mb-1">{a.title}</h3>
                <p className="text-gray-700">{a.description}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Ratings & Comments */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          ★ {course.rating} course rating • {course.reviews.toLocaleString()} ratings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.comments.map((comm, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-center mb-2">
                <span className="rounded-full bg-indigo-600 text-white px-4 py-2 mr-3 font-bold">
                  {comm.user[0]}
                </span>
                <span className="font-semibold">{comm.user}</span>
                <span className="ml-auto text-yellow-700">★ {comm.rating}</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">{comm.time}</div>
              <div className="text-gray-700">{comm.content}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Similar Courses */}
      <section>
        <h2 className="text-2xl font-bold mb-6">More {course.category} Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarCourses.length ? similarCourses.map(course => (
            <Card key={course.id} className="p-4 flex flex-col items-stretch shadow-md">
              <img src={course.thumbnail} alt={course.title} className="rounded h-32 mb-3 object-cover w-full" />
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4">By {course.creator}</p>
              <Button variant="outline" className="mt-auto">View Details</Button>
            </Card>
          )) : <p>No similar courses available.</p>}
        </div>
      </section>
    </div>
  );
}
