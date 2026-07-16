/**
 * Google Apps Script for Herbstrix-ME Landing Page
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Rename the active sheet to "Leads" (without quotes).
 * 3. Go to "Extensions" -> "Apps Script".
 * 4. Delete any code in the editor and paste this code.
 * 5. Click the Save icon (floppy disk).
 * 6. Click "Deploy" -> "New deployment".
 * 7. Click the gear icon (Select type) and choose "Web app".
 * 8. Set the configuration:
 *    - Description: "Herbstrix Leads API"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (This is required so the landing page can call it)
 * 9. Click "Deploy". Authorize access if prompted (click Advanced -> Go to Untitled Project -> Allow).
 * 10. Copy the "Web app URL" and set it in your environment variables as:
 *     GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 */

function doPost(e) {
  try {
    var jsonString = e.postData.contents;
    var data = JSON.parse(jsonString);
    var action = data.action;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Leads");
    if (!sheet) {
      // Auto-create Leads sheet if it doesn't exist
      sheet = ss.insertSheet("Leads");
      // Set headers
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Phone",
        "Age",
        "City",
        "Concern",
        "BestTime",
        "SourcePage",
        "LeadId",
        "HerbstrixOrderId",
        "HerbstrixStatus"
      ]);
      // Format headers
      sheet.getRange("A1:K1").setFontWeight("bold").setBackground("#f3f3f3");
    }

    if (action === "append") {
      var timestamp = getISTTimestamp();
      var newRow = [
        timestamp,
        data.name || "",
        data.phone || "",
        data.age || "",
        data.city || "",
        data.concern || "",
        data.bestTime || "",
        data.sourcePage || "advertorial-alphamen",
        data.leadId || "",
        data.herbstrixOrderId || "",
        data.herbstrixStatus || "pending"
      ];
      sheet.appendRow(newRow);
      var lastRow = sheet.getLastRow();
      var rangeStr = "Leads!A" + lastRow + ":K" + lastRow;
      
      return ContentService.createTextOutput(JSON.stringify({
        ok: true,
        sheetRange: rangeStr
      })).setMimeType(ContentService.MimeType.JSON);
    } 
    
    else if (action === "update") {
      var leadId = data.leadId;
      var sheetRange = data.sheetRange;
      var foundRow = -1;

      // 1. Try to find by sheetRange if provided
      if (sheetRange) {
        try {
          var range = sheet.getRange(sheetRange);
          var rowNum = range.getRow();
          var checkId = sheet.getRange(rowNum, 9).getValue(); // Column I is LeadId
          if (checkId === leadId) {
            foundRow = rowNum;
          }
        } catch (err) {
          // ignore error and fallback to search
        }
      }

      // 2. Search for leadId in Column I if range didn't match or wasn't provided
      if (foundRow === -1 && leadId) {
        var lastRow = sheet.getLastRow();
        if (lastRow > 1) {
          var ids = sheet.getRange(2, 9, lastRow - 1, 1).getValues();
          for (var i = 0; i < ids.length; i++) {
            if (String(ids[i][0]) === String(leadId)) {
              foundRow = i + 2; // +2 for 1-based index and header
              break;
            }
          }
        }
      }

      if (foundRow === -1) {
        return ContentService.createTextOutput(JSON.stringify({
          ok: false,
          error: "Lead not found to update"
        })).setMimeType(ContentService.MimeType.JSON);
      }

      // Update cells
      if (data.name !== undefined) sheet.getRange(foundRow, 2).setValue(data.name);
      if (data.phone !== undefined) sheet.getRange(foundRow, 3).setValue(data.phone);
      if (data.age !== undefined) sheet.getRange(foundRow, 4).setValue(data.age);
      if (data.city !== undefined) sheet.getRange(foundRow, 5).setValue(data.city);
      if (data.concern !== undefined) sheet.getRange(foundRow, 6).setValue(data.concern);
      if (data.bestTime !== undefined) sheet.getRange(foundRow, 7).setValue(data.bestTime);
      if (data.sourcePage !== undefined) sheet.getRange(foundRow, 8).setValue(data.sourcePage);
      if (data.herbstrixOrderId !== undefined) sheet.getRange(foundRow, 10).setValue(data.herbstrixOrderId);
      if (data.herbstrixStatus !== undefined) sheet.getRange(foundRow, 11).setValue(data.herbstrixStatus);

      return ContentService.createTextOutput(JSON.stringify({
        ok: true
      })).setMimeType(ContentService.MimeType.JSON);
    } 
    
    else if (action === "list") {
      var lastRow = sheet.getLastRow();
      var leads = [];
      if (lastRow > 1) {
        var values = sheet.getRange(2, 1, lastRow - 1, 11).getValues();
        for (var i = 0; i < values.length; i++) {
          var row = values[i];
          var rawTimestamp = row[0];
          var isoTimestamp = new Date().toISOString();
          if (rawTimestamp) {
            try {
              var cleaned = String(rawTimestamp).replace(/\s+IST$/i, "").trim();
              var d = new Date(cleaned.replace(" ", "T"));
              if (!isNaN(d.getTime())) {
                isoTimestamp = d.toISOString();
              }
            } catch (err) {}
          }

          var meta = {
            page: row[7] || "advertorial-alphamen",
            age: Number(row[3]) || null,
            city: row[4] ? String(row[4]) : null,
            bestTime: row[6] ? String(row[6]) : null,
            herbstrixOrderId: row[9] ? String(row[9]) : null,
            herbstrixStatus: row[10] ? String(row[10]) : null
          };

          leads.push({
            id: row[8] ? String(row[8]) : "row-" + (i + 2),
            name: row[1] ? String(row[1]) : "",
            email: "lead-" + i + "@nomail.local",
            phone: row[2] ? String(row[2]) : "",
            concern: row[5] ? String(row[5]) : null,
            source: JSON.stringify(meta),
            created_at: isoTimestamp
          });
        }
      }

      return ContentService.createTextOutput(JSON.stringify({
        ok: true,
        leads: leads
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: "Invalid action"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getISTTimestamp() {
  var d = new Date();
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000 * 5.5)); // UTC + 5:30
  
  var year = nd.getFullYear();
  var month = padZero(nd.getMonth() + 1);
  var day = padZero(nd.getDate());
  var hours = padZero(nd.getHours());
  var minutes = padZero(nd.getMinutes());
  var seconds = padZero(nd.getSeconds());
  
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + " IST";
}

function padZero(num) {
  return num < 10 ? "0" + num : num;
}
