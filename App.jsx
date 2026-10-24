import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  MessageSquare, 
  Award, 
  User, 
  LogOut, 
  Sparkles, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Send, 
  Brain, 
  TrendingUp, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight,
  Bookmark,
  Check,
  Volume2,
  RefreshCw
} from 'lucide-react';

// Comprehensive Management Terminology Data
const INITIAL_DICTIONARY = [
  {
    id: 'swot',
    term: 'SWOT Analysis',
    category: 'Strategic Management',
    definition: 'A framework used to evaluate a company\'s competitive position and to develop strategic planning.',
    details: 'SWOT stands for Strengths, Weaknesses, Opportunities, and Threats. Strengths and Weaknesses are internal factors, while Opportunities and Threats are external environmental factors.',
    example: 'Apple assessing its strong brand equity (Strength) against high product pricing (Weakness), expanding services market (Opportunity), and rising competition (Threat).',
    businessContext: 'Used during annual strategic reviews or prior to launching a new project/enterprise.',
    tags: ['Strategy', 'Framework', 'Analysis']
  },
  {
    id: 'kpi',
    term: 'KPI (Key Performance Indicator)',
    category: 'Operations & Performance',
    definition: 'A quantifiable measure used to evaluate the success of an organization, employee, or initiative in meeting objectives.',
    details: 'KPIs must be specific, measurable, achievable, relevant, and time-bound (SMART). They track critical operational factors.',
    example: 'A customer support team measuring Average Resolution Time (ART) or Customer Satisfaction (CSAT) score.',
    businessContext: 'Essential for alignment across departments and measuring progress against quarterly business goals.',
    tags: ['Performance', 'Metrics', 'Operations']
  },
  {
    id: 'agile',
    term: 'Agile Methodology',
    category: 'Project Management',
    definition: 'An iterative approach to project management and software development that helps teams deliver value to customers faster.',
    details: 'Focuses on continuous improvement, flexibility, team input, and delivering working software in short cycles called sprints.',
    example: 'A tech startup releasing small feature updates every two weeks instead of waiting a full year for a grand launch.',
    businessContext: 'Ideal for dynamic environments where market conditions and customer demands change rapidly.',
    tags: ['Agility', 'Execution', 'Sprints']
  },
  {
    id: 'okr',
    term: 'OKR (Objectives & Key Results)',
    category: 'Goal Setting',
    definition: 'A goal-setting framework used by individuals and teams to define measurable goals and track outcomes.',
    details: 'An Objective defines "Where do I want to go?" and Key Results define "How do I know I am getting there?" with measurable thresholds.',
    example: 'Objective: Increase global market presence. Key Result: Onboard 50,000 new active monthly users in Europe by Q3.',
    businessContext: 'Popularized by Intel and Google to align company-wide efforts toward stretch targets.',
    tags: ['Leadership', 'Goals', 'Alignment']
  },
  {
    id: 'roi',
    term: 'ROI (Return on Investment)',
    category: 'Corporate Finance',
    definition: 'A performance measure used to evaluate the efficiency or profitability of an investment.',
    details: 'Calculated as: (Net Profit / Cost of Investment) × 100. It measures the financial return generated relative to capital invested.',
    example: 'Spending $10,000 on a marketing campaign that yields $25,000 in direct gross profit results in an ROI of 150%.',
    businessContext: 'Critical for capital budgeting and prioritizing business initiatives.',
    tags: ['Finance', 'Profitability', 'Capital']
  },
  {
    id: 'supply-chain',
    term: 'Supply Chain Management (SCM)',
    category: 'Operations',
    definition: 'The management of the flow of goods and services, including all processes that transform raw materials into final products.',
    details: 'Encompasses procurement, manufacturing, inventory control, logistics, and supply-and-demand planning across the partner ecosystem.',
    example: 'Toyota coordinating hundreds of Tier-1 suppliers to execute Just-in-Time (JIT) car assembly.',
    businessContext: 'Core to cost optimization, risk mitigation, and operational excellence.',
    tags: ['Logistics', 'Procurement', 'Operations']
  },
  {
    id: 'change-management',
    term: 'Change Management',
    category: 'Organizational Leadership',
    definition: 'A structured approach to transitioning individuals, teams, and organizations from a current state to a desired future state.',
    details: 'Focuses on human adoption, communication, overcoming resistance, and organizational readiness (e.g., Kotter\'s 8-Step Model).',
    example: 'Transitioning an enterprise from legacy physical servers to a cloud infrastructure while upskilling staff.',
    businessContext: 'Crucial for mergers, tech implementations, and major strategic pivots.',
    tags: ['Leadership', 'HR', 'Transformation']
  },
  {
    id: 'pestel',
    term: 'PESTEL Analysis',
    category: 'Macro Environment',
    definition: 'A tool used to track the external environment that impacts an organization: Political, Economic, Social, Technological, Environmental, and Legal.',
    details: 'Broadens external research beyond immediate industry competitors to high-level societal and regulatory trends.',
    example: 'An EV manufacturer studying regulatory tax credits (Political/Economic) and battery recycling rules (Environmental).',
    businessContext: 'Used for international expansion, market entry strategies, and scenario planning.',
    tags: ['Strategy', 'Analysis', 'Market Entry']
  },
  {
    id: 'porter-five',
    term: 'Porter\'s Five Forces',
    category: 'Competitive Strategy',
    definition: 'A framework for analyzing the competitive intensity and profitability of an industry.',
    details: 'Forces include: Threat of New Entrants, Bargaining Power of Buyers, Bargaining Power of Suppliers, Threat of Substitutes, and Industry Rivalry.',
    example: 'Analyzing the airline industry to see why high supplier power (Boeing/Airbus) and buyer price-sensitivity yield low industry profitability.',
    businessContext: 'Used when entering new markets or evaluating long-term industry profitability.',
    tags: ['Strategy', 'Industry Analysis', 'Economics']
  },
  {
    id: 'lean',
    term: 'Lean Management',
    category: 'Operations',
    definition: 'An approach to managing an organization that supports the concept of continuous improvement by eliminating waste.',
    details: 'Derived from the Toyota Production System (TPS). Identifies 7 key types of waste (Muda) including overproduction, waiting, and defects.',
    example: 'A software team streamlining pull-request reviews to minimize waiting time and reduce deployment bottlenecks.',
    businessContext: 'Improves efficiency, customer value delivery, and operational agility.',
    tags: ['Operations', 'Efficiency', 'Quality']
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which SWOT element accounts for external industry trends like technological breakthroughs or shifting regulations?",
    options: ["Strengths", "Weaknesses", "Opportunities", "Threats"],
    correct: 2,
    explanation: "Opportunities represent external favorable conditions or trends in the environment that an organization can exploit."
  },
  {
    id: 2,
    question: "What does the 'K' in KPI stand for?",
    options: ["Knowledge", "Key", "Kinetic", "Kernel"],
    correct: 1,
    explanation: "KPI stands for Key Performance Indicator."
  },
  {
    id: 3,
    question: "In the OKR framework, what role do 'Key Results' play?",
    options: [
      "They define the inspirational vision",
      "They outline high-level strategic aspirations",
      "They provide measurable metrics to track progress toward objectives",
      "They are the financial budget allocations"
    ],
    correct: 2,
    explanation: "Key Results are quantitative, time-bound targets that measure progress toward the qualitative Objective."
  },
  {
    id: 4,
    question: "Which of Porter's Five Forces examines how easy it is for buyers to switch to alternative product categories?",
    options: [
      "Bargaining Power of Suppliers",
      "Threat of Substitutes",
      "Threat of New Entrants",
      "Competitive Rivalry"
    ],
    correct: 1,
    explanation: "Threat of Substitutes evaluates products or services outside the industry category that satisfy the same fundamental customer need."
  },
  {
    id: 5,
    question: "Lean Management primarily focuses on:",
    options: [
      "Increasing product pricing",
      "Maximizing employee work hours",
      "Eliminating non-value-adding waste and continuous improvement",
      "Executing massive advertising campaigns"
    ],
    correct: 2,
    explanation: "Lean Management is built on maximizing customer value while minimizing waste across processes."
  }
];

