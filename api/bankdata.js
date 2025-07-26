// /api/bankdata.js
// Plaats dit bestand in de 'api' folder van uw Vercel project

export default function handler(req, res) {
  // Basis authenticatie check (optioneel)
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.API_TOKEN; // Stel dit in via Vercel environment variables
  
  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // CORS headers voor browser toegang
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Hier komt uw CSV data - u kunt dit ook uit een database of environment variable halen
  const csvData = `Rekeningnummer,Rubrieknaam,Naam,Munt,Afschriftnummer,Transactie Datum,Transactie Maand,Omschrijving,Verwerking Datum,Verwerking Maand,Bedrag (ORIGINEEL),Saldo,ANALYSIS CATEGORY,Payment Type,Payment Category,Payment Subtype,Inkomende Betaling,Uitgaande Betaling,Bedrag Betaling,rekeningnummer tegenpartij anoniem,BIC tegenpartij,Naam tegenpartij,gestructureerde mededeling,Vrije mededeling
BE48738006392827,GEMEENSCHAPPELIJKE KOSTEN,VME RES HELIX ZEEDIJK 286,EUR,2024167,30/09/2024,2024-09,GLOBALE DOORBOEKING 30-09 overschrijvingen met OGM,30/09/2024,2024-09,1282.5,66990.42,VOORSCHOTTEN EIGENAARS (OGM),INKOMENDE BETALING,GLOBALE DOORBOEKING,GLOBALE DOORBOEKING,1282.5,,1282.5,,,,
[... REST VAN UW CSV DATA HIER ...]`;

  // Alternatief: Lees uit environment variable
  // const csvData = process.env.BANK_CSV_DATA;

  // Stuur CSV data terug
  res.status(200).send(csvData);
}
