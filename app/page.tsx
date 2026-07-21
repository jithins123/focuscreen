"use client";

import { useEffect, useState } from "react";

const defaults = {
  goal: "Make meaningful progress on what matters most.",
  tasks: ["Begin with the hardest thing", "Protect one deep-work block", "End the day with a clear mind"],
};

const backgrounds = [
  { src: "/focus-mountains-hq.jpg", name: "Alpine lake" },
  { src: "/focus-forest.jpg", name: "Dawn forest" },
  { src: "/focus-ocean.jpg", name: "Twilight coast" },
];

function Icon({ name }: { name: "play" | "pause" | "expand" | "check" | "reset" | "close" | "minimize" | "restore" | "previous" | "next" | "edit" }) {
  const paths = {
    play: <path d="m8 5 11 7-11 7V5Z" />,
    pause: <><path d="M9 5v14M15 5v14" /></>,
    expand: <><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    reset: <path d="M4 12a8 8 0 1 0 2.35-5.65L4 8m0-4v4h4" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    minimize: <path d="M6 12h12" />,
    restore: <path d="M7 7h10v10H7z" />,
    previous: <path d="m15 6-6 6 6 6" />,
    next: <path d="m9 6 6 6-6 6" />,
    edit: <><path d="M4 20h4l11-11-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [goal, setGoal] = useState(defaults.goal);
  const [tasks, setTasks] = useState(defaults.tasks);
  const [done, setDone] = useState([false, false, false]);
  const [editing, setEditing] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [playerMinimized, setPlayerMinimized] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/watch?v=jfKfPfyJRdk");
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerMode, setTimerMode] = useState<"focus" | "break">("focus");
  const [duration, setDuration] = useState(45);
  const [remaining, setRemaining] = useState(45 * 60);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [timerComplete, setTimerComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("stillpoint-day");
    const savedBackground = Number(localStorage.getItem("stillpoint-background"));
    if (Number.isInteger(savedBackground) && savedBackground >= 0 && savedBackground < backgrounds.length) setBackgroundIndex(savedBackground);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setGoal(data.goal ?? defaults.goal);
        setTasks(data.tasks ?? defaults.tasks);
        setDone(data.done ?? [false, false, false]);
        setYoutubeUrl(data.youtubeUrl ?? "https://www.youtube.com/watch?v=jfKfPfyJRdk");
      } catch { /* keep defaults */ }
    }
    const clockTimer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  useEffect(() => {
    localStorage.setItem("stillpoint-day", JSON.stringify({ goal, tasks, done, youtubeUrl }));
  }, [goal, tasks, done, youtubeUrl]);

  useEffect(() => localStorage.setItem("stillpoint-background", String(backgroundIndex)), [backgroundIndex]);

  useEffect(() => {
    if (!endAt) return;
    const tick = () => {
      const next = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setRemaining(next);
      if (next === 0) {
        setEndAt(null);
        setTimerComplete(true);
        setTimerOpen(false);
      }
    };
    tick();
    const interval = setInterval(tick, 250);
    return () => clearInterval(interval);
  }, [endAt]);

  const selectDuration = (minutes: number, mode: "focus" | "break" = "focus") => {
    setDuration(minutes);
    setRemaining(minutes * 60);
    setTimerMode(mode);
    setEndAt(null);
    setTimerComplete(false);
  };
  const toggleTimer = () => setEndAt(endAt ? null : Date.now() + remaining * 1000);
  const resetTimer = () => { setEndAt(null); setRemaining(duration * 60); setTimerComplete(false); };
  const addTen = () => { setRemaining(10 * 60); setDuration(10); setTimerMode("focus"); setEndAt(Date.now() + 10 * 60 * 1000); setTimerComplete(false); };
  const startBreak = () => { selectDuration(10, "break"); setEndAt(Date.now() + 10 * 60 * 1000); };
  const formatTimer = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  const videoId = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/))([^?&/]+)/)?.[1] ?? "jfKfPfyJRdk";
  const date = new Intl.DateTimeFormat("en-AU", { weekday: "long", day: "numeric", month: "long" }).format(time);
  const clockParts = new Intl.DateTimeFormat("en-AU", { hour: "2-digit", minute: "2-digit", hour12: true }).formatToParts(time);
  const hours = clockParts.find((part) => part.type === "hour")?.value ?? "00";
  const minutes = clockParts.find((part) => part.type === "minute")?.value ?? "00";
  const period = clockParts.find((part) => part.type === "dayPeriod")?.value.toUpperCase() ?? "";
  const seconds = String(time.getSeconds()).padStart(2, "0");

  return (
    <main className={`focus-shell ${timerMode === "break" && endAt ? "break-mode" : ""}`} style={{ backgroundImage: `url('${backgrounds[backgroundIndex].src}')` }}>
      <div className="veil" />
      <header>
        <a className="brand" href="#top" aria-label="Focuscreen home"><span /> FOCUSCREEN</a>
        <div className="date-block">
          <div className="flip-clock" aria-label={`${hours}:${minutes}:${seconds} ${period}`}>
            <div className="flip-unit"><strong>{hours}</strong><i /></div>
            <b className="flip-colon">:</b>
            <div className="flip-unit"><strong>{minutes}</strong><i /></div>
            <span className="flip-period">{period}</span>
            <span className="flip-seconds">{seconds}</span>
            <span className="flip-date">{date}</span>
          </div>
        </div>
      </header>

      <section className="content" id="top">
        <div className="goal-label-row"><p className="eyebrow">CURRENT GOAL</p><button className={editing ? "editing" : ""} onClick={() => setEditing(!editing)} aria-label={editing ? "Finish editing day" : "Edit day"} title={editing ? "Finish editing" : "Edit day"}><Icon name={editing ? "check" : "edit"} /></button></div>
        {editing ? (
          <textarea className="goal-input" value={goal} onChange={(e) => setGoal(e.target.value)} autoFocus aria-label="Current goal" />
        ) : (
          <h1 onClick={() => setEditing(true)} title="Click to edit">{goal}</h1>
        )}
        <div className="rule" />
        <div className="priorities-head"><p>THREE THINGS THAT MATTER</p></div>
        <ol className="tasks">
          {tasks.map((task, i) => (
            <li key={i} className={done[i] ? "complete" : ""}>
              <button className="check" aria-label={`Mark task ${i + 1} ${done[i] ? "incomplete" : "complete"}`} onClick={() => setDone(done.map((x, n) => n === i ? !x : x))}>{done[i] ? <Icon name="check" /> : i + 1}</button>
              {editing ? <input value={task} maxLength={72} aria-label={`Priority ${i + 1}`} onChange={(e) => setTasks(tasks.map((x, n) => n === i ? e.target.value : x))} /> : <span>{task}</span>}
            </li>
          ))}
        </ol>
      </section>

      {timerOpen && (
        <aside className="timer-card" aria-label="Focus timer settings">
          <div className="timer-card-head"><span>{timerMode === "focus" ? "FOCUS SESSION" : "REST AND RESET"}</span><button onClick={() => setTimerOpen(false)} aria-label="Close timer settings"><Icon name="close" /></button></div>
          <div className="timer-big">{formatTimer(remaining)}</div>
          <div className="timer-actions">
            <button className="timer-main" onClick={toggleTimer} disabled={remaining === 0}><Icon name={endAt ? "pause" : "play"} /> {endAt ? "Pause" : "Start"}</button>
            <button className="timer-reset" onClick={resetTimer} aria-label="Reset timer"><Icon name="reset" /></button>
          </div>
          <p>CHOOSE A FOCUS LENGTH</p>
          <div className="presets">{[25,45,60,90].map((minutes) => <button key={minutes} className={duration === minutes && timerMode === "focus" ? "selected" : ""} onClick={() => selectDuration(minutes)}>{minutes}</button>)}</div>
          <label className="custom-time">Custom <input type="number" min="1" max="180" value={duration} onChange={(e) => selectDuration(Math.max(1, Math.min(180, Number(e.target.value))))} /> min</label>
        </aside>
      )}

      {timerComplete && (
        <aside className="timer-complete" role="dialog" aria-label="Focus session complete">
          <span>SESSION COMPLETE</span><h2>Nicely done.</h2><p>Choose what feels right next.</p>
          <div><button onClick={startBreak}>Take a 10 min break</button><button onClick={addTen}>Focus 10 more</button><button onClick={() => setTimerComplete(false)}>Finish</button></div>
        </aside>
      )}

      {playerOpen && (
        <aside className={`youtube-player ${playerMinimized ? "minimized" : ""}`} aria-label="YouTube focus player">
          <div className="player-head"><span>{playerMinimized ? "YOUTUBE IS PLAYING" : "YOUTUBE PLAYER"}</span><div className="player-actions"><button onClick={() => setPlayerMinimized(!playerMinimized)} aria-label={playerMinimized ? "Restore YouTube player" : "Minimize YouTube player"}><Icon name={playerMinimized ? "restore" : "minimize"} /></button><button onClick={() => { setPlayerOpen(false); setPlayerMinimized(false); }} aria-label="Stop and close YouTube player"><Icon name="close" /></button></div></div>
          <div className="player-content" aria-hidden={playerMinimized}><iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} title="YouTube focus music" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /><label htmlFor="youtube-url">Use a different YouTube video</label><input id="youtube-url" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="Paste a YouTube link" /></div>
        </aside>
      )}

      <nav className="background-switcher" aria-label="Choose background image">
        <button onClick={() => setBackgroundIndex((backgroundIndex - 1 + backgrounds.length) % backgrounds.length)} aria-label="Previous background"><Icon name="previous" /></button>
        <div>{backgrounds.map((background, index) => <button key={background.src} className={index === backgroundIndex ? "active" : ""} onClick={() => setBackgroundIndex(index)} aria-label={`Show ${background.name}`} aria-current={index === backgroundIndex ? "true" : undefined} />)}</div>
        <button onClick={() => setBackgroundIndex((backgroundIndex + 1) % backgrounds.length)} aria-label="Next background"><Icon name="next" /></button>
      </nav>

      <a className="credit" href="https://repromptingproject.com" target="_blank" rel="noopener noreferrer">Focuscreen by <span>Reprompting Project</span></a>

      <footer>
        <button className={`sound ${playerOpen ? "active" : ""}`} onClick={() => { setPlayerOpen(!playerOpen); setPlayerMinimized(false); }} aria-label={playerOpen ? "Stop YouTube music" : "Play YouTube focus music"}><span className="sound-icon"><Icon name={playerOpen ? "pause" : "play"} /></span><span><small>{playerOpen ? "NOW PLAYING Â· CLICK TO STOP" : "FOCUS MUSIC"}</small><strong>YouTube player</strong></span>{playerOpen && <i className="waves"><b /><b /><b /><b /></i>}</button>
        <button className={`timer-pill ${endAt ? "running" : ""}`} onClick={() => setTimerOpen(!timerOpen)} aria-label="Open focus timer"><span>{timerMode.toUpperCase()}</span><strong>{formatTimer(remaining)}</strong><i /></button>
        <button className="expand" onClick={() => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()} aria-label="Toggle full screen"><Icon name="expand" /></button>
      </footer>
    </main>
  );
}
