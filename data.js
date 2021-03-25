// Every object in this array corresponds to a website, where these values apply
//
// Required:
// domain: either a string or array of strings that will be used to filter out the current URL the user is visiting
// selector : A CSS selector for the element where we want the sentence to be replaced. This will happen in front of the elemtn.
//
// Optional:
// render( {el, sentence} ): custom render function
// sentence: custom sentence to overwrite the default

globalThis.DEFAULT_SENTENCE = "We're living in strange times.";

globalThis.SENTENCES = {
    'be' : 'Het zijn vreemde tijden.',
    'nl' : 'Het zijn rare tijden.'
};

globalThis.scripts = [
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
        render( {el, sentence} ) {
            // Check if we have this span thing
            if (!!el.querySelector('span')) {
                el.innerHTML = el.innerHTML.replace(
                    '</span>', `</span> ${sentence}`
                );
            } else {
                el = el.querySelector('p');
                el.innerHTML = sentence + el.innerHTML;
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
            'ad.nl', 'bd.nl', 'bndestem.nl', 'destentor.nl', 'ed.nl',
            'gelderlander.nl', 'pzc.nl', 'tubantia.nl', 'hln.be', 'nieuwsblad.be'
        ],
        render({el, sentence}) {
            // Check if we have this span thing
            if (!!el.querySelector('span')) {
                el.innerHTML = el.innerHTML.replace(
                    '</span>', `</span> ${sentence}`
                );
            } else {
                // Sometimes there is a place lead in front of the article (e.g. NIJMEGEN - Bla bla),
                // so we check for that
                const html = el.innerHTML.trim();
                const matches = html.match(/^[A-Z]{3,} -/);

                if (!matches) {
                    el.innerHTML = sentence + html;
                } else {
                    // First match has the position of where we need to insert
                    const pos = matches[0].length;
                    el.innerHTML = html.slice(0, pos) + ` ${sentence}` + html.slice(pos);
                }
            }
        },
        selector : '.article__intro'
    },

    {
        domain : ['volkskrant.nl', 'parool.nl', 'trouw.nl'],
        selector : '.artstyle__intro'
    },

    {
        domain : ['demorgen.be'],
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
        sentence : 'Het is weer zover.',
        selector : '.article__content .intro p'
    },

    {
        domain : 'tijd.be',
        selector : '.ac_paragraph--first p'
    },

    {
        domain : 'vrt.be',
        selector : '.article__intro .cmp-text p'
    },

    {
        domain : 'standaard.be',
        selector : '.DS2020-introduction p, .intro p'
    }
];