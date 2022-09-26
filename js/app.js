// Saber si el navegador soporta service worker
if (navigator.serviceWorker)
{
    // Identificar si se está en local o en github, para agregar a la url del repositorio
    navigator.serviceWorker.register('/sw.js');
}