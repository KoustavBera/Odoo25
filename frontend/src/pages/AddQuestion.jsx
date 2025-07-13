import React, { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Smile,
  Link,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Send,
  Tag,
  FileText,
  Hash,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const popularTags = [
    "react",
    "javascript",
    "html",
    "css",
    "node.js",
    "python",
    "java",
    "typescript",
    "angular",
    "vue.js",
    "php",
    "mysql",
    "mongodb",
    "express",
    "tailwind",
  ];
  const emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "🤔",
    "💡",
    "🔥",
    "💯",
    "👍",
    "👎",
    "❤️",
    "⚡",
    "🚀",
    "🎯",
    "✨",
    "🎉",
    "🔧",
    "🐛",
    "💻",
    "📱",
  ];

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const addTag = (tagName) => {
    if (tagName && !tags.includes(tagName) && tags.length < 5) {
      setTags([...tags, tagName]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(currentTag);
    }
  };

  const insertEmoji = (emoji) => {
    execCommand("insertText", emoji);
    setShowEmojiPicker(false);
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      execCommand("createLink", linkUrl);
      execCommand("insertText", linkText);
      setShowLinkDialog(false);
      setLinkUrl("");
      setLinkText("");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        execCommand("insertImage", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalDescription = editorRef.current?.innerHTML || "";

    if (!title.trim() || !finalDescription.trim() || tags.length === 0) {
      toast.error("All fields are required");
      return;
    }

    const payload = {
      questionTitle: title,
      description: finalDescription,
      questionTags: tags,
    };

    try {
      await toast.promise(
        axios.post("/questions/ask", payload, {
          withCredentials: true,
        }),
        {
          loading: "Posting your question...",
          success: "Question posted successfully!",
          error: "Failed to post question",
        }
      );

      // ✅ Clear form
      setTitle("");
      setDescription("");
      setTags([]);
      editorRef.current.innerHTML = "";

      // ✅ Redirect to questions page or home
      navigate("/dashboard"); // or navigate(`/question/${newQuestion._id}`) if response includes ID
    } catch (err) {
      console.error("Error posting question:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ask a Question
          </h1>
          <p className="text-grey">Share your knowledge with the community</p>
        </div>

        {/* Form */}
        <div className="bg-white backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-400">
          {/* Title Section */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-black font-semibold mb-3">
              <FileText className="w-5 h-5 text-blue-400" />
              Question Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write a clear, descriptive title for your question..."
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {/* Description Section */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-black font-semibold mb-3">
              <Hash className="w-5 h-5 text-purple-400" />
              Description
            </label>

            {/* Rich Text Editor Toolbar */}
            <div className="bg-white border border-slate-300 rounded-t-lg p-3 flex flex-wrap gap-2">
              <div className="flex items-center gap-1 border-r border-slate-300 pr-2">
                <button
                  type="button"
                  onClick={() => execCommand("bold")}
                  className="p-2 hover:bg-slate-600 rounded text-black hover:text-white transition-colors"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("italic")}
                  className="p-2 hover:bg-slate-600 rounded text-black hover:text-white transition-colors"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("strikeThrough")}
                  className="p-2 hover:bg-slate-600 rounded text-black hover:text-white transition-colors"
                  title="Strikethrough"
                >
                  <Strikethrough className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-1 border-r border-slate-300 pr-2">
                <button
                  type="button"
                  onClick={() => execCommand("insertOrderedList")}
                  className="p-2 hover:bg-slate-600 rounded text-black hover:text-white transition-colors"
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("insertUnorderedList")}
                  className="p-2 hover:bg-slate-600 rounded text-black hover:text-white transition-colors"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-1 border-r border-slate-300 pr-2">
                <button
                  type="button"
                  onClick={() => execCommand("justifyLeft")}
                  className="p-2 hover:bg-slate-600 rounded text-black hover:text-white transition-colors"
                  title="Align Left"
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("justifyCenter")}
                  className="p-2 hover:bg-slate-600 rounded text-black hover:text-white transition-colors"
                  title="Align Center"
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("justifyRight")}
                  className="p-2 hover:bg-slate-600 rounded text-black hover:text-white transition-colors"
                  title="Align Right"
                >
                  <AlignRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-1">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 hover:bg-slate-600 rounded text-black hover:text-white transition-colors"
                    title="Add Emoji"
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute top-full left-0 mt-2 bg-slate-700 border border-slate-300 rounded-lg p-10 grid grid-cols-4 gap-10 z-10">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => insertEmoji(emoji)}
                          className="p-2 hover:bg-slate-600 rounded text-xl transition-all duration-150"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowLinkDialog(!showLinkDialog)}
                    className="p-2 hover:bg-slate-600 rounded text-black hover:text-white transition-colors"
                    title="Add Link"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                  {showLinkDialog && (
                    <div className="absolute top-full left-0 mt-2 bg-slate-700 border border-slate-300 rounded-lg p-4 w-64 z-10">
                      <input
                        type="url"
                        placeholder="Enter URL"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-black placeholder-slate-400 mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Link text"
                        value={linkText}
                        onChange={(e) => setLinkText(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400 mb-2"
                      />
                      <button
                        type="button"
                        onClick={insertLink}
                        className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
                      >
                        Add Link
                      </button>
                    </div>
                  )}
                </div>

                <label
                  className="p-2 hover:bg-slate-600 rounded text-black hover:text-white transition-colors cursor-pointer"
                  title="Upload Image"
                >
                  <Image className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Rich Text Editor */}
            <div
              ref={editorRef}
              contentEditable
              className="w-full min-h-[200px] px-4 py-3 bg-white border border-slate-300 border-t-0 rounded-b-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              style={{ caretColor: "white" }}
              placeholder="Describe your question in detail..."
              onInput={(e) => setDescription(e.target.innerHTML)}
            />
          </div>

          {/* Tags Section */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-black font-semibold mb-3">
              <Tag className="w-5 h-5 text-green-400" />
              Tags (up to 5)
            </label>

            {/* Current Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="w-4 h-4 bg-blue-700 rounded-full flex items-center justify-center text-xs hover:bg-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Tag Input */}
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a tag (press Enter to add)"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              disabled={tags.length >= 5}
            />

            {/* Popular Tags */}
            <div className="mt-3">
              <p className="text-black text-sm mb-2">Popular tags:</p>
              <div className="flex flex-wrap gap-2">
                {popularTags.slice(0, 10).map((tag, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="px-3 py-1 bg-white hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-black hover:text-white rounded-full text-sm border border-slate-300 transition-colors"
                    disabled={tags.includes(tag) || tags.length >= 5}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <Send className="w-5 h-5" />
              Post Your Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
