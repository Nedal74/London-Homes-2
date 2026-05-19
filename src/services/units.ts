export async function getUnits() {
  try {
    const response = await fetch(
      "https://sheetdb.io/api/v1/jk2e8gcsb3d2x"
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching units:", error);
    return [];
  }
}