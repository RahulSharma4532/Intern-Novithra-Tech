import React, { useState } from 'react';
import { PROBLEMS } from './data/problems';
import { Problem, SupportedLanguage, ExecutionResult } from './types';
import { Navbar } from './components/Navbar';
import { ProblemDescription } from './components/ProblemDescription';
import { CodeEditor } from './components/CodeEditor';
import { ConsoleOutput } from './components/ConsoleOutput';
import { executeCode } from './services/codeRunner';

export const App: React.FC = () => {
  const [problems] = useState<Problem[]>(PROBLEMS);
  const [currentProblem, setCurrentProblem] = useState<Problem>(PROBLEMS[0]);
  const [language, setLanguage] = useState<SupportedLanguage>('python');
  
  // Store code cache: key is `${problem.id}_${language}`
  const [codeCache, setCodeCache] = useState<Record<string, string>>({});
  
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');

  // Get current active code
  const cacheKey = `${currentProblem.id}_${language}`;
  const activeCode = codeCache[cacheKey] ?? currentProblem.starterCode[language];

  // Handler for code changes in editor
  const handleCodeChange = (newCode: string | undefined) => {
    setCodeCache((prev) => ({
      ...prev,
      [cacheKey]: newCode ?? '',
    }));
  };

  // Handler for problem change
  const handleSelectProblem = (problem: Problem) => {
    setCurrentProblem(problem);
    setResult(null);
    setCustomInput('');
  };

  // Handler for language change
  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    setResult(null);
  };

  // Handler for resetting code to starter boilerplate
  const handleResetCode = () => {
    setCodeCache((prev) => ({
      ...prev,
      [cacheKey]: currentProblem.starterCode[language],
    }));
    setResult(null);
  };

  // Run code against tests or custom input
  const handleRunCode = async () => {
    setIsRunning(true);
    setResult(null);

    try {
      const res = await executeCode(currentProblem, language, activeCode, customInput);
      setResult(res);
    } catch (err: any) {
      setResult({
        status: 'Runtime Error',
        testCaseResults: [],
        errorDetails: err?.message || 'Unexpected execution failure.',
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#121212] overflow-hidden text-gray-200">
      {/* Top Navigation */}
      <Navbar
        problems={problems}
        currentProblem={currentProblem}
        onSelectProblem={handleSelectProblem}
        onResetCode={handleResetCode}
      />

      {/* Main Split-Screen Workspace */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Pane: Problem Description (5 cols on lg) */}
        <section className="lg:col-span-5 h-[40vh] lg:h-full overflow-hidden">
          <ProblemDescription problem={currentProblem} />
        </section>

        {/* Right Pane: Editor & Test Console (7 cols on lg) */}
        <section className="lg:col-span-7 h-[60vh] lg:h-full flex flex-col overflow-hidden bg-[#1e1e1e]">
          {/* Top Half: Code Editor */}
          <div className="h-[60%] w-full overflow-hidden">
            <CodeEditor
              language={language}
              code={activeCode}
              onChange={handleCodeChange}
              onLanguageChange={handleLanguageChange}
            />
          </div>

          {/* Bottom Half: Console / Output Tabs */}
          <div className="h-[40%] w-full overflow-hidden">
            <ConsoleOutput
              problem={currentProblem}
              result={result}
              isRunning={isRunning}
              onRunCode={handleRunCode}
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
