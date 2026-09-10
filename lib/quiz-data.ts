export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface Chapter {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  chapters: Chapter[];
}

export const subjects: { id: string; name: string; icon: string; color: string }[] = [
  { id: "physics", name: "Physics", icon: "⚛️", color: "from-blue-500 to-cyan-500" },
  { id: "chemistry", name: "Chemistry", icon: "🧪", color: "from-emerald-500 to-teal-500" },
  { id: "mathematics", name: "Mathematics", icon: "📐", color: "from-amber-500 to-orange-500" },
  { id: "cs", name: "Computer Science", icon: "💻", color: "from-violet-500 to-purple-500" },
  { id: "gk", name: "General Knowledge", icon: "🌍", color: "from-rose-500 to-pink-500" },
];

export const quizData = {
  subjects: [
    {
      id: "physics",
      name: "Physics",
      icon: "⚛️",
      color: "from-blue-500 to-cyan-500",
      description: "Explore the fundamental laws of the universe",
      chapters: [
        {
          id: "mechanics",
          name: "Mechanics",
          description: "Motion, forces, and energy",
          questions: [
            {
              id: "p1",
              question: "What is the SI unit of force?",
              options: ["Joule", "Newton", "Watt", "Pascal"],
              correctAnswer: 1,
              explanation: "The Newton (N) is the SI unit of force, defined as the force needed to accelerate 1 kg of mass at 1 m/s².",
              difficulty: "easy"
            },
            {
              id: "p2",
              question: "Which law states that for every action there is an equal and opposite reaction?",
              options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
              correctAnswer: 2,
              explanation: "Newton's Third Law states that for every action, there is an equal and opposite reaction.",
              difficulty: "easy"
            },
            {
              id: "p3",
              question: "What is the acceleration due to gravity on Earth?",
              options: ["9.8 m/s²", "8.9 m/s²", "10.8 m/s²", "9.2 m/s²"],
              correctAnswer: 0,
              explanation: "The standard acceleration due to gravity on Earth is approximately 9.8 m/s².",
              difficulty: "easy"
            },
            {
              id: "p4",
              question: "What is the formula for kinetic energy?",
              options: ["mgh", "½mv²", "mv", "F×d"],
              correctAnswer: 1,
              explanation: "Kinetic energy is calculated as ½mv², where m is mass and v is velocity.",
              difficulty: "medium"
            },
            {
              id: "p5",
              question: "What is momentum?",
              options: ["Mass × Velocity", "Mass × Acceleration", "Force × Time", "Velocity × Time"],
              correctAnswer: 0,
              explanation: "Momentum is the product of mass and velocity (p = mv).",
              difficulty: "medium"
            },
            {
              id: "p6",
              question: "Which of these is a vector quantity?",
              options: ["Speed", "Distance", "Velocity", "Mass"],
              correctAnswer: 2,
              explanation: "Velocity is a vector quantity as it has both magnitude and direction.",
              difficulty: "medium"
            },
            {
              id: "p7",
              question: "What is the work done when force is perpendicular to displacement?",
              options: ["Maximum", "Zero", "Negative", "Infinite"],
              correctAnswer: 1,
              explanation: "Work is zero when force is perpendicular to displacement because cos(90°) = 0.",
              difficulty: "hard"
            },
            {
              id: "p8",
              question: "What is the principle of conservation of momentum?",
              options: ["Momentum is always increasing", "Total momentum remains constant in isolated systems", "Momentum is always decreasing", "Momentum depends on temperature"],
              correctAnswer: 1,
              explanation: "In an isolated system, the total momentum before and after an interaction remains constant.",
              difficulty: "hard"
            }
          ]
        },
        {
          id: "thermodynamics",
          name: "Thermodynamics",
          description: "Heat, temperature, and energy transfer",
          questions: [
            {
              id: "p9",
              question: "What is the SI unit of temperature?",
              options: ["Celsius", "Fahrenheit", "Kelvin", "Joule"],
              correctAnswer: 2,
              explanation: "The Kelvin (K) is the SI unit of thermodynamic temperature.",
              difficulty: "easy"
            },
            {
              id: "p10",
              question: "What is the first law of thermodynamics?",
              options: ["Energy cannot be created or destroyed", "Entropy always increases", "Heat flows from cold to hot", "Pressure is constant"],
              correctAnswer: 0,
              explanation: "The first law states that energy cannot be created or destroyed, only transformed.",
              difficulty: "medium"
            },
            {
              id: "p11",
              question: "What is entropy?",
              options: ["A measure of disorder", "A measure of temperature", "A measure of pressure", "A measure of volume"],
              correctAnswer: 0,
              explanation: "Entropy is a measure of the disorder or randomness in a system.",
              difficulty: "medium"
            },
            {
              id: "p12",
              question: "What is absolute zero?",
              options: ["0°C", "-273.15°C", "-100°C", "0°F"],
              correctAnswer: 1,
              explanation: "Absolute zero is -273.15°C or 0 Kelvin, the lowest possible temperature.",
              difficulty: "hard"
            }
          ]
        }
      ]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      icon: "🧪",
      color: "from-emerald-500 to-teal-500",
      description: "Study of matter and its transformations",
      chapters: [
        {
          id: "organic",
          name: "Organic Chemistry",
          description: "Carbon compounds and their reactions",
          questions: [
            {
              id: "c1",
              question: "What is the chemical formula for methane?",
              options: ["CH₄", "C₂H₆", "CO₂", "C₆H₁₂O₆"],
              correctAnswer: 0,
              explanation: "Methane has the chemical formula CH₄, consisting of one carbon and four hydrogen atoms.",
              difficulty: "easy"
            },
            {
              id: "c2",
              question: "What is the functional group of alcohols?",
              options: ["-OH", "-COOH", "-CHO", "-NH₂"],
              correctAnswer: 0,
              explanation: "Alcohols contain the hydroxyl functional group (-OH).",
              difficulty: "easy"
            },
            {
              id: "c3",
              question: "What is the simplest alkene?",
              options: ["Methane", "Ethene", "Propene", "Butene"],
              correctAnswer: 1,
              explanation: "Ethene (C₂H₄) is the simplest alkene with one double bond.",
              difficulty: "medium"
            },
            {
              id: "c4",
              question: "What is the general formula for alkanes?",
              options: ["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙHₙ"],
              correctAnswer: 0,
              explanation: "Alkanes follow the general formula CₙH₂ₙ₊₂.",
              difficulty: "medium"
            },
            {
              id: "c5",
              question: "What type of reaction is the addition of water to an alkene?",
              options: ["Substitution", "Addition", "Elimination", "Oxidation"],
              correctAnswer: 1,
              explanation: "Hydration of alkenes is an addition reaction where water adds across the double bond.",
              difficulty: "hard"
            }
          ]
        },
        {
          id: "inorganic",
          name: "Inorganic Chemistry",
          description: "Elements, compounds, and reactions",
          questions: [
            {
              id: "c6",
              question: "What is the most abundant element in Earth's crust?",
              options: ["Oxygen", "Silicon", "Aluminum", "Iron"],
              correctAnswer: 0,
              explanation: "Oxygen is the most abundant element in Earth's crust at about 46.6% by mass.",
              difficulty: "easy"
            },
            {
              id: "c7",
              question: "What is the pH of a neutral solution?",
              options: ["0", "7", "14", "10"],
              correctAnswer: 1,
              explanation: "A neutral solution has a pH of exactly 7 at 25°C.",
              difficulty: "easy"
            },
            {
              id: "c8",
              question: "What is the chemical symbol for gold?",
              options: ["Go", "Gd", "Au", "Ag"],
              correctAnswer: 2,
              explanation: "Gold's chemical symbol is Au, from the Latin word 'aurum'.",
              difficulty: "medium"
            },
            {
              id: "c9",
              question: "What type of bond forms between a metal and a non-metal?",
              options: ["Covalent", "Ionic", "Metallic", "Hydrogen"],
              correctAnswer: 1,
              explanation: "Ionic bonds form when electrons are transferred from a metal to a non-metal.",
              difficulty: "medium"
            },
            {
              id: "c10",
              question: "What is the oxidation state of oxygen in H₂O₂?",
              options: ["-2", "-1", "+1", "0"],
              correctAnswer: 1,
              explanation: "In hydrogen peroxide, oxygen has an oxidation state of -1.",
              difficulty: "hard"
            }
          ]
        }
      ]
    },
    {
      id: "mathematics",
      name: "Mathematics",
      icon: "📐",
      color: "from-amber-500 to-orange-500",
      description: "Numbers, patterns, and logical reasoning",
      chapters: [
        {
          id: "algebra",
          name: "Algebra",
          description: "Equations, functions, and variables",
          questions: [
            {
              id: "m1",
              question: "What is the value of x in 2x + 5 = 13?",
              options: ["3", "4", "5", "6"],
              correctAnswer: 1,
              explanation: "2x + 5 = 13 → 2x = 8 → x = 4",
              difficulty: "easy"
            },
            {
              id: "m2",
              question: "What is the quadratic formula?",
              options: ["x = (-b ± √(b²-4ac)) / 2a", "x = (-b ± √(b²+4ac)) / 2a", "x = (b ± √(b²-4ac)) / 2a", "x = (-b ± √(b²-4ac)) / a"],
              correctAnswer: 0,
              explanation: "The quadratic formula is x = (-b ± √(b²-4ac)) / 2a.",
              difficulty: "medium"
            },
            {
              id: "m3",
              question: "What is the value of log₁₀(100)?",
              options: ["1", "2", "10", "100"],
              correctAnswer: 1,
              explanation: "log₁₀(100) = 2 because 10² = 100.",
              difficulty: "medium"
            },
            {
              id: "m4",
              question: "What is the sum of the first 10 natural numbers?",
              options: ["45", "50", "55", "60"],
              correctAnswer: 2,
              explanation: "Sum = n(n+1)/2 = 10(11)/2 = 55.",
              difficulty: "medium"
            },
            {
              id: "m5",
              question: "What is the derivative of x³?",
              options: ["3x²", "x²", "3x", "x³/3"],
              correctAnswer: 0,
              explanation: "The derivative of x³ is 3x² using the power rule.",
              difficulty: "hard"
            }
          ]
        },
        {
          id: "geometry",
          name: "Geometry",
          description: "Shapes, angles, and spatial reasoning",
          questions: [
            {
              id: "m6",
              question: "What is the sum of angles in a triangle?",
              options: ["90°", "180°", "270°", "360°"],
              correctAnswer: 1,
              explanation: "The sum of interior angles in any triangle is always 180°.",
              difficulty: "easy"
            },
            {
              id: "m7",
              question: "What is the area of a circle with radius 5?",
              options: ["25π", "10π", "5π", "50π"],
              correctAnswer: 0,
              explanation: "Area = πr² = π(5)² = 25π.",
              difficulty: "easy"
            },
            {
              id: "m8",
              question: "What is the Pythagorean theorem?",
              options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "a × b = c"],
              correctAnswer: 0,
              explanation: "In a right triangle, a² + b² = c² where c is the hypotenuse.",
              difficulty: "medium"
            },
            {
              id: "m9",
              question: "What is the volume of a sphere with radius r?",
              options: ["(4/3)πr³", "πr³", "(2/3)πr³", "4πr²"],
              correctAnswer: 0,
              explanation: "The volume of a sphere is (4/3)πr³.",
              difficulty: "hard"
            }
          ]
        }
      ]
    },
    {
      id: "cs",
      name: "Computer Science",
      icon: "💻",
      color: "from-violet-500 to-purple-500",
      description: "Programming, algorithms, and technology",
      chapters: [
        {
          id: "programming",
          name: "Programming Basics",
          description: "Fundamentals of coding",
          questions: [
            {
              id: "cs1",
              question: "What does HTML stand for?",
              options: ["HyperText Markup Language", "HighText Machine Language", "HyperText Making Language", "HyperTransfer Markup Language"],
              correctAnswer: 0,
              explanation: "HTML stands for HyperText Markup Language.",
              difficulty: "easy"
            },
            {
              id: "cs2",
              question: "Which data structure uses FIFO?",
              options: ["Stack", "Queue", "Tree", "Graph"],
              correctAnswer: 1,
              explanation: "A queue follows First-In-First-Out (FIFO) principle.",
              difficulty: "easy"
            },
            {
              id: "cs3",
              question: "What is the time complexity of binary search?",
              options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
              correctAnswer: 1,
              explanation: "Binary search has O(log n) time complexity.",
              difficulty: "medium"
            },
            {
              id: "cs4",
              question: "What does CSS stand for?",
              options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Cascading System Sheets"],
              correctAnswer: 0,
              explanation: "CSS stands for Cascading Style Sheets.",
              difficulty: "easy"
            },
            {
              id: "cs5",
              question: "Which sorting algorithm has the best average time complexity?",
              options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
              correctAnswer: 1,
              explanation: "Quick Sort has an average time complexity of O(n log n).",
              difficulty: "medium"
            },
            {
              id: "cs6",
              question: "What is the output of '2' + 2 in JavaScript?",
              options: ["4", "22", "Error", "NaN"],
              correctAnswer: 1,
              explanation: "In JavaScript, '2' + 2 results in string concatenation: '22'.",
              difficulty: "hard"
            }
          ]
        },
        {
          id: "networking",
          name: "Networking",
          description: "Computer networks and protocols",
          questions: [
            {
              id: "cs7",
              question: "What does IP stand for?",
              options: ["Internet Protocol", "Internal Program", "Integrated Process", "Internet Process"],
              correctAnswer: 0,
              explanation: "IP stands for Internet Protocol.",
              difficulty: "easy"
            },
            {
              id: "cs8",
              question: "Which protocol is used for secure web browsing?",
              options: ["HTTP", "FTP", "HTTPS", "SMTP"],
              correctAnswer: 2,
              explanation: "HTTPS (HyperText Transfer Protocol Secure) encrypts web traffic.",
              difficulty: "medium"
            },
            {
              id: "cs9",
              question: "What is the default port for HTTP?",
              options: ["21", "25", "80", "443"],
              correctAnswer: 2,
              explanation: "HTTP uses port 80 by default.",
              difficulty: "medium"
            },
            {
              id: "cs10",
              question: "What does DNS stand for?",
              options: ["Domain Name System", "Digital Network Service", "Data Network System", "Domain Network Service"],
              correctAnswer: 0,
              explanation: "DNS stands for Domain Name System.",
              difficulty: "easy"
            }
          ]
        }
      ]
    },
    {
      id: "gk",
      name: "General Knowledge",
      icon: "🌍",
      color: "from-rose-500 to-pink-500",
      description: "World facts, history, and culture",
      chapters: [
        {
          id: "world",
          name: "World Facts",
          description: "Geography, history, and global knowledge",
          questions: [
            {
              id: "g1",
              question: "What is the capital of Japan?",
              options: ["Osaka", "Tokyo", "Kyoto", "Hiroshima"],
              correctAnswer: 1,
              explanation: "Tokyo is the capital city of Japan.",
              difficulty: "easy"
            },
            {
              id: "g2",
              question: "Which is the largest ocean on Earth?",
              options: ["Atlantic", "Indian", "Pacific", "Arctic"],
              correctAnswer: 2,
              explanation: "The Pacific Ocean is the largest and deepest ocean on Earth.",
              difficulty: "easy"
            },
            {
              id: "g3",
              question: "Who painted the Mona Lisa?",
              options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Van Gogh"],
              correctAnswer: 1,
              explanation: "Leonardo da Vinci painted the Mona Lisa in the early 16th century.",
              difficulty: "easy"
            },
            {
              id: "g4",
              question: "What is the longest river in the world?",
              options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
              correctAnswer: 1,
              explanation: "The Nile River is traditionally considered the longest river in the world.",
              difficulty: "medium"
            },
            {
              id: "g5",
              question: "In which year did World War II end?",
              options: ["1943", "1944", "1945", "1946"],
              correctAnswer: 2,
              explanation: "World War II ended in 1945.",
              difficulty: "medium"
            },
            {
              id: "g6",
              question: "What is the smallest country in the world?",
              options: ["Monaco", "Vatican City", "Malta", "San Marino"],
              correctAnswer: 1,
              explanation: "Vatican City is the smallest country in the world by area and population.",
              difficulty: "medium"
            },
            {
              id: "g7",
              question: "Who wrote 'Romeo and Juliet'?",
              options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
              correctAnswer: 1,
              explanation: "William Shakespeare wrote 'Romeo and Juliet'.",
              difficulty: "easy"
            },
            {
              id: "g8",
              question: "What is the currency of the United Kingdom?",
              options: ["Euro", "Dollar", "Pound Sterling", "Franc"],
              correctAnswer: 2,
              explanation: "The Pound Sterling (£) is the currency of the United Kingdom.",
              difficulty: "easy"
            }
          ]
        }
      ]
    }
  ]
};