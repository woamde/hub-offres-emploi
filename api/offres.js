export default async function handler(req, res) {
  // Configuration de l'API Adzuna
  const APP_ID = '0da7e5ef'; // Remplacez par votre ID Adzuna
  const APP_KEY = '8ab512d32c44f10b90d9410591323d96'; // Remplacez par votre Clé Adzuna
  const COUNTRY = 'fr';
  
  // Paramètres de recherche : 50 offres
  const resultsPerPage = 50; 
  const url = `https://api.adzuna.com/v1/api/jobs/${COUNTRY}/search/1?app_id=${0da7e5ef}&app_key=${8ab512d32c44f10b90d9410591323d96}&results_per_page=${resultsPerPage}&content-type=application/json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Nettoyage des données pour Make / Google Sheets
    const offres = data.results.map(job => ({
      id: job.id,
      titre: job.title,
      entreprise: job.company.display_name,
      lieu: job.location.display_name,
      lien: job.redirect_url,
      description: job.description
    }));

    // Envoi des 50 offres
    res.status(200).json(offres);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des offres" });
  }
}
