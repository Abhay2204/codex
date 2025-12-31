const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
});

export const api = {
  // Auth
  async register(name: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getUser() {
    const res = await fetch(`${API_URL}/user`, { headers: headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async updateUserStats(stats: { xp?: number; solved?: number; problemId?: string; streak?: number }) {
    const res = await fetch(`${API_URL}/user/stats`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(stats)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  // Leaderboard
  async getLeaderboard() {
    const res = await fetch(`${API_URL}/leaderboard`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  // Problems
  async getProblems() {
    const res = await fetch(`${API_URL}/problems`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getProblem(id: string) {
    const res = await fetch(`${API_URL}/problems/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  // Submissions
  async createSubmission(submission: { problemId: string; code: string; language: string; status: string; runtime?: string; memory?: string }) {
    const res = await fetch(`${API_URL}/submissions`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(submission)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getSubmissions() {
    const res = await fetch(`${API_URL}/submissions`, { headers: headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  // Rooms
  async getRooms() {
    const res = await fetch(`${API_URL}/rooms`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async createRoom(room: { name: string; maxParticipants: number; type: string; language: string }) {
    const res = await fetch(`${API_URL}/rooms`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(room)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async joinRoom(roomId: string) {
    const res = await fetch(`${API_URL}/rooms/${roomId}/join`, {
      method: 'POST',
      headers: headers()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  }
};