export default function App() {
  // Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  // Main Navigation State: 'dictionary' | 'ai' | 'quiz' | 'profile'
  const [activeTab, setActiveTab] = useState('dictionary');

  // Dictionary State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [savedTerms, setSavedTerms] = useState(['swot', 'kpi']);

  // AI Assistant State
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'george',
      text: "Hello! I'm George AI, your personal management coach. Ask me anything about corporate strategy, financial terms, leadership frameworks, or operational methodologies!"
    }
  ]);
  const [userQuery, setUserQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Quiz State
  const [quizState, setQuizState] = useState({
    active: false,
    currentQuestionIndex: 0,
    selectedOption: null,
    score: 0,
    showFeedback: false,
    completed: false
  });

  // User Stats
  const [userStats, setUserStats] = useState({
    termsMastered: 12,
    quizzesCompleted: 4,
    highestQuizScore: 80
  });

  // Load saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('george_ai_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Auth Handler
  const handleAuth = (e) => {
    e.preventDefault();
    setAuthError('');

    if (!authForm.email || !authForm.password) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    if (authMode === 'signup' && !authForm.name) {
      setAuthError('Please enter your full name.');
      return;
    }

    const userData = {
      name: authMode === 'signup' ? authForm.name : (authForm.email.split('@')[0] || 'Management Student'),
      email: authForm.email,
      role: 'MBA Candidate / Manager'
    };

    setCurrentUser(userData);
    localStorage.setItem('george_ai_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('george_ai_user');
  };

  // Toggle Bookmark
  const toggleSaveTerm = (id) => {
    if (savedTerms.includes(id)) {
      setSavedTerms(savedTerms.filter(t => t !== id));
    } else {
      setSavedTerms([...savedTerms, id]);
    }
  };

  // Gemini API Call for George AI Chat
  const handleAskGeorge = async (e) => {
    e?.preventDefault();
    if (!userQuery.trim()) return;

    const queryText = userQuery;
    const newMsg = { id: Date.now(), sender: 'user', text: queryText };
    setChatMessages(prev => [...prev, newMsg]);
    setUserQuery('');
    setIsTyping(true);

    try {
      const apiKey = ""; // Gemini API Key handled by runtime execution context
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const systemPrompt = `You are 'George AI', an expert, friendly, and structured executive business and management tutor. 
Your goal is to clarify management concepts, corporate strategies, terminology, and leadership frameworks for business students and professionals.
Keep answers structured, concise, professional yet accessible, and offer real-world executive examples where applicable.
Use bullet points and bold headers for readability.`;

      const payload = {
        contents: [
          { role: 'user', parts: [{ text: queryText }] }
        ],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text 
        || "I am currently analyzing that concept. Could you rephrase your question regarding management management models or practices?";

      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'george', text: replyText }]);
    } catch (err) {
      setChatMessages(prev => [
        ...prev, 
        { 
          id: Date.now() + 1, 
          sender: 'george', 
          text: "I experienced a brief connection hitch. However, generally in management, clarity and strategy are paramount! Please ask again." 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Quick prompt for AI
  const handleQuickPrompt = (prompt) => {
    setUserQuery(prompt);
  };

  // Quiz Handlers
  const handleAnswerSubmit = (optionIndex) => {
    if (quizState.showFeedback) return;

    const isCorrect = optionIndex === QUIZ_QUESTIONS[quizState.currentQuestionIndex].correct;
    setQuizState(prev => ({
      ...prev,
      selectedOption: optionIndex,
      showFeedback: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedOption: null,
        showFeedback: false
      }));
    } else {
      const finalPercentage = Math.round(((quizState.score) / QUIZ_QUESTIONS.length) * 100);
      setQuizState(prev => ({ ...prev, completed: true }));
      setUserStats(prev => ({
        ...prev,
        quizzesCompleted: prev.quizzesCompleted + 1,
        highestQuizScore: Math.max(prev.highestQuizScore, finalPercentage)
      }));
    }
  };

  const resetQuiz = () => {
    setQuizState({
      active: true,
      currentQuestionIndex: 0,
      selectedOption: null,
      score: 0,
      showFeedback: false,
      completed: false
    });
  };

  // Filter terms
  const categories = ['All', ...Array.from(new Set(INITIAL_DICTIONARY.map(item => item.category)))];
  const filteredTerms = INITIAL_DICTIONARY.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-0 sm:p-4 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Simulated Mobile Outer Container */}
      <div className="w-full max-w-md h-screen sm:h-[880px] bg-slate-950 sm:rounded-[40px] border-0 sm:border-8 border-slate-800 shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Mobile Top Status Bar Simulation */}
        <div className="bg-slate-950 px-6 pt-3 pb-2 flex justify-between items-center text-xs text-slate-400 font-mono select-none z-20 shrink-0">
          <span>9:41</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-bold">5G</span>
            <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-[1px] flex items-center">
              <div className="h-full w-full bg-slate-300 rounded-[0.5px]"></div>
            </div>
          </div>
        </div>

        {/* Header Bar */}
        <header className="bg-slate-900 border-b border-slate-800/80 px-4 py-3 flex justify-between items-center z-10 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-wide text-white leading-tight">
                GEORGE <span className="text-indigo-400 font-extrabold">AI</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium">Management Hub</p>
            </div>
          </div>

          {currentUser && (
            <button 
              onClick={() => setActiveTab('profile')}
              className="flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1.5 rounded-full border border-slate-700/60 transition"
            >
              <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-slate-300 max-w-[70px] truncate">{currentUser.name}</span>
            </button>
          )}
        </header>

        {/* Main Dynamic View Area */}
        <main className="flex-1 overflow-y-auto relative bg-slate-950 flex flex-col">
          {!currentUser ? (
            /* AUTHENTICATION VIEW */
            <div className="p-6 flex-1 flex flex-col justify-center animate-fadeIn">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-cyan-400 rounded-2xl mx-auto flex items-center justify-center shadow-xl shadow-indigo-500/20 mb-4">
                  <Brain className="w-9 h-9 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">Master Corporate Terminology</h2>
                <p className="text-xs text-slate-400">Accelerate your business management learning with George AI</p>
              </div>

              {/* Auth Tab Switcher */}
              <div className="bg-slate-900 p-1 rounded-xl flex border border-slate-800 mb-6">
                <button
                  onClick={() => { setAuthMode('signin'); setAuthError(''); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                    authMode === 'signin' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transitio
