import React from 'react';
import { PROBLEMS } from '../data/problems';
import { getStoredSubmissions } from '../services/storage';
import {
  ShieldCheck,
  Users,
  Code2,
  FileCheck2,
  Activity,
  Server,
  Plus,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminPage: React.FC = () => {
  const submissions = getStoredSubmissions();

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Staff & Administrator Portal
            </h1>
          </div>
          <p className="text-xs text-gray-400">
            Monitor coding assessment submissions, manage challenges, and oversee platform performance.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sandbox Cloud Engine: LIVE</span>
          </span>
        </div>
      </div>

      {/* 4 Admin Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#15151a] border border-[#23232b] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">Problem Bank</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{PROBLEMS.length} Active</div>
          <div className="text-[11px] text-gray-400">Multi-language enabled</div>
        </div>

        <div className="bg-[#15151a] border border-[#23232b] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">Submissions Logged</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{submissions.length}</div>
          <div className="text-[11px] text-gray-400">Total automated evaluations</div>
        </div>

        <div className="bg-[#15151a] border border-[#23232b] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">Active Test Takers</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">12 Candidates</div>
          <div className="text-[11px] text-emerald-400 font-medium">Screening in progress</div>
        </div>

        <div className="bg-[#15151a] border border-[#23232b] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">Compiler Latency</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">&lt; 350 ms</div>
          <div className="text-[11px] text-gray-400">Wandbox cloud sandbox</div>
        </div>
      </div>

      {/* Problem Management Overview */}
      <div className="bg-[#15151a] border border-[#23232b] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#23232b] pb-3">
          <div className="space-y-0.5">
            <h2 className="text-sm font-semibold text-white">Curated Assessment Challenges</h2>
            <p className="text-xs text-gray-400">
              Problems configured with automated test suites across Python, C++, Java, and JS.
            </p>
          </div>
          <Link
            to="/problems"
            className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center space-x-1"
          >
            <span>Open Library</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-[#202028]">
          {PROBLEMS.map((problem) => (
            <div
              key={problem.id}
              className="py-3.5 flex items-center justify-between hover:bg-[#1a1a22] px-3 rounded-xl transition-colors"
            >
              <div className="space-y-1">
                <span className="font-semibold text-white text-xs">{problem.title}</span>
                <div className="text-[11px] text-gray-400 font-mono">
                  Category: {problem.category} • {problem.testCases.length} Test Cases
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {problem.difficulty}
                </span>
                <Link
                  to={`/problems/${problem.id}`}
                  className="px-3 py-1 rounded-lg bg-[#22222a] hover:bg-amber-500 hover:text-black text-gray-300 text-xs font-semibold border border-[#30303c] transition-all"
                >
                  Test Solution
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
