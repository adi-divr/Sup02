// import { NextApiRequest, NextApiResponse } from "next";
// import { google } from "googleapis";

// export default async function GetDetailsByDate(req: NextApiRequest, res: NextApiResponse) {
//   const { date } = req.query;

//   if (!date || typeof date !== "string") {
//     return res.status(400).json({ message: "Date is required in 'YYYY-MM-DD' format." });
//   }

//   try {
//     const auth = new google.auth.GoogleAuth({
//       credentials: {
//         client_email: process.env.GOOGLE_CLIENT_EMAIL,
//         private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//       },
//       scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//     });

//     const sheets = google.sheets({ version: "v4", auth });

//     const sheetDataResponse = await sheets.spreadsheets.values.get({
//       spreadsheetId: process.env.GOOGLE_SHEET_ID2,
//       range: "A2:E", // Assuming data starts from row 2
//     });

//     const rows = sheetDataResponse.data.values || [];
//     const results: { name: string; number: string }[] = [];

//     rows.forEach((row) => {
//       const [name, number, bookingDate] = row; // Assuming Name is column A, Number is column B, and Date is column C
//       if (bookingDate === date) {
//         results.push({ name, number });
//       }
//     });

//     if (results.length === 0) {
//       return res.status(404).json({ message: "No entries found for the given date." });
//     }

//     res.status(200).json({ results });
//     console.log(results)
//   } catch (error) {
//     console.error("Error fetching details by date:", error);
//     res.status(500).json({ message: "Internal Server Error", error });
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async function GetDetailsByDate(req: NextApiRequest, res: NextApiResponse) {
  const { date } = req.query;

  if (!date || typeof date !== "string") {
    return res.status(400).json({ message: "Date is required in 'YYYY-MM-DD' format." });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const sheetDataResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID2,
      range: "A2:F", // Adjust the range to include all required columns
    });

    const rows = sheetDataResponse.data.values || [];
    const results: { name: string; number: string }[] = [];

    rows.forEach((row) => {
      const [name, number, bookingDate] = row; // Adjust indices as per spreadsheet structure
      if (bookingDate === date) {
        results.push({ name, number });
      }
    });

    res.status(200).json({ 
      totalSlots: results.length, 
      details: results 
    });
  } catch (error) {
    console.error("Error fetching details by date:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}
