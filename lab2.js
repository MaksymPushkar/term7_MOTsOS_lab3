let multiplicationCount = 0;
let additionCount = 0;

function FourierCoefficient(N, k) {
  let A = 0;
  let B = 0;

  for (let n = 0; n < N; n++) {
    let cosValue = Math.cos((-2 * Math.PI * k * n) / N);
    let sinValue = Math.sin((-2 * Math.PI * k * n) / N);

    multiplicationCount += 2; // 2 множення: sd(n) * cos, sd(n) * sin

    A += sd(n) * cosValue;
    B += sd(n) * sinValue;

    additionCount += 2; // 2 додавання: A +=, B +=
  }

  A /= N;
  B /= N;

  multiplicationCount += 2; // 2 ділення: A /= N, B /= N

  return {
    A: A,
    B: B,
    module: ModuleFourierCoefficient(A, B),
    arg: ArgFourierCoefficient(A, B),
  };
}

function ModuleFourierCoefficient(A, B) {
  multiplicationCount += 2; // Для A^2 та B^2
  additionCount += 1; // Для A^2 + B^2

  return Math.sqrt(A ** 2 + B ** 2);
}

function ArgFourierCoefficient(A, B) {
  return Math.atan2(B, A);
}

function sd(n) {
  let NBinary = "01110010"; // 96 + 18 = 114; 119 -> 01110010
  return parseInt(NBinary.charAt(n));
}

function calculateFourierCoefficients(N) {
  let C = [];
  for (let k = 0; k <= N / 2; k++) {
    C.push(FourierCoefficient(N, k));
  }
  return C;
}

function primaryAnalogSignal(C, t) {
  let s = C[0].module;

  for (let k = 1; k < C.length - 1; k++) {
    s += 2 * C[k].module * Math.cos(2 * Math.PI * t * k + C[k].arg);

    multiplicationCount += 3; // Для 2 * module, 2 * Math.PI * t * k, і результат
    additionCount += 1; // Для s +=
  }

  s +=
    C[C.length - 1].module *
    Math.cos(2 * Math.PI * t * (C.length - 1) + C[C.length - 1].arg);

  multiplicationCount += 2; // Для module * cos
  additionCount += 1; // Для s +=

  return s;
}

// Вимірювання часу обчислення
let N = 8;
let startTime = performance.now();

let C = calculateFourierCoefficients(N); // Обчислюємо коефіцієнти Фур'є
let endTime = performance.now();

console.log(`Час обчислення: ${endTime - startTime} мс`);
console.log(`Кількість множень: ${multiplicationCount}`);
console.log(`Кількість додавань: ${additionCount}`);
