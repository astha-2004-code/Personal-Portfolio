
import React, { useState, useEffect, useMemo } from 'react';
import { Search, User, Briefcase, GraduationCap, Github, Linkedin, ExternalLink, Activity, Terminal, Trophy, Mail } from 'lucide-react';
import { Profile, Project } from './types';

const INITIAL_PROFILE: Profile = {
  name: "Astha Jha",
  email: "asthajha0613@gmail.com",
  education: "B.Tech in Electronics and Communication, NIT Delhi (CGPA: 7.15)",
  skills: ["C", "C++", "JavaScript", "Python", "HTML", "CSS", "React", "Node.js", "Express.js", "SQL", "MongoDB", "Git", "GitHub"],
  work: [
    { company: "IIT Jammu", role: "Full Stack Web Developer Intern", duration: "June 2025 - July 2025" }
  ],
  links: {
    github: "https://github.com/astha-2004-code",
    linkedin: "https://linkedin.com/in/astha-jha-2oo4",
    portfolio: "https://fastidious-cendol-1f6fb1.netlify.app"
  },
  projects: [
    {
      id: "1",
      title: "Blood Bridge",
      description: "Full-stack blood donation management platform connecting donors and recipients with authentication and request tracking.",
      links: ["https://github.com/astha-2004-code/Blood-Bridge"],
      skills: ["MongoDB", "Express", "React", "Node.js"]
    },
    {
      id: "2",
      title: "Weather Monitoring Website",
      description: "Responsive weather dashboard integrating SheCodes Weather API for real-time temperature, wind, and humidity data.",
      links: ["https://github.com/astha-2004-code/Weather-app"],
      skills: ["HTML", "CSS", "JavaScript"]
    },
    {
      id: "3",
      title: "React To-Do List",
      description: "Task management application featuring creation, deletion, and filtering using React Hooks and Context API.",
      links: ["https://github.com/astha-2004-code/react-todo-app"],
      skills: ["React", "JavaScript", "HTML", "CSS"]
    }
  ]
};

const ACHIEVEMENTS = [
  { title: "AlgoUniversity Tech Fellowship (ATF)", subtitle: "National Winner & ATF Fellow (Top 200 Nationwide)", date: "Dec 2025" },
  { title: "Google Girls Hackathon", subtitle: "Semi-finalist for national hackathon for women coders", date: "Apr 2025" },
  { title: "Infosys STEM Star Scholar", subtitle: "National STEM Scholar", date: "2023 - Present" },
  { title: "Infosys Future Ready Program", subtitle: "Selected among 195 girls for training at SEZ Campus, Hyderabad", date: "Feb 2025" }
];

