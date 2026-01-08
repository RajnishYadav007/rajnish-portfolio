import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { portfolioData } from '../data/portfolio';
import { 
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaNode, FaDatabase, 
  FaGitAlt, FaGithub, FaServer 
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiMysql, SiSupabase, SiVercel 
} from 'react-icons/si';

const Skills = () => {
  const { skills } = portfolioData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = React.useState('frontend');

  // Skill categories with icons and colors
  const skillCategories = {
    frontend: {
      title: "Frontend Development",
      icon: "💻",
      gradient: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React.js", icon: FaReact, level: 90, color: "#61DAFB" },
        { name: "JavaScript (ES6+)", icon: FaJs, level: 85, color: "#F7DF1E" },
        { name: "HTML5", icon: FaHtml5, level: 95, color: "#E34F26" },
        { name: "CSS3", icon: FaCss3Alt, level: 90, color: "#1572B6" },
        { name: "Tailwind CSS", icon: SiTailwindcss, level: 90, color: "#06B6D4" },
      ],
    },
    backend: {
      title: "Backend & Database",
      icon: "🗄️",
      gradient: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", icon: FaNode, level: 75, color: "#339933" },
        { name: "REST APIs", icon: FaServer, level: 80, color: "#FF6C37" },
        { name: "MySQL", icon: SiMysql, level: 70, color: "#4479A1" },
        { name: "Supabase", icon: SiSupabase, level: 75, color: "#3ECF8E" },
      ],
    },
    tools: {
      title: "Tools & Platforms",
      icon: "🛠️",
      gradient: "from-purple-500 to-pink-500",
      skills: [
        { name: "Git", icon: FaGitAlt, level: 85, color: "#F05032" },
        { name: "GitHub", icon: FaGithub, level: 85, color: "#181717" },
        { name: "Vercel", icon: SiVercel, level: 80, color: "#000000" },
      ],
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="section-padding bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" ref={ref}>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Skills & <span className="text-gradient bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Technologies</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Technologies and tools I use to build modern, scalable web applications
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-4 mb-12 flex-wrap"
          >
            {Object.entries(skillCategories).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === key
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:shadow-md border border-gray-200'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="hidden sm:inline">{category.title}</span>
                <span className="sm:hidden">{category.title.split(' ')[0]}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Active Category Skills - Animated Grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group relative overflow-hidden"
                >
                  {/* Hover Background Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${skillCategories[activeCategory].gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-md"
                      style={{ backgroundColor: `${skill.color}15` }}
                    >
                      <skill.icon className="w-8 h-8" style={{ color: skill.color }} />
                    </motion.div>

                    {/* Skill Name */}
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">{skill.name}</h4>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Proficiency</span>
                        <span className="text-sm font-semibold text-primary">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                          className="h-2 rounded-full"
                          style={{ 
                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* All Skills Cloud - Animated Tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
              Complete Tech Stack
            </h3>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-wrap gap-3 justify-center"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: Math.random() > 0.5 ? 5 : -5,
                    boxShadow: "0 10px 30px rgba(37, 99, 235, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full font-medium text-gray-800 border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-default shadow-sm hover:shadow-md"
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Experience Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { 
                icon: "🚀", 
                title: "Production Ready", 
                description: "Built real-world applications",
                gradient: "from-blue-500 to-cyan-500"
              },
              { 
                icon: "⚡", 
                title: "Performance Focused", 
                description: "Optimized for speed",
                gradient: "from-purple-500 to-pink-500"
              },
              { 
                icon: "🎯", 
                title: "Best Practices", 
                description: "Clean & maintainable code",
                gradient: "from-green-500 to-emerald-500"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-br ${item.gradient} p-6 rounded-2xl shadow-lg text-white text-center`}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-5xl mb-3"
                >
                  {item.icon}
                </motion.div>
                <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                <p className="text-white/90 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
