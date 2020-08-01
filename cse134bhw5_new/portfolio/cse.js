// Replace with your own values
const searchClient = algoliasearch(
  'K60TB9W024',
  '4e2dd594718f9757c1c45a4543365797' // search only API key, not admin API key
);

const search = instantsearch({
  indexName: 'dev_CSE',
  searchClient,
  routing: true,
});

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 10,
  })
]);

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for CSE courses',
  })
]);

search.addWidgets([
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: document.getElementById('hit-template').innerHTML,
      empty: `We didn't find any results for the search <em>"{{query}}"</em>`,
    },
  })
]);

search.start();
