import { SubmissionRecord } from '../types';

const SUBMISSIONS_KEY = 'edu-tech-submissions-v1';

const INITIAL_SUBMISSIONS: SubmissionRecord[] = [
  {
    id: 'sub-1',
    problemId: 'two-sum',
    problemTitle: '1. Two Sum',
    language: 'python',
    status: 'Accepted',
    runtimeMs: 42,
    testCasesPassed: 3,
    totalTestCases: 3,
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    code: `def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []`,
  },
  {
    id: 'sub-2',
    problemId: 'valid-palindrome',
    problemTitle: '125. Valid Palindrome',
    language: 'cpp',
    status: 'Accepted',
    runtimeMs: 28,
    testCasesPassed: 3,
    totalTestCases: 3,
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    code: `#include <iostream>\n// Palindrome solved with two pointers`,
  },
  {
    id: 'sub-3',
    problemId: 'fizz-buzz',
    problemTitle: '412. Fizz Buzz',
    language: 'javascript',
    status: 'Wrong Answer',
    runtimeMs: 35,
    testCasesPassed: 2,
    totalTestCases: 3,
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    code: `function fizzBuzz(n) {\n    return [];\n}`,
  },
];

export function getStoredSubmissions(): SubmissionRecord[] {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (!raw) {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(INITIAL_SUBMISSIONS));
      return INITIAL_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SUBMISSIONS;
  }
}

export function saveSubmission(submission: Omit<SubmissionRecord, 'id' | 'timestamp'>): SubmissionRecord {
  const all = getStoredSubmissions();
  const newRecord: SubmissionRecord = {
    ...submission,
    id: `sub-${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
  const updated = [newRecord, ...all];
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save submission to localStorage', err);
  }
  return newRecord;
}

export function getStats() {
  const submissions = getStoredSubmissions();
  const accepted = submissions.filter((s) => s.status === 'Accepted');
  const uniqueSolved = new Set(accepted.map((s) => s.problemId)).size;
  const accuracy = submissions.length ? Math.round((accepted.length / submissions.length) * 100) : 100;
  return {
    totalSubmissions: submissions.length,
    acceptedSubmissions: accepted.length,
    problemsSolved: uniqueSolved,
    accuracy,
    currentStreak: 4,
  };
}
