self.addEventListener('install', (event) => {
    console.log("SW: Instalado");

    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Instalaciones finalizadas');
            resolve('ok');
        }, 3000);
    })
    event.waitUntil(myPromise);
});

self.addEventListener('activate', (event) => {
    console.log('SW Activado...');
})

self.addEventListener('fetch', async(event) => {
    console.log('FETCH => ', event.request.url);
    if (await event.request.url.includes('img1.jpg'))
    {
        let responseImage;
        event.waitUntil((async () => { 
            responseImage = await fetch('images/img2.jpg')
            console.log('response => ', responseImage);
            if (responseImage.status == 200) 
            {
                return responseImage.url
            } else {
                return event.request.url
            }
        })())

        event.respondWith(new Response(responseImage));
    }

})

/*self.addEventListener('fetch', (event) => {
    console.log("Event: ", event.request.url);
    fetch(event.request.url).then((resp) => {
        console.log(resp);
        if (resp.ok) 
        {
            console.log('Entramos al ok');
            event.respondWith(resp);
        } else {
            console.log('responder generico');
            const generic = fetch('images/imagen2.jpg')
            event.respondWith(generic);
        }
    }).catch((err) => {
        console.error('SW error ', err);
    });

    if (event.request.url.includes('style.css'))
    {
        const response = new Response(
            `body{
                color: pink;
                background-color: #000;
            }`,
            {
                headers: {
                    'Content-Type': 'text/css'
                }
            }
        )
        event.respondWith(response);
    }
})*/

