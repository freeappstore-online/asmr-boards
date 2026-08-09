// AudioEngine.ts — generates all ASMR sounds procedurally via Web Audio API

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

let masterGain: GainNode | null = null;
function getMaster(): GainNode {
  const c = getCtx();
  if (!masterGain) {
    masterGain = c.createGain();
    masterGain.gain.value = 0.7;
    masterGain.connect(c.destination);
  }
  return masterGain;
}

export function setVolume(v: number) {
  getMaster().gain.value = v;
}

function noise(duration: number, freq: number, type: OscillatorType, attack: number, decay: number, vol = 0.3) {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(vol, c.currentTime + attack);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + attack + decay);
  osc.connect(g);
  g.connect(getMaster());
  osc.start(c.currentTime);
  osc.stop(c.currentTime + duration);
}

function whiteNoiseBurst(duration: number, vol = 0.15) {
  const c = getCtx();
  const bufferSize = c.sampleRate * duration;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = c.createBufferSource();
  source.buffer = buffer;
  const g = c.createGain();
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1200;
  filter.Q.value = 0.5;
  source.connect(filter);
  filter.connect(g);
  g.connect(getMaster());
  source.start();
  source.stop(c.currentTime + duration);
}

function chime(freq: number, vol = 0.25) {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 1.5);
  osc.connect(g);
  g.connect(getMaster());
  osc.start();
  osc.stop(c.currentTime + 1.5);
}

function tap(freq: number, vol = 0.2) {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.3, c.currentTime + 0.08);
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12);
  osc.connect(g);
  g.connect(getMaster());
  osc.start();
  osc.stop(c.currentTime + 0.15);
}

function pop(freq = 180, vol = 0.3) {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq * 2, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.5, c.currentTime + 0.05);
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08);
  osc.connect(g);
  g.connect(getMaster());
  osc.start();
  osc.stop(c.currentTime + 0.1);
}

function bell(freq: number, vol = 0.2) {
  const c = getCtx();
  [1, 2.756, 5.404].forEach((ratio, i) => {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = "sine";
    osc.frequency.value = freq * ratio;
    const v = vol / (i + 1);
    g.gain.setValueAtTime(v, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 2 - i * 0.3);
    osc.connect(g);
    g.connect(getMaster());
    osc.start();
    osc.stop(c.currentTime + 2);
  });
}

function rainDrop(vol = 0.1) {
  const c = getCtx();
  const freq = 300 + Math.random() * 800;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.4, c.currentTime + 0.06);
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
  osc.connect(g);
  g.connect(getMaster());
  osc.start();
  osc.stop(c.currentTime + 0.12);
}

function bubble(vol = 0.2) {
  const c = getCtx();
  const freq = 200 + Math.random() * 300;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, c.currentTime);
  osc.frequency.linearRampToValueAtTime(freq * 1.8, c.currentTime + 0.12);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.1, c.currentTime + 0.18);
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(vol, c.currentTime + 0.04);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.2);
  osc.connect(g);
  g.connect(getMaster());
  osc.start();
  osc.stop(c.currentTime + 0.22);
}

function squish(vol = 0.2) {
  const c = getCtx();
  whiteNoiseBurst(0.15, vol * 0.5);
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(120, c.currentTime);
  osc.frequency.linearRampToValueAtTime(60, c.currentTime + 0.15);
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.18);
  osc.connect(g);
  g.connect(getMaster());
  osc.start();
  osc.stop(c.currentTime + 0.2);
}

function windGust(vol = 0.12) {
  const c = getCtx();
  const bufferSize = c.sampleRate * 0.6;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = c.createBufferSource();
  source.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 400;
  filter.Q.value = 0.3;
  const g = c.createGain();
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(vol, c.currentTime + 0.2);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.6);
  source.connect(filter);
  filter.connect(g);
  g.connect(getMaster());
  source.start();
  source.stop(c.currentTime + 0.65);
}

function sparkle(vol = 0.18) {
  const freqs = [1200, 1600, 2000, 2400, 2800];
  freqs.forEach((f, i) => {
    setTimeout(() => chime(f + Math.random() * 200, vol * 0.6), i * 40);
  });
}

