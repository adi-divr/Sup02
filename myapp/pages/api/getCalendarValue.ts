import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async function GetSlots(req: NextApiRequest, res: NextApiResponse) {
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({ message: "Month and year are required." });
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
      range: "A2:E", // Assuming data starts from row 2
    });

    const rows = sheetDataResponse.data.values || [];
    const slots: Record<string, number> = {};
///////////////////type error
    rows.forEach((row) => {
      const [, , bookingDate, slotsCount] = row; // Assuming date is in column C (index 2), slots in column D
    
      // Ensure month is treated as a string
      const monthString = Array.isArray(month) ? month[0] : month;
    
      if (
        bookingDate &&
        bookingDate.startsWith(`${year}-${monthString.padStart(2, "0")}`)
      ) {
        slots[bookingDate] = (slots[bookingDate] || 0) + parseInt(slotsCount || "0", 10);
      }
    });
/////////////////////////type error
    res.status(200).json({ slots });
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}
