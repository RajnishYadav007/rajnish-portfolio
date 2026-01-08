import React from 'react';
import { portfolioData } from '../data/portfolio';

const Skills = () => {
  const { skills } = portfolioData;

  // Skill categories with icons (Optional - for better organization)
  const skillCategories = {
    frontend: {
      title: "Frontend",
      icon: "💻",
      skills: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS"],
    },
    backend: {
      title: "Backend & Database",
      icon: "🗄️",
      skills: ["Node.js", "REST APIs", "MySQL", "Supabase"],
    },
    tools: {
      title: "Tools & Platforms",
      icon: "🛠️",
      skills: ["Git", "GitHub", "Vercel"],
    },
  };

  return (
    <section id="skills" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Skills & Technologies
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Technologies and tools I use to build modern web applications
            </p>
          </div>

          {/* Skills Grid - Simple Version */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-center group hover:scale-105"
              >
                <p className="text-gray-800 font-medium group-hover:text-primary transition-colors">
                  {skill}
                </p>
              </div>
            ))}
          </div>

          {/* Categorized Skills - Alternative Design */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Organized by Category
            </h3>
            
            {Object.entries(skillCategories).map(([key, category]) => (
              <div key={key} className="bg-white rounded-xl p-6 shadow-sm">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{category.icon}</span>
                  <h4 className="text-xl font-bold text-gray-900">
                    {category.title}
                  </h4>
                </div>

                {/* Category Skills */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Skills Progress Bars - Alternative Design (Optional) */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Proficiency Level
            </h3>
            
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
              {[
                { name: "React.js", level: 90 },
                { name: "JavaScript (ES6+)", level: 85 },
                { name: "Tailwind CSS", level: 90 },
                { name: "REST APIs", level: 80 },
                { name: "HTML5 & CSS3", level: 95 },
                { name: "Git & GitHub", level: 85 },
              ].map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-800 font-medium">
                      {skill.name}
                    </span>
                    <span className="text-primary font-semibold">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
