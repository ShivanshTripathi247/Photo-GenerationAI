'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ImagePlus, Loader2, Send, X, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState('')
  const [promptSuggestions] = useState([
    "A cyberpunk cityscape at sunset with neon lights",
    "Portrait of a galaxy cat with cosmic eyes",
    "Ethereal forest with bioluminescent plants and mushrooms",
    "Futuristic architecture on a floating island"
  ])

  const Generate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    // Simulating API call - replace with your actual image generation API
    setTimeout(() => {
      // Mock response - replace with actual API call
      setGeneratedImage('/api/placeholder/800/800')
      setIsGenerating(false)
    }, 3000)
  }

  const handleClearPrompt = () => {
    setPrompt('')
  }

  const handleUseExample = (example) => {
    setPrompt(example)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 rounded-2xl gap-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center gap-2"
        >
          <h1 className="p-3 text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-red-400 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
            AI Image Creator
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transform your ideas into stunning visuals with our advanced AI image generator
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="relative bg-gray-950 rounded-xl border border-gray-800 overflow-hidden transition-all mb-4">
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 opacity-50"></div>
              
              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to create..."
                  className="w-full min-h-[200px] p-4 bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none z-10 relative"
                ></textarea>
                
                {/* Character counter */}
                <div className="absolute bottom-2 right-4 text-xs text-gray-500">
                  {prompt.length} / 500
                </div>
                
                {/* Clear button */}
                {prompt && (
                  <button 
                    onClick={handleClearPrompt}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Prompt suggestions */}
            <div className="mb-6">
              <h3 className="text-sm text-gray-400 mb-2 flex items-center">
                <Sparkles size={14} className="mr-2 text-fuchsia-400" />
                Try these examples
              </h3>
              <div className="flex flex-wrap gap-2">
                {promptSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleUseExample(suggestion)}
                    className="px-3 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg text-xs text-gray-300 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Settings and Generate Button */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:w-1/2">
                  <label className="text-xs text-gray-400 mb-1 block">Style</label>
                  <select className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-sm">
                    <option>Photorealistic</option>
                    <option>Digital Art</option>
                    <option>Fantasy</option>
                    <option>Abstract</option>
                  </select>
                </div>
                <div className="w-full md:w-1/2">
                  <label className="text-xs text-gray-400 mb-1 block">Aspect Ratio</label>
                  <select className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-sm">
                    <option>Square (1:1)</option>
                    <option>Portrait (3:4)</option>
                    <option>Landscape (4:3)</option>
                    <option>Widescreen (16:9)</option>
                  </select>
                </div>
              </div>
              
              <Button 
                onClick={Generate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-red-500 to-fuchsia-500 hover:from-red-600 hover:to-fuchsia-600 transition-all"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 size={18} className="mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Output Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col"
          >
            <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden h-full flex flex-col">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <h3 className="font-medium">Generated Image</h3>
                {generatedImage && (
                  <Button variant="outline" size="sm" className="text-xs bg-transparent border-gray-700 hover:bg-gray-800">
                    <ImagePlus size={14} className="mr-1" /> Save
                  </Button>
                )}
              </div>
              
              <div className="flex-1 flex items-center justify-center p-6 bg-[#0A0A0A]">
                {isGenerating ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-fuchsia-400 animate-spin"></div>
                      <div className="absolute inset-2 rounded-full border-r-2 border-l-2 border-red-400 animate-spin animation-delay-500"></div>
                      <div className="absolute inset-4 rounded-full border-t-2 border-fuchsia-400 animate-pulse"></div>
                    </div>
                    <p className="mt-4 text-gray-400 text-sm animate-pulse">Creating your masterpiece...</p>
                  </div>
                ) : generatedImage ? (
                  <img 
                    src={generatedImage}
                    alt="Generated image" 
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
                      <ImagePlus size={30} className="text-gray-600" />
                    </div>
                    <h3 className="text-gray-500 mb-2">No image generated yet</h3>
                    <p className="text-gray-600 text-sm">Enter a prompt and click Generate</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ImageGenerator