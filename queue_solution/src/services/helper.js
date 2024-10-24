async function uiDelay(delay) {
  await new Promise((resolve) => setTimeout(resolve, delay));
}

export { uiDelay };