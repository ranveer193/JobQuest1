const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { setUser, getUser } = require("../services/auth")
const axios = require("axios");

const courses = [
  {
    name: "The Complete Web Developer Bootcamp",
    description: "A comprehensive course covering HTML, CSS, JavaScript, Node.js, MongoDB, and more."
  },
  {
    name: "Modern React with Redux",
    description: "Learn how to build dynamic, responsive web applications using React and Redux."
  },
  {
    name: "JavaScript: Understanding the Weird Parts",
    description: "Deep dive into the JavaScript language, exploring complex topics like closures and inheritance."
  },
  {
    name: "The Complete Node.js Developer Course",
    description: "Master Node.js by building real-world applications. Covers Express, MongoDB, RESTful APIs, and more."
  },
  {
    name: "Responsive Web Design",
    description: "Learn the principles of responsive web design to create websites that work on all devices."
  },
  {
    name: "Web Performance Optimization",
    description: "Optimize websites for speed and performance. Learn techniques for improving load times and reducing HTTP requests."
    },
  {
    name: "Advanced Node.js and Express",
    description: "Dive deep into advanced topics of Node.js and Express. Covers asynchronous programming, scaling applications, integrating databases, and security practices."
  },
  {
    name: "Mastering Python for Backend Development",
    description: "Learn Python's advanced features for backend development with Django and Flask, RESTful APIs, and secure authentication mechanisms."
  },
  {
    name: "Secure Coding Practices for Web Applications",
    description: "Focus on secure coding practices to prevent vulnerabilities like SQL injection, XSS, and CSRF in web applications."
  },
  {
    name: "Introduction to Cybersecurity for Backend Developers",
    description: "Understand the fundamentals of cybersecurity for backend developers, including network security, encryption, and secure communication."
  },
  {
    name: "Building Scalable Backend Systems with Microservices",
    description: "Learn to design and implement scalable backend systems using microservices, API gateways, service discovery, and strategies for ensuring security and resilience."
  },
  {
    name: "Penetration Testing and Ethical Hacking",
    description: "Explore penetration testing and ethical hacking methodologies and tools. Includes practical labs and exercises for identifying vulnerabilities and mitigating risks."
  }
];

router.post("/signup", async (req, res) => {
    const { user_name, email, password, mobile_no } = req.body;
    await User.create({
        user_name,
        email,
        password,
        mobile_no,
    });
    return res.redirect("/login");
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email, password
    });
    if (!user)
        return res.render("login", {
            err: "Invalid email id or password"
        })
    const token = setUser(user);
    res.cookie("uid", token);
    return res.render("home", {
        user : user,
    });
})

router.get('/logout', (req, res) => {
    res.clearCookie("uid");
    return res.redirect("/");
})

router.post('/profile/update', async (req, res) => {

    const { skills, job } = req.body;
    const user_id = req.user.user_id;

    const user = await User.findOneAndUpdate(
            { user_id }, // Filter to find the user
        { $set: { skills, job } },
        { new: true }// Update fields
    );

  const token = setUser(user);
  res.cookie("uid", token);
  
  return res.render("profile", {
        msg: "Profile Updated Successfuly",
        user: user,
    })
})

async function generatePrompt(skills, job) {
  const apiKey = "sk-0pptLH_R-Qr5qmTZY4Tyl7_HVM8MsTZ8NXneRVXK5PT3BlbkFJ-lvdKuTRnAWTGc-0Szo3YeRXQUntDyax8yNhcOvPkA"; // Replace with your actual OpenAI API Key
  const endpoint = "https://api.openai.com/v1/chat/completions"; // OpenAI's endpoint for chat completions

  // Construct the detailed prompt asking for specific lacking skills
  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant with expertise in career advice."
    },
    {
      role: "user",
      content: `A person has the following skills: ${skills}. They want to be a ${job}. Based on their current skills, identify the most important skills they are lacking for this role. Provide your answer as a list of skills separated by spaces, without commas or additional text.`
    }
  ];

  // Prepare the data payload
  const data = {
    model: "gpt-4o-mini", // Use the latest available model
    messages: messages,
    max_tokens: 10,
    temperature: 0.7,
  };

  try {
    // Send the request to the OpenAI API
    const response = await axios.post(endpoint, data, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Extract and return the generated output
    const generatedOutput = response.data.choices[0].message.content.trim(); // Remove any leading/trailing whitespace
    return generatedOutput;
  } catch (error) {
    console.error("Error generating prompt:", error.response ? error.response.data : error.message);
    // Fallback to a default value if an error occurs
    return "No recommendations available.";
  }
}

function filterCourses(courses, text) {
  const keywords = text.split(' ');
  return courses.filter(course => {
    return keywords.some(keyword => {
      return course.name.toLowerCase().includes(keyword.toLowerCase()) ||
        course.description.toLowerCase().includes(keyword.toLowerCase());
    });
  });
}

router.get('/courses', async (req, res) => {
    // Retrieve the user's profile based on the user ID
    const user = req.user;

    if (!user) {
      return res.status(404).send('User Profile not found');
    }

    // Filter courses based on the generated text
    const filteredResults = filterCourses(courses,user.skills);
    
    console.log(filteredResults);

    // Render the course page with filtered results
    res.render('course', { courses: filteredResults,user:user });
});

router.get('/jobs', (req, res) => {
  
});

module.exports = router;