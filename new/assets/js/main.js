function goToPage(pageUrl, forced) {
    const toNavigate = `/new/${pageUrl}.html`;
    if (location.pathname !== toNavigate || forced) {
        history.pushState({pageUrl}, `${pageUrl}`, toNavigate);
        fetch(toNavigate).then(res => {
            res.text().then(html => {
                const resultDiv = document.createElement('div');
                resultDiv.classList = 'hide';
                resultDiv.innerHTML = html;
                const content = resultDiv.querySelector('.content').innerHTML;
                document.querySelector('.content').classList.add('hide');
                setTimeout(() => {
                    document.querySelector('.content').innerHTML = content;
                    document.querySelector('.content').classList.remove('hide');
                }, 1000);
            });
        });
    }
}

setupState = () => {
    let path = location.pathname.split('/').pop().replace('.html', '');
    if (!path) {
        path = 'index';
    }
    history.replaceState({pageUrl: path}, `${path}`, `/new/${path}.html`);
}
setupState();

window.onpopstate = (e) => {
    goToPage(e.state.pageUrl, true);
}