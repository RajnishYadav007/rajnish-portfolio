import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { portfolioData } from '../data/portfolio';
import { FaCode, FaMobile, FaRocket, FaLightbulb } from 'react-icons/fa';

const About = () => {
  const { personal } = portfolioData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const services = [
    {
      icon: FaCode,
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces with React.js and modern CSS frameworks.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaMobile,
      title: "Responsive Design",
      description: "Creating mobile-first designs that work seamlessly across all devices and screen sizes.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FaRocket,
      title: "API Integration",
      description: "Connecting frontend applications with backend services through RESTful APIs.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FaLightbulb,
      title: "Performance Optimization",
      description: "Optimizing applications for faster load times and better user experience.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-white to-gray-50" ref={ref}>
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              About <span className="text-gradient bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Passionate about creating exceptional digital experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Left: Avatar & Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24">
                {/* Animated Avatar */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="relative mb-8 group"
                >
                  <div className="w-full aspect-square max-w-sm mx-auto bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <div className="relative z-10 text-center text-white p-8">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-7xl font-bold mb-4"
                      >
                        RY
                      </motion.div>
                      <p className="text-xl font-semibold">React Developer</p>
                    </div>
                  </div>
                  {/* Floating decorative elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-70 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-60 blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>

                {/* Status Cards */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants} className="bg-white p-5 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-semibold text-gray-900 text-lg">{personal.location}</p>
                  </motion.div>
                  <motion.div variants={itemVariants} className="bg-white p-5 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a href={`mailto:${personal.email}`} className="font-semibold text-primary hover:underline break-all text-sm">
                      {personal.email}
                    </a>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200 shadow-md"
                  >
                    <p className="text-sm text-green-600 mb-2">Status</p>
                    <p className="font-semibold text-green-700 flex items-center gap-2">
                      <motion.span
                        className="w-3 h-3 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Available for opportunities
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <div className="lg:col-span-2">
              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-4xl">👨‍💻</span>
                  Who I Am
                </h3>
                <div className="prose prose-lg max-w-none space-y-4">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {personal.bio}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    I'm passionate about creating seamless user experiences and writing clean, 
                    efficient code. My focus is on building applications that not only look great 
                    but also perform exceptionally well across all devices.
                  </p>
                </div>
              </motion.div>

              {/* Stats - ✅ UPDATED HERE */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-3 gap-6 mb-12"
              >
                {[
                  { value: "1+", label: "Years Experience", color: "from-blue-500 to-cyan-500" },
                  { value: personal.projectsCompleted, label: "Projects Completed", color: "from-purple-500 to-pink-500" },
                  { value: personal.technologiesCount, label: "Technologies", color: "from-green-500 to-emerald-500" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`text-center p-6 bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg`}
                  >
                    <motion.p
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="text-5xl font-bold text-white mb-2"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-white/90 font-medium text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* What I Do - Services Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <span className="text-4xl">🚀</span>
                  What I Do
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                      >
                        <service.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">{service.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-black/10"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">Let's Work Together!</h3>
              <p className="text-blue-100 mb-8 text-lg">
                I'm always interested in hearing about new projects and opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Get In Touch
                </motion.a>
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm border-2 border-white/30"
                >
                  View My Work
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
