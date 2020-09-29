const $ = document.querySelector.bind(document);
const SENTENCE = 'Het zijn rare tijden. ';

const scripts = [
    {
        domain : 'nu.nl',
        selector : ".article-body .excerpt"
    },
    {
        domain : 'nos.nl',
        selector : '[class^="contentBody_"] p'
    },
    {
        domain : "nrc.nl",
        render(el) {
            // Check if we have this span thing
            if (!!el.querySelector('span')) {
                el.innerHTML = el.innerHTML.replace(
                    '</span>', `</span> ${SENTENCE}`
                );
            } else {
                el = el.querySelector('p');
                el.innerHTML = SENTENCE + el.innerHTML;
            }
        },
        selector : '.article__intro',
    },
    {
        domain : 'telegraaf.nl',
        selector : '[id^="articleIntro"]'
    },
    {
        domain : 'rtlnieuws.nl',
        selector : '.lede',
    },
    // AD & friends
    {
        domain : [
            'ad.nl', 'bd.nl', 'bndestem.nl', 'destentor.nl', 'ed.nl', 'gelderlander.nl', 'pzc.nl', 'tubantia.nl'
        ],
        render(el) {
            // Check if we have this span thing
            if (!!el.querySelector('span')) {
                el.innerHTML = el.innerHTML.replace(
                    '</span>', `</span> ${SENTENCE}`
                );
            } else {
                // Sometimes there is a place lead in front of the article (e.g. NIJMEGEN - Bla bla),
                // so we check for that
                const html = el.innerHTML.trim();
                const matches = html.match(/^[A-Z]{3,} -/);

                if (!matches) {
                    el.innerHTML = SENTENCE + html;
                } else {
                    // First match has the position of where we need to insert
                    const pos = matches[0].length;
                    el.innerHTML = html.slice(0, pos) + ` ${SENTENCE}` + html.slice(pos);
                }
            }
        },
        selector : '.article__intro'
    },
    // Trouw, Volkskrant, Parool
    {
        domain : ['volkskrant.nl', 'parool.nl', 'trouw.nl'],
        selector : '.artstyle__intro'
    },
    {
        domain : 'metronieuws.nl',
        selector : '.article__content[data-type="post"] p, .article__content[data-type="post"] p strong'
    },
    {
        domain : 'linda.nl',
        selector : '.article-content_hasIntro p strong'
    },
    {
        domain : 'pointer.kro-ncrv.nl',
        render(el) {
            el.innerHTML = 'Het is weer zover. ' + el.innerHTML;
        },
        selector : '.paragraphs-wrapper p strong'
    }
];

for (const script of scripts) {
    // Domain can either be a single string or an array of strings. For
    // simplicty, we put a single string in an array
    let domains = script.domain;
    domains = typeof domains === 'string' ? [domains] : domains;

    for (const domain of domains) {
        if (window.location.host.endsWith(domain)) {
            console.log(`😷 Found ${domain}`);
            const el = $(script.selector);

            if (!!el) {
                if (script.render) {
                    script.render(el);
                } else {
                    el.innerHTML = SENTENCE + el.innerHTML;
                }
            }
        }
    }
}