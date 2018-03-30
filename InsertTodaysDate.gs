// Mozilla Polyfill https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart#Polyfill
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength,padString) {
    targetLength = targetLength>>0 //truncate if number or convert non-number to 0
    padString = String((typeof padString !== 'undefined' ? padString : ' '))
    if (this.length > targetLength) {
      return String(this)
    }
    else {
      targetLength = targetLength-this.length
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength/padString.length) //append to original to ensure we are longer than needed
      }
      return padString.slice(0,targetLength) + String(this)
    }
  }
}

function onInstall (e) {
  onOpen(e)
}

function onOpen (e) {
  const menu = DocumentApp.getUi().createAddonMenu()
  menu.addItem('Text YYYY-MM-dd', 'insertTodaysIsoDateTextAtCursor')
  menu.addItem('H1 YYYY-MM-dd', 'insertTodaysIsoDateH1AtCursor')
  menu.addItem('H2 YYYY-MM-dd', 'insertTodaysIsoDateH2AtCursor')
  menu.addItem('H3 YYYY-MM-dd', 'insertTodaysIsoDateH3AtCursor')
  menu.addItem('H4 YYYY-MM-dd', 'insertTodaysIsoDateH4AtCursor')
  menu.addItem('H5 YYYY-MM-dd', 'insertTodaysIsoDateH5AtCursor')
  menu.addItem('H6 YYYY-MM-dd', 'insertTodaysIsoDateH6AtCursor')
  menu.addToUi()
}

function getDateAsIsoDateString (date) {
  const yearString = date.getYear()
  const monthString = (date.getMonth() + 1).toString().padStart(2, '0')
  const dateString = date.getDate().toString().padStart(2, '0')
  return yearString + '-' + monthString + '-' + dateString
}

function insertTodaysIsoDateTextAtCursor () {
  const dateString = getDateAsIsoDateString(new Date())
  
  DocumentApp.getActiveDocument().getCursor().insertText(dateString)
}

function insertTodaysIsoDateHeadingAtCursor (heading) {
  const body = DocumentApp.getActiveDocument().getBody()
  
  const elementSurroundingCursor = DocumentApp.getActiveDocument().getCursor().getElement()
  Logger.log(elementSurroundingCursor)
  
  const elementIndexInBody = body.getChildIndex(elementSurroundingCursor)
  
  const dateString = getDateAsIsoDateString(new Date())
  
  const dateParagraph = body.insertParagraph(elementIndexInBody, dateString)
  dateParagraph.setHeading(heading)
}

function insertTodaysIsoDateH1AtCursor () {
  insertTodaysIsoDateHeadingAtCursor(DocumentApp.ParagraphHeading.HEADING1)
}
function insertTodaysIsoDateH2AtCursor () {
  insertTodaysIsoDateHeadingAtCursor(DocumentApp.ParagraphHeading.HEADING2)
}
function insertTodaysIsoDateH3AtCursor () {
  insertTodaysIsoDateHeadingAtCursor(DocumentApp.ParagraphHeading.HEADING3)
}
function insertTodaysIsoDateH4AtCursor () {
  insertTodaysIsoDateHeadingAtCursor(DocumentApp.ParagraphHeading.HEADING4)
}
function insertTodaysIsoDateH5AtCursor () {
  insertTodaysIsoDateHeadingAtCursor(DocumentApp.ParagraphHeading.HEADING5)
}
function insertTodaysIsoDateH6AtCursor () {
  insertTodaysIsoDateHeadingAtCursor(DocumentApp.ParagraphHeading.HEADING6)
}
