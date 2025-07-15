
export default function GroupsIntro() {
  return (
    <div className="h-[90dvh] md:h-[100dvh] flex flex-col items-center justify-center text-center bg-white text-white space-y-6">
      <img src="logo.svg" alt="Vartalaap" className="h-16 w-16" />
      <svg xmlns="http://www.w3.org/2000/svg" fill="#6b7280" viewBox="0 0 24 24" className="h-20 w-20">
        <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h5v-2.5c0-.98.32-1.86.88-2.59C7.82 13.9 7.97 13.02 8 12z" />
      </svg>
      <h1 className="text-3xl md:text-4xl font-semibold">Start a Group in Vartalaap</h1>
      <p className="max-w-md text-gray-400">
        Organize your conversations into topic‑based groups and reach everyone instantly with announcements.
      </p>
    </div>
  );
}
