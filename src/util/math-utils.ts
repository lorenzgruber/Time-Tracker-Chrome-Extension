export function map(
  input: number,
  inputStart: number,
  inputEnd: number,
  outputStart: number,
  outputEnd: number
): number {
  return (
    outputStart +
    ((outputEnd - outputStart) / (inputEnd - inputStart)) * (input - inputStart)
  );
}
