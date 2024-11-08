import { getUser } from "./getUser";
import { checkRateLimit } from "@/lib/rate-limiter";


export async function chatBotResponse(input : string): Promise<{response: string, error: string| null}> {
  const user = await getUser();

  if (!user) {
      return {response:"", error: "User not found" };
  }

  const {success, remainingTime} = await checkRateLimit();

  if (!success) {
    return {
      response:"", 
      error: `Please wait ${remainingTime} seconds before sending another message.` 
    };
  }

  // console.log(process.env.NEXT_PUBLIC_VULTR_API_KEY);
  // return {response:"Thanks for your message! This is a demo response.",
  // error: null
  // };

  const body = {
    "model": "llama2-13b-chat-Q5_K_M",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant, answering the user's questions to the best of you abilities."
      },
      {
        "role": "user",
        "content": input
      }
    ],
    "max_tokens": 50,
    "seed": -1,
    "temperature": 0.8,
    "top_k": 40,
    "top_p": 0.9,
    "stream": false
  }

  const response = await fetch("https://api.vultrinference.com/v1/chat/completions", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VULTR_API_KEY}`
    },
    body: JSON.stringify(body),
    redirect: "follow"
  });

  if (!response.ok) {
    return {response:"", error: "Error in response" };
  }
  const data = await response.json();

  return {response: data.choices[0].message.content, error: null};
}