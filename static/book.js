function debounce(func, wait) {
    var timeout;

    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);

        timeout = setTimeout(function () {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
}

function makeTeaser(body, terms) {
    var TERM_WEIGHT = 40;
    var NORMAL_WORD_WEIGHT = 2;
    var FIRST_WORD_WEIGHT = 8;
    var TEASER_MAX_WORDS = 30;

    var stemmedTerms = terms.map(function (w) {
        return elasticlunr.stemmer(w.toLowerCase());
    });
    var termFound = false;
    var index = 0;
    var weighted = []; // contains elements of ["word", weight, index_in_document]

    var sentences = body.toLowerCase().split('. ');

    for (var i in sentences) {
        var words = sentences[i].split(' ');
        var value = FIRST_WORD_WEIGHT;

        for (var j in words) {
            var word = words[j];

            if (word.length > 0) {
                for (var k in stemmedTerms) {
                    if (elasticlunr.stemmer(word).startsWith(stemmedTerms[k])) {
                        value = TERM_WEIGHT;
                        termFound = true;
                    }
                }
                weighted.push([word, value, index]);
                value = NORMAL_WORD_WEIGHT;
            }

            index += word.length;
            index += 1;  // ' ' or '.' if last word in sentence
        }

        index += 1;  // because we split at a two-char boundary '. '
    }

    if (weighted.length === 0) {
        return body;
    }

    var windowWeights = [];
    var windowSize = Math.min(weighted.length, TEASER_MAX_WORDS);
    var curSum = 0;
    for (var i = 0; i < windowSize; i++) {
        curSum += weighted[i][1];
    }
    windowWeights.push(curSum);

    for (var i = 0; i < weighted.length - windowSize; i++) {
        curSum -= weighted[i][1];
        curSum += weighted[i + windowSize][1];
        windowWeights.push(curSum);
    }

    var maxSumIndex = 0;
    if (termFound) {
        var maxFound = 0;
        for (var i = windowWeights.length - 1; i >= 0; i--) {
            if (windowWeights[i] > maxFound) {
                maxFound = windowWeights[i];
                maxSumIndex = i;
            }
        }
    }

    var teaser = [];
    var startIndex = weighted[maxSumIndex][2];
    for (var i = maxSumIndex; i < maxSumIndex + windowSize; i++) {
        var word = weighted[i];
        if (startIndex < word[2]) {
            teaser.push(body.substring(startIndex, word[2]));
            startIndex = word[2];
        }

        if (word[1] === TERM_WEIGHT) {
            teaser.push('<b>');
        }
        startIndex = word[2] + word[0].length;
        teaser.push(body.substring(word[2], startIndex));

        if (word[1] === TERM_WEIGHT) {
            teaser.push('</b>');
        }
    }
    teaser.push('…');
    return teaser.join('');
}

function formatSearchResultItem(item, terms) {
    var li = document.createElement('li');
    li.innerHTML = `<a><div class="prose prose-sm"><h3>${item.doc.title}</h3><p>${makeTeaser(item.doc.body, terms)}</p></div></a>`;
    li.addEventListener('click', function() {
        window.location.href = item.ref;
    });
    return li;
}

function initSearch() {
    var $searchInput = document.getElementById('search');
    if (!$searchInput) {
        return;
    }

    var $searchResults = document.querySelector('.search-results');
    var $searchResultsHeader = document.querySelector('.search-results__header');
    var $searchResultsItems = document.querySelector('.search-results__items');
    var MAX_ITEMS = 10;

    var options = {
        bool: 'AND',
        fields: {
            title: { boost: 2 },
            body: { boost: 1 },
        }
    };
    var currentTerm = '';
    var index = elasticlunr.Index.load(window.searchIndex);

    $searchInput.addEventListener('keyup', debounce(function () {
        var term = $searchInput.value.trim();
        if (term === currentTerm || !index) {
            return;
        }
        $searchResults.style.display = term === '' ? 'none' : 'block';
        $searchResultsItems.innerHTML = '';
        if (term === '') {
            return;
        }

        var results = index.search(term, options).filter(function (r) {
            return r.doc.body !== '';
        });

        if (results.length === 0) {
            $searchResultsHeader.innerText = `No results for '${term}'`;
            return;
        }

        currentTerm = term;
        $searchResultsHeader.innerText = `${results.length} results for '${term}':`;
        for (var i = 0; i < Math.min(results.length, MAX_ITEMS); i++) {
            if (!results[i].doc.body) {
                continue;
            }
            $searchResultsItems.appendChild(formatSearchResultItem(results[i], term.split(' ')));
        }
    }, 150));

    // Focus search input when modal is opened
    var searchModal = document.getElementById('search-modal');
    if (searchModal) {
        searchModal.addEventListener('change', function() {
            if (this.checked) {
                setTimeout(function() {
                    $searchInput.focus();
                }, 100);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initSearch();
});
