function goToPage(pageUrl) {
    const toNavigate = `/new/${pageUrl}.html`;
    if (location.pathname !== toNavigate) {
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