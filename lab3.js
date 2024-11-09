let additions = 0;
let multiplications = 0;

function FFT(input) {
  const N = input.length;
  if (N <= 1) return input;

  const even = FFT(input.filter((_, i) => i % 2 === 0));
  const odd = FFT(input.filter((_, i) => i % 2 !== 0));
  const results = new Array(N);

  for (let k = 0; k < N / 2; k++) {
    const expFactor = Math.exp(-2 * Math.PI * k / N);
    const twiddle = expFactor * odd[k];

    results[k] = even[k] + twiddle;
    results[k + N / 2] = even[k] - twiddle;

    multiplications++;
    additions += 2;
  }

  return results;
}

function IFFT(input) {
  const N = input.length;
  if (N <= 1) return input;

  const even = IFFT(input.filter((_, i) => i % 2 === 0));
  const odd = IFFT(input.filter((_, i) => i % 2 !== 0));
  const results = new Array(N);

  for (let k = 0; k < N / 2; k++) {
    const expFactor = Math.exp(2 * Math.PI * k / N); // Зворотній знак
    const twiddle = expFactor * odd[k];

    results[k] = even[k] + twiddle;
    results[k + N / 2] = even[k] - twiddle;
  }

  return results.map((value) => value / 2);
}

// const data = Array.from({ length: 8 }, () => Math.round(Math.random()));
const data = [0, 1, 1, 1, 0, 0, 1, 0];
console.log("Вхідні дані: ", data);

const startTime = performance.now();
const fftResult = FFT(data);
const endTime = performance.now();

const ifftResult = IFFT(fftResult).map((value) => Math.round(value));

console.log("Результат FFT:", fftResult);
console.log("Результат IFFT:", ifftResult);
console.log("Час обчислення:", (endTime - startTime).toFixed(4), "мс");
console.log("Кількість операцій множення:", multiplications);
console.log("Кількість операцій додавання:", additions);
