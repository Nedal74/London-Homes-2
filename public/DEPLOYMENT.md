# London Homes – Deployment Guide

## Environment Variables

Create a `.env` file in the project root with the following:

```env
# Google Sheets – Units data sheet ID
# From: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
VITE_GOOGLE_SHEET_ID=your_units_sheet_id_here

# Google Sheets – Leads sheet ID (can be same sheet, different tab)
VITE_LEADS_SHEET_ID=your_leads_sheet_id_here

# Google Apps Script URL for writing leads
# Deploy your Apps Script as a Web App and paste the URL here
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Google Sheets Setup (Units)

### Sheet Structure
Create a Google Sheet with a tab named `Units` with these columns:

| id | building | floor | area | bedrooms | bathrooms | price | status | features |
|----|----------|-------|------|----------|-----------|-------|--------|----------|
| A-1-01 | A | 1 | 180 | 3 | 2 | 650000 | available | تكييف مركزي,شرفة,موقف خاص |

### Status Values
- `available` or `متاحة` → Green
- `reserved` or `محجوزة` → Yellow  
- `sold` or `مباعة` → Red

### Make Sheet Public
1. Open Google Sheets
2. File → Share → Anyone with the link → Viewer
3. Copy the Sheet ID from the URL

## Google Apps Script Setup (Leads)

1. Go to script.google.com
2. Create new project
3. Paste this code:

```javascript
function doGet(e) {
  const sheetId = e.parameter.sheetId || 'YOUR_DEFAULT_SHEET_ID';
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Leads') 
    || SpreadsheetApp.openById(sheetId).insertSheet('Leads');
  
  // Add headers if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Unit', 'Message']);
  }
  
  sheet.appendRow([
    e.parameter.timestamp,
    e.parameter.name,
    e.parameter.phone,
    e.parameter.selectedUnit,
    e.parameter.message || ''
  ]);
  
  return ContentService.createTextOutput('OK');
}
```

4. Deploy → New Deployment → Web App
5. Execute as: Me, Who has access: Anyone
6. Copy the URL and set as `VITE_GOOGLE_SCRIPT_URL`

## Vercel Deployment

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_GOOGLE_SHEET_ID`
   - `VITE_LEADS_SHEET_ID`
   - `VITE_GOOGLE_SCRIPT_URL`
4. Deploy!

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Demo Mode

If no environment variables are set, the app will use mock data (160 sample units across 5 buildings).
