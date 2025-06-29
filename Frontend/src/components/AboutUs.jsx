import React from "react";
import {
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";

const AboutUs = () => {
  const founders = [
    {
      name: "Logeshwaran Devendhiran",
      position: "Founder & CEO",
      image: "/images/CEO.jpeg",
      bio: "The CEO & Founder of viraloab, began his entrepreneurial journey while in his final year of Computer Science Engineering. With a strong foundation in technology and over a year of hands-on experience in digital marketing, he brings a unique blend of technical expertise and marketing insight to the company. His vision is to bridge the gap between innovation and audience impact by crafting digital-first solutions that deliver measurable growth for modern businesses.",
      social: [
        {
          icon: <FaLinkedin />,
          url: "https://www.linkedin.com/in/logesh-waran18/",
          label: "LinkedIn",
        },
        {
          icon: <FaInstagram />,
          url: "https://www.instagram.com/logesh_100_/",
          label: "Instagram",
        },
        {
          icon: <FaEnvelope />,
          mail: "mailto:logeshlav@gmail.com",
          label: "Email",
        },
      ],
    },
    {
      name: "Nitesh J",
      position: "Co-founder and CTO",
      image: "/images/Nithesh.jpeg",
      bio: "With a solid foundation from Top Tech Gaints, our CTO & Co-Founder brings deep technical leadership and strategic vision to the team. Backed by years of experience in building scalable systems and products, he specializes in the MERN stack, translating complex challenges into high-performing, user-focused solutions. His blend of enterprise-grade experience and startup agility fuels the innovation behind our technology roadmap and product evolution.",
      social: [
        {
          icon: <FaLinkedin />,
          url: "https://www.linkedin.com/in/niteshj14/",
          label: "LinkedIn",
        },
        {
          icon: <FaInstagram />,
          url: "https://www.instagram.com/_mysticfallstimberwolves._/",
          label: "Instagram",
        },
        {
          icon: <FaEnvelope />,
          mail: "mailto:jnitesh1463@gmail.com",
          label: "Email",
        },
      ],
    },
    {
      name: "Sabareeswaran Marutharaju",
      position: "Chief Operating Officer (COO)",
      image: "/images/Sabare.JPG",
      bio: "Our Chief Operating Officer brings a wealth of experience from the IT industry, with a strong background in driving organizational efficiency through systematic design and process optimization. Known for exceptional leadership qualities and a strategic mindset, he has successfully led cross-functional teams and scaled operations across dynamic environments. With a track record of delivering industry-leading performance, he plays a critical role in aligning business goals with operational execution, ensuring consistent growth and innovation",
      social: [
        {
          icon: <FaLinkedin />,
          url: "https://www.linkedin.com/in/sabareeswaran-m-076196173/",
          label: "LinkedIn",
        },
        {
          icon: <FaInstagram />,
          url: "https://www.instagram.com/_.this_is_sabare._/",
          label: "Instagram",
        },
        {
          icon: <FaEnvelope />,
          mail: "mailto:sabareessn12@gmail.com",
          label: "Email",
        },
      ],
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="about">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900/95"></div>
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="noise-pattern"></div>

      {/* Background gradient */}
      <div className="absolute w-96 h-96 -top-40 -left-20 bg-primary-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute w-96 h-96 -bottom-40 -right-20 bg-secondary-500/10 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 glass-card text-white text-sm rounded-full">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-6">
            Our Story & Vision
          </h2>
          <p className="text-gray-300 max-w-10xl mx-auto text-lg text-center">
            Founded in 2024, Viraloab has quickly established itself as a leader
            in digital innovation and custom software development. Our mission
            is to help businesses harness the power of technology to achieve
            their goals and reach new heights. We believe that every business
            deserves access to cutting-edge technology solutions that are
            tailored to their unique needs. Our team combines technical
            expertise with creative thinking to deliver results that exceed
            expectations. From web and mobile app development to digital
            marketing and branding, we offer comprehensive solutions that help
            our clients stay ahead in today's competitive digital landscape. We
            are a team of passionate developers, designers, and digital
            strategists committed to creating innovative solutions that
            transform businesses.
          </p>
        </div>

        {/* Team Section */}
        <h3 className="text-2xl md:text-3xl font-display font-bold text-center text-white mb-12">
          Meet Our Pillars & Minds behinds the scenes
        </h3>

        <div className="flex flex-wrap justify-center gap-5 max-w-30xl mx-auto px-4">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="glass-card w-full sm:w-[350px] rounded-2xl border border-white/10 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-sm"
            >
              {/* Image Section */}
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent z-10"></div>

                <div className="w-450px h-full flex items-center justify-center relative z-0">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="max-h-full max-w-full object-cover"
                  />
                </div>

                {/* Social Links */}
                <div className="absolute top-4 right-4 z-20 space-y-2">
                  {founder.social.map((social, idx) => (
                    <a
                      key={idx}
                      href= {social.mail == null ? social.url : social.mail}
                      aria-label={social.label}
                      className="w-8 h-8 glass-card rounded-full flex items-center justify-center text-white hover:text-primary-400 border border-white/20 transition-all hover:border-primary-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Info Section */}
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-1">
                  {founder.name}
                </h4>
                <p className="text-primary-400 mb-4">{founder.position}</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {founder.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
            animation: `float ${Math.random() * 2 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        ></div>
      ))}
    </section>
  );
};

export default AboutUs;
