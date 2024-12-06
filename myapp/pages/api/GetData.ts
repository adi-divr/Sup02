// import { NextApiRequest, NextApiResponse } from 'next';
// import { google } from 'googleapis';

// export default async function GetData(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'GET') {
//         return res.status(405).json({ message: 'Only GET' });
//     }

//     try {
//         const auth = new google.auth.GoogleAuth({
//             credentials: {
//                 client_email: process.env.GOOGLE_CLIENT_EMAIL,
//                 private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//             },
//             scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
//         });

//         const sheets = google.sheets({ version: 'v4', auth });

//         // Replace the range with your desired range, e.g. 'Sheet1!A1:E10' for a specific sheet and range
//         const range = 'Sheet1!A1:G'; 

//         const response = await sheets.spreadsheets.values.get({
//             spreadsheetId: process.env.GOOGLE_SHEET_ID,
//             range,
//         });

//         const rows = response.data.values;

//         if (rows?.length) {
//             return res.status(200).json({ data: rows });
//         } else {
//             return res.status(404).json({ message: 'No data found' });
//         }
//     } catch (e) {
//         return res.status(500).json({ message: 'Internal Server Error', error: e });
//     }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async function GetData(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Only GET' });
    }

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        //  desired range
        const range = 'Sheet1!A1:H'; 

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range,
        });

        const rows = response.data.values;

        if (rows?.length) {
            const groupedData: Record<string, any[]> = {};

            rows.forEach(row => {
                const slot = row[5];  
                
               
                if (!groupedData[slot]) {
                    groupedData[slot] = [row];  
                }
            });

            const result = Object.values(groupedData).map(group => group[0]);

            return res.status(200).json({ data: result });
        } else {
            return res.status(404).json({ message: 'No data found' });
        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error', error: e });
    }
}
