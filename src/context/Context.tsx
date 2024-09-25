import { createContext, ReactNode, useState } from "react";
import runChat from "../config/gemini";

type ContextValueType = {
  delayPara: (index: number, nextWord: string) => void;
  newChat: () => void;
  onSent: (prompt?: string) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  recentPropmt: string;
  setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
  previousPrompt: string[];
  setPreviousPrompt: React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
  showResult: boolean;
  resultData: string;
};

type ContextType = {
  children: ReactNode;
};

// Create the context with the correct type
export const Context = createContext<ContextValueType | undefined>(undefined);

const ContextProvider = ({ children }: ContextType) => {
  const [input, setInput] = useState<string>("");
  const [recentPropmt, setRecentPrompt] = useState<string>("");
  const [previousPrompt, setPreviousPrompt] = useState<Array<string>>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultData, setResultData] = useState<string>("");

  const delayPara = (index: number, nextWord: string) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt?: string) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response: string;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPreviousPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }
    let responseArray = response.split("**");
    let newResponse: any = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    delayPara,
    newChat,
    onSent,
    input,
    setInput,
    recentPropmt,
    setRecentPrompt,
    previousPrompt,
    setPreviousPrompt,
    loading,
    showResult,
    resultData,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
