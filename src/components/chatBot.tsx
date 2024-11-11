"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatBotResponse } from '@/actions/chatBotAction';
import { toast } from 'sonner';

interface Message {
  text: string;
  isBot: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const coolDown = 10 * 1000; // 10 secs

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: any) => {
    e.preventDefault();
    const question = input;
    setInput('');

    const now = Date.now();
    const timeSinceLastMessage = now - lastMessageTime;
    if (timeSinceLastMessage < coolDown) {
      const remainingTime = Math.ceil((coolDown - timeSinceLastMessage) / 1000);
      setMessages(prev => [...prev, { text: `Please wait ${remainingTime} seconds before sending another message.`, isBot: true }]);
      return;
    }

    if (!question.trim()) return;
    //console.log(input);
    // Add user message
    setIsLoading(true);
    setLastMessageTime(now);

    setMessages(prev => [...prev, { text: input, isBot: false }]);
    
    const {response, error} = await chatBotResponse(question);

    if(!error){
        setMessages(prev => [...prev, { text: response, isBot: true }]);
    } else {
      toast.message('Error', {
        description: error,
        duration: 3000
      });
      setMessages(prev => prev.slice(0, -1));
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-6 z-20">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg bg-blue-600 hover:bg-blue-700"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-full md:w-96 h-[30rem] flex flex-col shadow-xl">
          {/* Header */}
          <div className="p-4 bg-blue-700 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat Support</h3>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isBot
                      ? 'bg-gray-100 text-blue-800'
                      : 'bg-blue-600 text-blue-50'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? "Please wait..." : "Type a message..."}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default ChatBot;