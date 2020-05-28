const $ = document.querySelector.bind(document);
const SENTENCE = 'Het zijn rare tijden. ';

const scripts = [
    {
        domain : 'nu.nl',
        selector : ".article-body .excerpt"
    },
    {
        domain : 'volkskrant.nl',
        selector : ".artstyle__intro"
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
        domain : 'ad.nl',
        render(el) {
            // Check if we have this span thing
            if (!!el.querySelector('span')) {
                el.innerHTML = el.innerHTML.replace(
                    '</span>', `</span> ${SENTENCE}`
                );
            } else {
                el.innerHTML = SENTENCE + el.innerHTML;
            }
        },
        selector : '.article__intro'
    },
    {
        domain : 'rtlnieuws.nl',
        selector : '.lede',
    },
    {
        domain : 'trouw.nl',
        selector : '.artstyle__intro span'
    },
    {
        domain : 'parool.nl',
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
    if (window.location.host.endsWith(script.domain)) {
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