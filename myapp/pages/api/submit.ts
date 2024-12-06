// import { NextApiRequest, NextApiResponse } from 'next';
// import { google } from 'googleapis';

// type SheetForm = {
//     name: string;
//     mail: string;
//     number: string;
//     ageData: string;
//     weighData: string;
// };

// export default async function Submit(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Only POST method is allowed' });
//     }

//     const body = req.body as SheetForm[]; // Expecting an array of objects
//     if (!Array.isArray(body)) {
//         return res.status(400).json({ message: 'Expected an array of objects' });
//     }

//     try {
//         const auth = new google.auth.GoogleAuth({
//             credentials: {
//                 client_email: process.env.GOOGLE_CLIENT_EMAIL,
//                 private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//             },
//             scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//         });

//         const sheets = google.sheets({ version: 'v4', auth });

//         // Get the current date in ddmm format
//         const date = new Date();
//         const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for day
//         const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits for month
//         const dateFormatted = `${day}${month}`; // Format as ddmm

//         // Transform the array of objects into an array of values
//         const values = body.map(item => [
//             item.name,
//             item.mail,
//             item.number,
//             item.ageData,
//             item.weighData,
//             dateFormatted,
//                     ]);

//         const response = await sheets.spreadsheets.values.append({
//             spreadsheetId: process.env.GOOGLE_SHEET_ID,
//             range: 'A1', // Adjust the range as needed
//             valueInputOption: 'USER_ENTERED',
//             requestBody: {
//                 values, // Use the transformed array here
//             },
//         });

//         return res.status(200).json({ message: 'Data appended successfully', response });
//     } catch (e) {
//         return res.status(500).json({ message: 'Internal Server Error', error: e });
//     }
// }




// import { NextApiRequest, NextApiResponse } from 'next';
// import { google } from 'googleapis';

// type SheetForm = {
//     name: string;
//     mail: string;
//     number: string;
//     ageData: string;
//     weighData: string;
// };

// export default async function Submit(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Only POST method is allowed' });
//     }

//     const body = req.body as SheetForm[]; // Expecting an array of objects
//     if (!Array.isArray(body)) {
//         return res.status(400).json({ message: 'Expected an array of objects' });
//     }

//     try {
//         const auth = new google.auth.GoogleAuth({
//             credentials: {
//                 client_email: process.env.GOOGLE_CLIENT_EMAIL,
//                 private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//             },
//             scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//         });

//         const sheets = google.sheets({ version: 'v4', auth });

//         // Get the current date in ddmm format
//         const date = new Date();
//         const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for day
//         const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits for month
//         const dateFormatted = `${day}${month}`; // Format as ddmm

//         // Get the current number of submissions (or the highest slot number used)
//         const sheetId = process.env.GOOGLE_SHEET_ID;
//         const response = await sheets.spreadsheets.values.get({
//             spreadsheetId: sheetId!,
//             range: 'A:A',  // Column A holds the slot values
//         });

//         const existingData = response.data.values;
//         const nextSlotNumber = existingData ? existingData.length + 1 : 1;  // Increment slot number based on current number of rows
//         const slot = `slot${nextSlotNumber}`; // Dynamically calculate the slot

//         // Transform the array of objects into an array of values, including the slot number
//         const values = body.map(item => [
//             item.name,
//             item.mail,
//             item.number,
//             item.ageData,
//             item.weighData,
//             slot,    // Add the slot number here
//             dateFormatted,    // Add the formatted date here
//         ]);

//         // Append the new data (including the slot and date) to Google Sheets
//         await sheets.spreadsheets.values.append({
//             spreadsheetId: sheetId!,
//             range: 'A1',  // Adjust the range as needed (e.g., "Sheet1!A1")
//             valueInputOption: 'USER_ENTERED',
//             requestBody: {
//                 values, // Use the transformed array here
//             },
//         });

//         return res.status(200).json({ message: 'Data appended successfully' });
//     } catch (e) {
//         return res.status(500).json({ message: 'Internal Server Error', error: e });
//     }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

// type SheetForm = {
//     name: string;
//     mail: string;
//     number: string;
//     ageData: string;
//     weighData: string;
// };

export default async function Submit(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST method is allowed' });
    }

    const { formData, slotAndDate } = req.body;

    if (!Array.isArray(formData) || typeof slotAndDate !== 'object') {
        return res.status(400).json({ message: 'Invalid request body format' });
    }

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Get the current date in ddmm format
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const dateFormatted = `${day}${month}`;

        // Get the current number of submissions (or the highest slot number used)
        const sheetId = process.env.GOOGLE_SHEET_ID;
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId!,
            range: 'A:A', // Column A holds the slot values
        });

        const existingData = response.data.values;
        const nextSlotNumber = existingData ? existingData.length + 1 : 1;
        const slot = `slot${nextSlotNumber}`; // Dynamically calculate the slot

        // Combine formData and slotAndDate into the required format
        const values = formData.map(item => [
            item.name,
            item.mail,
            item.number,
            item.ageData,
            item.weighData,
            slot, // Include the dynamically calculated slot
            dateFormatted, // Include the formatted date
            slotAndDate.selectedDate || '', // Add `slots` from `slotAndDate` as a new column
        ]);

        // Append the data to Google Sheets
        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId!,
            range: 'A1', // Adjust the range as needed
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values,
            },
        });

        return res.status(200).json({ message: 'Data appended successfully' });
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error', error: e });
    }
}



