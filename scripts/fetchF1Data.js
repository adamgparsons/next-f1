const axios = require("axios");
const fs = require("fs");
const path = require("path");

const fetchData = async () => {
    try {
        const response = await axios.get("https://ergast.com/api/f1/current.json");
        const data = response.data;

        const outputPath = path.join(__dirname, "../data/f1_data.json");
        fs.writeFileSync(outputPath, JSON.stringify(data));
        console.log("F1 data fetched and saved successfully!");
    } catch (error) {
        console.error("Error fetching F1 data:", error);
    }
};

fetchData();
