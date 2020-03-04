import spacy
import json
import spacy.attrs
from spacy.pipeline import TextCategorizer
from collections import Counter
import re

nlp = spacy.load("en_core_web_sm")
textcat = TextCategorizer(nlp.vocab)

def main():
    with open('papers.json', 'r') as f:
        data = json.loads(f.read())
    text = ' '.join([x["abstract_text"] for x in data])
    print(text)
    doc = nlp(text)
    # processed = textcat(doc)
    # print(processed)
    
    # doc.count_by(spacy.attrs.IDS['ORG'])

    # counts_dict = doc.ents.count_by(spacy.attrs.IDS['POS'])

    # Print the human readable part of speech tags
    # for pos, count in counts_dict.items():
    #     human_readable_tag = doc.vocab[pos].text
    #     print(human_readable_tag, count)
    cnt = Counter()
    cnt_2 = Counter()
    ents = [ent.text for ent in doc.ents if ent.label_ == "ORG"]
    phrases = [chunk.text for chunk in doc.noun_chunks]
    for ent in ents:
        cnt[ent] += 1
    
    for phrase in phrases:
        cnt_2[phrase] += 1

    # print(list(cnt.most_common(10)))
    # print("Noun phrases:", [chunk.text for chunk in doc.noun_chunks])
    # print("ents", [(ent.text, ent.label_) for ent in doc.ents if ent.label_ == "ORG"])
    # print("Verbs:", [token.lemma_ for token in doc if token.pos_ == "VERB"])
    print(cnt_2.most_common(41)[10:])
    return list(cnt.most_common(21)[1:])

if __name__ == "__main__":
    print(main())