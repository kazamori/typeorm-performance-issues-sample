export async function main() {
  console.log("hello index");
}

if (require.main === module) {
  (async () => {
    await main();
  })();
}
