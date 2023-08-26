const services = [
    {name: 'Website', url: 'https://google.com'},
    {name: 'DDoS Protection', url: 'https://google.com'},
    {name: 'MySQL Server', url: 'https://google.com'},
    {name: 'Link Website', url: 'https://google.com'}
];

const checkServices = async () => {
    let allOperational = true;
    for (const service of services) {
        const serviceId = `service-${service.name.replace(/ /g, '-')}`;
        document.querySelector(`#${serviceId}`).innerHTML = `<div class="alert text-white"><span>${service.name}: Checking...</span></div>`;
        const res = await fetch(`../php/websitePing.php?url=${service.url}`);
        const data = await res.json();
        if (data.status === 'up') {
            document.querySelector(`#${serviceId}`).innerHTML = `<div class="alert alert-success text-white"><span>${service.name}: Operational</span></div>`;
        } else {
            allOperational = false;
            document.querySelector(`#${serviceId}`).innerHTML = `<div class="alert alert-error text-white"><span>${service.name}: Down</span></div>`;
        }
    }
    if (allOperational) {
        document.querySelector('#status').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> All services are operational';
        document.querySelector('#status').classList.remove('bg-red-500');
        document.querySelector('#status').classList.add('bg-green-500');
    } else {
        document.querySelector('#status').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> One or more services have an outage';
        document.querySelector('#status').classList.remove('bg-green-500');
        document.querySelector('#status').classList.add('bg-red-500');
    }
}


window.addEventListener('load', () => {
    for (const service of services) {
        const div = document.createElement('div');
        div.id = `service-${service.name.replace(/ /g, '-')}`;
        div.innerHTML = `<div class="alert text-white"><span>${service.name}: Checking...</span></div>`;
        div.classList.add('m-2');
        document.querySelector('#services').appendChild(div);
    }
    checkServices();
    setInterval(checkServices, 60000);
});

