const $ = document.querySelector.bind(document);
const { scripts, SENTENCES, DEFAULT_SENTENCE } = globalThis;

for (const script of scripts) {
    // Domain can either be a single string or an array of strings. For
    // simplicty, we put a single string in an array
    let domains = script.domain;
    domains = typeof domains === 'string' ? [domains] : domains;

    for (const domain of domains) {
        if (window.location.host.endsWith(domain)) {
            console.log(`😷 Found ${domain}`);
            const el = $(script.selector);

            // Determine the sentence by looking up the TLD
            const tld = domain.split('.').pop();
            let sentence = SENTENCES[tld] ?? DEFAULT_SENTENCE;
            sentence = sentence + ' ';

            if (!!el) {
                if (script.render) {
                    script.render({
                        el, domain, sentence
                    });
                } else {
                    el.innerHTML = `${sentence}${el.innerHTML}`;
                }
            }
        }
    }
}