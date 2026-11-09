const toCelsius = {
  celsius: (v) => v,
  fahrenheit: (v) => ((v - 32) * 5) / 9,
  kelvin: (v) => v - 273.15,
};

const fromCelsius = {
  celsius: (v) => v,
  fahrenheit: (v) => (v * 9) / 5 + 32,
  kelvin: (v) => v + 273.15,
};

const unitSymbols = {
  celsius: "°C",
  fahrenheit: "°F",
  kelvin: "K",
};

const formatNumber = (value) =>
  new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const els = {
  temperature: document.querySelector("#temperature"),
  fromUnit: document.querySelector("#from-unit"),
  toUnit: document.querySelector("#to-unit"),
  convertBtn: document.querySelector("#convert-btn"),
  result: document.querySelector("#result"),
  error: document.querySelector("#error"),
};

const parseTemperature = () => {
  const trimmed = els.temperature.value.trim();
  if (trimmed === "") return null;
  const num = Number(trimmed);
  return Number.isFinite(num) ? num : null;
};

const isFormReady = () => {
  const value = parseTemperature();
  const from = els.fromUnit.value;
  const to = els.toUnit.value;
  return value !== null && from !== "" && to !== "";
};

const clearOutput = () => {
  els.result.textContent = "";
  els.result.hidden = true;
  els.error.textContent = "";
  els.error.hidden = true;
};

const showError = (message) => {
  els.result.textContent = "";
  els.result.hidden = true;
  els.error.textContent = `Error: ${message}`;
  els.error.hidden = false;
};

const showResult = (text) => {
  els.error.textContent = "";
  els.error.hidden = true;
  els.result.textContent = text;
  els.result.hidden = false;
};

const updateConvertButton = () => {
  els.convertBtn.disabled = !isFormReady();
};

const convert = (value, from, to) => {
  const celsius = toCelsius[from](value);
  return fromCelsius[to](celsius);
};

const onFieldChange = () => {
  clearOutput();
  updateConvertButton();
};

const onConvertClick = () => {
  clearOutput();

  if (!isFormReady()) {
    updateConvertButton();
    return;
  }

  const value = parseTemperature();
  const from = els.fromUnit.value;
  const to = els.toUnit.value;

  if (from === "kelvin" && value < 0) {
    showError("Kelvin cannot be below 0.");
    return;
  }

  const converted = convert(value, from, to);
  const fromSym = unitSymbols[from];
  const toSym = unitSymbols[to];
  const line = `${formatNumber(value)} ${fromSym} = ${formatNumber(converted)} ${toSym}`;
  showResult(line);
};

document.addEventListener("DOMContentLoaded", () => {
  updateConvertButton();

  els.temperature.addEventListener("input", onFieldChange);
  els.fromUnit.addEventListener("change", onFieldChange);
  els.toUnit.addEventListener("change", onFieldChange);
  els.convertBtn.addEventListener("click", onConvertClick);
});
