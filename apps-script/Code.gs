/**
 * Dán vào Google Apps Script gắn với Google Sheet của bạn.
 * 1. Project Settings > Script properties: thêm TEACHER_KEY = <mật khẩu giáo viên>
 * 2. Deploy > New deployment > Web app: Execute as "Me", Access "Anyone"
 * 3. Copy URL /exec vào biến VITE_SHEET_URL
 */
const ANSWER_HEADERS = ['timestamp', 'studentId', 'grade', 'scenarioId', 'variantId', 'stage', 'attempt', 'choiceId', 'outcome', 'timeToAnswerMs', 'checksUsed', 'score']
const SURVEY_HEADERS = ['timestamp', 'studentId', 'grade', 'confidence', 'feedback']
const CHECK_HEADERS = ['timestamp', 'studentId', 'grade', 'scenarioId', 'attempt', 'stage', 'checkId']

function getSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sh = ss.getSheetByName(name)
  if (!sh) {
    sh = ss.insertSheet(name)
    sh.appendRow(headers)
  }
  return sh
}

// Chống công thức độc hại trong Google Sheets
function safe_(v) {
  const s = String(v == null ? '' : v)
  return /^[=+\-@]/.test(s) ? "'" + s : s
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents)
  const isSurvey = d.type === 'survey'
  const isCheck = d.type === 'check'
  const headers = isSurvey ? SURVEY_HEADERS : isCheck ? CHECK_HEADERS : ANSWER_HEADERS
  const sh = getSheet_(isSurvey ? 'survey' : isCheck ? 'checks' : 'answers', headers)
  sh.appendRow(headers.map((h) => safe_(d[h])))
  return ContentService.createTextOutput('ok')
}

function doGet(e) {
  const key = PropertiesService.getScriptProperties().getProperty('TEACHER_KEY')
  let out
  if (!key || e.parameter.key !== key) {
    out = { error: 'Sai mật khẩu giáo viên' }
  } else {
    const sh = getSheet_('answers', ANSWER_HEADERS)
    const values = sh.getDataRange().getValues()
    const head = values.shift()
    out = { answers: values.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]]))) }
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON)
}
