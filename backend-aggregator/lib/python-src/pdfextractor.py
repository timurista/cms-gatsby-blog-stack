# generates basic insights
from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.sum_basic import SumBasicSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words
# import wget
import io
from urllib import request

# handles the text extraction
import pdfminer3
from pdfminer3.converter import TextConverter
from pdfminer3.layout import LAParams, LTTextBox
from pdfminer3.pdfpage import PDFPage
from pdfminer3.pdfinterp import PDFResourceManager
from pdfminer3.pdfinterp import PDFPageInterpreter
from pdfminer3.converter import PDFPageAggregator

url = "https://arxiv.org/pdf/1912.05935.pdf"
LANGUAGE = "english"
SENTENCES_COUNT = 10


# fs = wget.download(url=url)

resource_manager = PDFResourceManager()
fake_file_handle = io.StringIO()
converter = TextConverter(
    resource_manager, fake_file_handle, laparams=LAParams())
page_interpreter = PDFPageInterpreter(resource_manager, converter)
f = request.urlopen(url).read()
fp = io.BytesIO(f)
for page in PDFPage.get_pages(fp, caching=True, check_extractable=True):
    page_interpreter.process_page(page)
text = fake_file_handle.getvalue()

# with open(fs, 'rb') as fh:
#     for page in PDFPage.get_pages(fh, caching=True, check_extractable=True):
#         page_interpreter.process_page(page)
#     text = fake_file_handle.getvalue()

# close open handles


converter.close()
fake_file_handle.close()

print("received text")


# SUMMARIZE THE TEXT
parser = PlaintextParser.from_string(text, Tokenizer(LANGUAGE))
stemmer = Stemmer(LANGUAGE)
summarizer = Summarizer(stemmer)
summarizer.stop_words = get_stop_words(LANGUAGE)
print(summarizer)
for sentence in summarizer(parser.document, SENTENCES_COUNT):
    print(sentence)
# print(text)
