import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

type SheetForm = {
    name: string;
    mail: string;
    number: string;
    ageData: string;
    weighData: string;
};

export default async function Submit(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST' });
    }

    const body = req.body as SheetForm;

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'A1:C1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[body.name, body.mail, body.number, body.ageData, body.weighData]],
            },
        });

        return res.status(200).json({ message: 'Success' ,response});
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error',e });
    }
}