const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'api-logs'>('profile');
  const [logs, setLogs] = useState<string[]>([]);

  const logApiCall = (method: string, endpoint: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${method} ${endpoint}`, ...prev].slice(0, 10));
  };

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return profile.projects;
    logApiCall('GET', `/projects?q=${searchQuery}`);
    const q = searchQuery.toLowerCase();
    return profile.projects.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.skills.some(s => s.toLowerCase().includes(q))
    );
  }, [searchQuery, profile.projects]);

  const topSkills = useMemo(() => {
    logApiCall('GET', '/skills/top');
    return profile.skills.slice(0, 6);
  }, [profile.skills]);

  useEffect(() => {
    logApiCall('GET', '/health');
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-slate-900 text-white p-6 space-y-8 sticky top-0 h-auto md:h-screen shadow-2xl z-20">
        <div className="flex items-center space-x-2 text-indigo-400">
          <Terminal size={24} />
          <h1 className="text-xl font-bold tracking-tight">ASTHA-API</h1>
        </div>

        <div className="space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'profile' ? 'bg-indigo-600 shadow-lg shadow-indigo-900/50 scale-105' : 'hover:bg-slate-800'}`}
          >
            <User size={20} />
            <span className="font-medium">Profile</span>
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'projects' ? 'bg-indigo-600 shadow-lg shadow-indigo-900/50 scale-105' : 'hover:bg-slate-800'}`}
          >
            <Briefcase size={20} />
            <span className="font-medium">Portfolio</span>
          </button>
          <button 
            onClick={() => setActiveTab('api-logs')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'api-logs' ? 'bg-indigo-600 shadow-lg shadow-indigo-900/50 scale-105' : 'hover:bg-slate-800'}`}
          >
            <Activity size={20} />
            <span className="font-medium">API Logs</span>
          </button>
        </div>

        <div className="pt-8 border-t border-slate-800">
          <p className="text-xs text-slate-500 uppercase font-bold mb-4 tracking-wider">Expertise</p>
          <div className="flex flex-wrap gap-2">
            {topSkills.map(skill => (
              <span key={skill} className="px-2 py-1 bg-slate-800 text-[10px] rounded border border-slate-700 text-slate-300">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-50 overflow-y-auto">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Query projects by tech stack..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-tight">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
              <span>v2.5.0-STABLE</span>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-4xl mx-auto">
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <User size={120} />
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="flex-1">
                    <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{profile.name}</h2>
                    <div className="flex items-center gap-2 text-slate-500 mt-2 font-medium">
                      <Mail size={16} />
                      <a href={`mailto:${profile.email}`} className="hover:text-indigo-600 transition underline decoration-indigo-200 underline-offset-4">{profile.email}</a>
                    </div>
                    <div className="flex space-x-3 mt-8">
                      <a href={profile.links.github} target="_blank" className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200"><Github size={20}/></a>
                      <a href={profile.links.linkedin} target="_blank" className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"><Linkedin size={20}/></a>
                      <a href={profile.links.portfolio} target="_blank" className="p-3 bg-white text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm"><ExternalLink size={20}/></a>
                    </div>
                  </div>
                  <div className="w-full md:w-72 p-6 bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 shadow-inner">
                    <h4 className="text-xs font-bold text-indigo-600 uppercase mb-3 flex items-center gap-2 tracking-widest">
                      <GraduationCap size={16} /> Education
                    </h4>
                    <p className="text-slate-900 font-bold leading-snug">{profile.education}</p>
                    <p className="text-xs text-slate-500 mt-2">NIT Delhi | Electronics & Comm.</p>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-slate-800">
                    <Terminal size={20} className="text-indigo-500" /> Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 transition cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-slate-800">
                    <Briefcase size={20} className="text-indigo-500" /> Experience
                  </h3>
                  <div className="space-y-6">
                    {profile.work.map((job, i) => (
                      <div key={i} className="relative pl-6 border-l-2 border-indigo-500">
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-indigo-500"></div>
                        <p className="font-bold text-slate-900 leading-none">{job.role}</p>
                        <p className="text-sm font-medium text-indigo-600 mt-1">{job.company}</p>
                        <p className="text-xs text-slate-400 mt-1 italic">{job.duration}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800">
                  <Trophy size={20} className="text-yellow-500" /> Key Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ACHIEVEMENTS.map((ach, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition group">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition leading-tight">{ach.title}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase ml-2 shrink-0">{ach.date}</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-2 leading-relaxed">{ach.subtitle}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Built Projects</h2>
                  <p className="text-slate-500 mt-1">Full-stack & Frontend engineering results</p>
                </div>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold">{filteredProjects.length} Endpoints</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map(project => (
                  <div key={project.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:border-indigo-400 transition-all duration-300 group hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition leading-tight">{project.title}</h3>
                      <div className="flex gap-2">
                        {project.links.map((link, idx) => (
                          <a key={idx} href={link} target="_blank" className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition"><ExternalLink size={20} /></a>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">No matching projects</h3>
                  <p className="text-slate-500 mt-2 max-w-xs mx-auto">Try searching for core stacks like 'MERN', 'React', or 'Node'.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'api-logs' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl font-mono text-sm border-t-8 border-indigo-600">
                <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs ml-2">Resume-Endpoint-Debugger</span>
                  </div>
                  <span className="text-slate-600 text-[10px]">AUTH_MODE: ENV_KEY</span>
                </div>
                <div className="space-y-3 min-h-[300px]">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-4 text-slate-300 animate-in fade-in slide-in-from-left-2 duration-300">
                      <span className="text-slate-600 shrink-0 font-bold">[{i+1}]</span>
                      <span className="font-medium">{log}</span>
                      <span className="ml-auto text-indigo-400 font-bold">200 OK</span>
                    </div>
                  ))}
                  {logs.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-600">
                      <Activity size={40} className="mb-4 opacity-20" />
                      <p>Awaiting incoming requests...</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold mb-4">REST Endpoints</h3>
                  <div className="space-y-3">
                    <div className="group flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition cursor-help">
                      <code className="text-indigo-600 font-bold text-xs">GET /astha/profile</code>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Public</span>
                    </div>
                    <div className="group flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition cursor-help">
                      <code className="text-indigo-600 font-bold text-xs">GET /astha/projects</code>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Public</span>
                    </div>
                    <div className="group flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition cursor-help">
                      <code className="text-indigo-600 font-bold text-xs">POST /contact/message</code>
                      <span className="text-[10px] text-indigo-400 uppercase font-bold">Scoped</span>
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 flex flex-col justify-center">
                  <h3 className="text-lg font-bold mb-2">Build Status</h3>
                  <p className="text-indigo-100 text-sm leading-relaxed mb-4">CI/CD pipelines are active for all repositories mentioned in the project showcase.</p>
                  <div className="flex items-center gap-2 font-mono text-xs bg-indigo-700/50 p-2 rounded-lg">
                    <span className="text-indigo-300">$</span>
                    <span>deploy --production --resume</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
