import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import axios from "axios";

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the specific question
        const questionRes = await axios.get(`/questions/${id}`);

        // Transform the data to match what the frontend expects
        const transformedQuestion = {
          id: questionRes.data._id,
          _id: questionRes.data._id,
          title: questionRes.data.questionTitle,
          description: questionRes.data.description,
          tags: questionRes.data.questionTags || [],
          answers: questionRes.data.noOfAnswers || 0,
          username: questionRes.data.userPosted,
          timeAgo: formatTimeAgo(questionRes.data.askedOn),
          upVotes: questionRes.data.upVote?.length || 0,
          downVotes: questionRes.data.downVote?.length || 0,
          askedOn: questionRes.data.askedOn,
        };

        setQuestion(transformedQuestion);

        // Fetch answers for this question
        const answersRes = await axios.get(`/questions/${id}/answers`);
        setAnswers(answersRes.data || []);
      } catch (error) {
        console.error("Failed to fetch question", error);
        setError("Failed to load question. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  // Helper function to format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const questionDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - questionDate) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  const handleBackToHome = () => {
    navigate("/dashboard");
  };

  const handleSubmitAnswer = async () => {
    if (newAnswer.trim()) {
      try {
        const response = await axios.post(`/questions/${id}/answer`, {
          content: newAnswer,
        });

        // Add the new answer to the list
        setAnswers([...answers, response.data]);
        setNewAnswer("");
      } catch (error) {
        console.error("Failed to submit answer", error);
      }
    }
  };

  // Fixed: Separate vote handlers for questions and answers
  const handleQuestionVote = async (direction) => {
    try {
      await axios.patch(`/questions/vote/${id}`, { value: direction });
      // Refresh question data to get updated vote counts
      const questionRes = await axios.get(`/questions/${id}`);
      setQuestion((prev) => ({
        ...prev,
        upVotes: questionRes.data.upVote?.length || 0,
        downVotes: questionRes.data.downVote?.length || 0,
      }));
    } catch (error) {
      console.error("Failed to vote on question", error);
    }
  };

  const handleAnswerVote = async (answerId, direction) => {
    try {
      await axios.post(`/questions/answers/${answerId}/vote`, {
        value: direction,
      });
      // Refresh answers to get updated vote counts
      const answersRes = await axios.get(`/questions/${id}/answers`);
      setAnswers(answersRes.data || []);
    } catch (error) {
      console.error("Failed to vote on answer", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading question...</p>
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <p className="text-red-600 text-lg mb-4">
              {error || "Question not found"}
            </p>
            <button
              onClick={handleBackToHome}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={handleBackToHome}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Questions
        </button>

        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600">
          <span className="text-blue-600 font-medium">Question</span>
          <span className="mx-2">›</span>
          <span className="text-gray-500">
            {question.title.substring(0, 30)}...
          </span>
        </nav>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex gap-6">
            {/* Question Vote buttons */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => handleQuestionVote("upVote")}
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
                {question.upVotes - question.downVotes}
              </span>
              <button
                onClick={() => handleQuestionVote("downVote")}
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
            </div>

            {/* Question content */}
            <div className="flex-1">
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
                key={answer._id || answer.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
              >
                <div className="flex gap-6">
                  {/* Answer Vote buttons */}
                  <div className="flex flex-col items-center gap-3">
                    <button
                      onClick={() =>
                        handleAnswerVote(answer._id || answer.id, "upVote")
                      }
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
                      {(answer.upVotes || 0) - (answer.downVotes || 0)}
                    </span>
                    <button
                      onClick={() =>
                        handleAnswerVote(answer._id || answer.id, "downVote")
                      }
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
                  </div>

                  {/* Answer content */}
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                        {answer.content || answer.body}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                        {(answer.author || answer.userAnswered || "U").charAt(
                          0
                        )}
                      </div>
                      <span className="font-medium text-gray-700">
                        {answer.author || answer.userAnswered || "Anonymous"}
                      </span>
                      <span>•</span>
                      <span>
                        {answer.timeAgo ||
                          formatTimeAgo(answer.answeredOn) ||
                          "Recently"}
                      </span>
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

          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="w-full h-40 p-6 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none text-lg leading-relaxed"
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
    </div>
  );
};

export default QuestionDetail;
