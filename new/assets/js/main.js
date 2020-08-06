function goToPage(pageUrl) {
    history.pushState({pageUrl}, `${pageUrl}`, `/${pageUrl}`);
}