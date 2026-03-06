export const randomFail = (chance: number = 0.05) => {
  if (Math.random() < chance) {
   throw new Error(
  "Mock Simulated API Error: This failure is intentionally simulated to test error handling. Please retry."
)
  }
}