function click(vol = 0.25) {
  const c = getCtx();
  whiteNoiseBurst(0.03, vol);
  tap(900, vol * 0.5);
}

function woodTap(vol = 0.3) {
  tap(220 + Math.random() * 80, vol);
  whiteNoiseBurst(0.04, vol * 0.3);
}

function leafRustle(vol = 0.15) {
  whiteNoiseBurst(0.3, vol);
}

function birdChirp(vol = 0.2) {
  const c = getCtx();
  const freqs = [800, 1000, 1200, 900, 700];
  freqs.forEach((f, i) => {
    setTimeout(() => noise(0.08, f + Math.random() * 100, "sine", 0.01, 0.07, vol * 0.5), i * 80);
  });
}

function tickTock(vol = 0.3) {
  tap(600, vol);
  setTimeout(() => tap(500, vol * 0.8), 120);
}

function whisper(vol = 0.1) {
  const c = getCtx();
  const bufferSize = c.sampleRate * 0.4;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = c.createBufferSource();
  source.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2000;
  filter.Q.value = 2;
  const g = c.createGain();
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(vol, c.currentTime + 0.1);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.4);
  source.connect(filter);
  filter.connect(g);
  g.connect(getMaster());
  source.start();
  source.stop(c.currentTime + 0.45);
}

function mysteryAmbient(vol = 0.15) {
  [120, 180, 240].forEach((f, i) => {
    setTimeout(() => noise(0.8, f, "sine", 0.1, 0.7, vol * 0.4), i * 100);
  });
}

function candyPop(vol = 0.3) {
  pop(250 + Math.random() * 100, vol);
  setTimeout(() => pop(300 + Math.random() * 100, vol * 0.7), 60);
}

function waterDrop(vol = 0.2) {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(600, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.2);
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(vol, c.currentTime + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.25);
  osc.connect(g);
  g.connect(getMaster());
  osc.start();
  osc.stop(c.currentTime + 0.28);
}

function oceanWave(vol = 0.15) {
  const c = getCtx();
  const bufferSize = c.sampleRate * 1.5;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = c.createBufferSource();
  source.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 600;
  const g = c.createGain();
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(vol, c.currentTime + 0.5);
  g.gain.setValueAtTime(vol, c.currentTime + 0.8);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 1.5);
  source.connect(filter);
  filter.connect(g);
  g.connect(getMaster());
  source.start();
  source.stop(c.currentTime + 1.6);
}

export type SoundId =
  | "pop" | "tap" | "chime" | "bell" | "rain" | "bubble" | "squish"
  | "wind" | "sparkle" | "click" | "woodTap" | "leafRustle" | "birdChirp"
  | "tickTock" | "whisper" | "mysteryAmbient" | "candyPop" | "waterDrop"
  | "oceanWave" | "rainDrop";

export function playSound(id: SoundId) {
  try {
    switch (id) {
      case "pop": pop(); break;
      case "tap": tap(300 + Math.random() * 100); break;
      case "chime": chime(600 + Math.random() * 400); break;
      case "bell": bell(440 + Math.random() * 220); break;
      case "rain": for (let i = 0; i < 8; i++) setTimeout(() => rainDrop(), i * 60); break;
      case "bubble": bubble(); break;
      case "squish": squish(); break;
      case "wind": windGust(); break;
      case "sparkle": sparkle(); break;
      case "click": click(); break;
      case "woodTap": woodTap(); break;
      case "leafRustle": leafRustle(); break;
      case "birdChirp": birdChirp(); break;
      case "tickTock": tickTock(); break;
      case "whisper": whisper(); break;
      case "mysteryAmbient": mysteryAmbient(); break;
      case "candyPop": candyPop(); break;
      case "waterDrop": waterDrop(); break;
      case "oceanWave": oceanWave(); break;
      case "rainDrop": rainDrop(); break;
    }
  } catch (e) {
    console.warn("Audio error", e);
  }
}
