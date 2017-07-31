# Q-A
A Questions and Answers HTML Page

-------------------------------------
# XML Location and form
The xml must be located under the Q-A_XML directory, all the xml there
will be automatically added to the selection div, the xml root can have any name you want, for every question there must be a <Question> tag, with an attribute "Question" containing a question in string form that will be displayed as title of the question, then it can be several <Ans> tags, with an attribute "Correct" that can be "true" or "false" depending on if the answer is valid or not, the inner text of that <Ans> tag is what will be displayed in several buttons.

Note all names are case sensitive.