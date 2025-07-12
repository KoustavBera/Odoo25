<<<<<<< HEAD
=======
import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("Newest");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const filterOptions = ["Newest", "Unanswered", "Active", "Votes", "Frequent"];

  // Sample questions data
  const allQuestions = [
    {
      id: 1,
      title:
        "How to join 2 columns in a data set to make a separate column in SQL",
      description:
        "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name and column 2 consisting of Last name. I want a column to contain...",
      username: "User Name",
      answers: 5,
      tags: ["sql", "database"],
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      title: "React useState hook not updating state immediately",
      description:
        "I'm trying to update state using useState hook but the state doesn't seem to update immediately. When I console.log the state right after setState, it shows the old value...",
      username: "Developer123",
      answers: 3,
      tags: ["react", "javascript"],
      timeAgo: "4 hours ago",
    },
    {
      id: 3,
      title: "Python list comprehension with multiple conditions",
      description:
        "I need to create a list comprehension that filters based on multiple conditions. I have a list of dictionaries and want to extract specific values based on certain criteria...",
      username: "PythonLearner",
      answers: 2,
      tags: ["python", "list-comprehension"],
      timeAgo: "6 hours ago",
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox - when to use which?",
      description:
        "I'm confused about when to use CSS Grid versus Flexbox. Both seem to solve similar layout problems. Can someone explain the key differences and use cases...",
      username: "CSSNewbie",
      answers: 8,
      tags: ["css", "flexbox", "grid"],
      timeAgo: "8 hours ago",
    },
    {
      id: 5,
      title: "Docker container not starting after build",
      description:
        "My Docker container builds successfully but fails to start. The error message is quite cryptic and I'm not sure how to debug this issue...",
      username: "DevOpsGuru",
      answers: 1,
      tags: ["docker", "containers"],
      timeAgo: "10 hours ago",
    },
    {
      id: 6,
      title: "MongoDB aggregation pipeline optimization",
      description:
        "I have a complex aggregation pipeline that's running very slowly on large datasets. Looking for ways to optimize performance...",
      username: "DataExpert",
      answers: 4,
      tags: ["mongodb", "aggregation"],
      timeAgo: "12 hours ago",
    },
    {
      id: 7,
      title: "JavaScript async/await vs Promises",
      description:
        "What are the practical differences between using async/await and traditional Promise chains? When should I use one over the other...",
      username: "JSCoder",
      answers: 6,
      tags: ["javascript", "async", "promises"],
      timeAgo: "14 hours ago",
    },
    {
      id: 8,
      title: "Git merge conflicts resolution strategies",
      description:
        "I frequently encounter merge conflicts in my team projects. What are the best practices for resolving and preventing merge conflicts...",
      username: "GitMaster",
      answers: 3,
      tags: ["git", "merge-conflicts"],
      timeAgo: "16 hours ago",
    },
  ];

  const questionsPerPage = 3;

  // Filter and search questions
  const filteredQuestions = useMemo(() => {
    let filtered = [...allQuestions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (q) =>
          q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply sorting based on selected filter
    switch (selectedFilter) {
      case "Newest":
        // Already sorted by newest
        break;
      case "Unanswered":
        filtered = filtered.filter((q) => q.answers === 0);
        break;
      case "Active":
        filtered = filtered.sort((a, b) => b.answers - a.answers);
        break;
      case "Votes":
        filtered = filtered.sort((a, b) => b.answers * 2 - a.answers * 2);
        break;
      case "Frequent":
        filtered = filtered.sort((a, b) => b.answers - a.answers);
        break;
    }

    return filtered;
  }, [searchTerm, selectedFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShowFilterDropdown(false);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Handle question click
  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const handleBackToHome = () => {
    setSelectedQuestion(null);
  };

  // Question Detail Page Component
  const QuestionDetailPage = ({ question, onBack }) => {
    const [newAnswer, setNewAnswer] = useState("");
    const [answers, setAnswers] = useState([
      {
        id: 1,
        content: `The || Operator.
The + Operator.
The CONCAT Function.`,
        author: "SQLExpert",
        votes: 12,
        accepted: true,
        timeAgo: "2 hours ago",
      },
      {
        id: 2,
        content:
          "Details about different approaches to joining columns in SQL...",
        author: "DataMaster",
        votes: 5,
        accepted: false,
        timeAgo: "4 hours ago",
      },
    ]);

    const handleSubmitAnswer = () => {
      if (newAnswer.trim()) {
        const answer = {
          id: answers.length + 1,
          content: newAnswer,
          author: "CurrentUser",
          votes: 0,
          accepted: false,
          timeAgo: "just now",
        };
        setAnswers([...answers, answer]);
        setNewAnswer("");
      }
    };

    const handleVote = (answerId, direction) => {
      setAnswers(
        answers.map((answer) =>
          answer.id === answerId
            ? { ...answer, votes: answer.votes + (direction === "up" ? 1 : -1) }
            : answer
        )
      );
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                Home
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                👤
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Questions
          </button>

          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-600">
            <span className="text-blue-600 font-medium">Question</span>
            <span className="mx-2">›</span>
            <span className="text-gray-500">How to join 2 columns...</span>
          </nav>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {question.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {question.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                  {question.username.charAt(0)}
                </div>
                <span className="font-medium text-gray-700">
                  {question.username}
                </span>
              </div>
              <span>{question.timeAgo}</span>
            </div>
          </div>

          {/* Answers Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm">
                {answers.length}
              </span>
              Answers
            </h2>

            <div className="space-y-6">
              {answers.map((answer) => (
                <div
                  key={answer.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
                >
                  <div className="flex gap-6">
                    {/* Vote buttons */}
                    <div className="flex flex-col items-center gap-3">
                      <button
                        onClick={() => handleVote(answer.id, "up")}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 text-green-700 flex items-center justify-center transition-all transform hover:scale-105 shadow-md"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                        </svg>
                      </button>
                      <span className="text-xl font-bold text-gray-900 px-2 py-1 bg-gray-100 rounded-lg">
                        {answer.votes}
                      </span>
                      <button
                        onClick={() => handleVote(answer.id, "down")}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 flex items-center justify-center transition-all transform hover:scale-105 shadow-md"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                        </svg>
                      </button>
                      {answer.accepted && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white flex items-center justify-center mt-2 shadow-lg">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Answer content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Answer {answer.id}
                        </h3>
                        {answer.accepted && (
                          <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            ✓ Accepted
                          </span>
                        )}
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                          {answer.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                          {answer.author.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-700">
                          {answer.author}
                        </span>
                        <span>•</span>
                        <span>{answer.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Answer */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Submit Your Answer
            </h3>

            {/* Toolbar */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl p-3 flex gap-2 text-sm border border-gray-200">
              <button className="px-3 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm font-bold">
                B
              </button>
              <button className="px-3 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm italic">
                I
              </button>
              <button className="px-3 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm underline">
                U
              </button>
              <button className="px-3 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                ≡
              </button>
              <button className="px-3 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                ≣
              </button>
              <button className="px-3 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                ⊡
              </button>
              <button className="px-3 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                🔗
              </button>
              <button className="px-3 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                📷
              </button>
              <button className="px-3 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                {}
              </button>
            </div>

            {/* Text Area */}
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Write your answer here..."
              className="w-full h-40 p-6 bg-white text-gray-800 rounded-b-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none text-lg leading-relaxed"
            />

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmitAnswer}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="fixed bottom-6 left-6 bg-white/90 backdrop-blur-md text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-gray-200">
          55% Complete
        </div>
      </div>
    );
  };

  // If a question is selected, show the detail page
  if (selectedQuestion) {
    return (
      <QuestionDetailPage
        question={selectedQuestion}
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Where developers learn, share, and build their careers
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg">
            Ask New Question
          </button>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
            >
              {selectedFilter}
              <ChevronDown className="w-4 h-4" />
            </button>

            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-10 min-w-full overflow-hidden">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(option)}
                    className="block w-full text-left px-6 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md hover:shadow-lg transition-all"
            />
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {currentQuestions.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                <p className="text-gray-500 text-lg">
                  No questions found matching your criteria.
                </p>
              </div>
            </div>
          ) : (
            currentQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                onClick={() => handleQuestionClick(question)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {question.title}
                  </h3>
                  <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                    {question.answers} ans
                  </span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {question.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="font-medium">{question.username}</span>
                  <span>{question.timeAgo}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl border border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {renderPagination().map((page, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof page === "number" && handlePageChange(page)
                }
                disabled={page === "..."}
                className={`px-4 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg ${
                  page === currentPage
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white transform scale-105"
                    : page === "..."
                    ? "cursor-default text-gray-400 border-none shadow-none"
                    : "border border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl border border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
>>>>>>> de3ee47849b9e65a328fd99b53372f11d829aba7
