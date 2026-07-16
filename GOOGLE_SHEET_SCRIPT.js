/**
 * Google Apps Script for Herbstrix-ME Landing Page (Leads Collector)
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet.
 * 2. Rename the active sheet tab to "Leads" (without quotes).
 * 3. Go to "Extensions" -> "Apps Script".
 * 4. Clear any existing code and paste this code.
 * 5. Click the Save icon (floppy disk).
 * 6. Click "Deploy" -> "New deployment".
 * 7. Click the gear icon (Select type) and choose "Web app".
 * 8. Set settings:
 *    - Description: "Leads Sheet Webhook"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (Required)
 * 9. Click "Deploy". Give access/permissions when prompted.
 * 10. Copy the new "Web app URL" and provide it here.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");
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
      sheet.getRange("A1:K1").setFontWeight("bold").setBackground("#f3f3f3");
    }

    var data = JSON.parse(e.postData.contents);
    var action = data.action;

    if (action === "append") {
      var d = new Date();
      var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      var nd = new Date(utc + (3600000 * 5.5)); // UTC + 5:30
      var pad = function(n) { return n < 10 ? "0" + n : n; };
      var timestamp = nd.getFullYear() + "-" + pad(nd.getMonth() + 1) + "-" + pad(nd.getDate()) + " " + pad(nd.getHours()) + ":" + pad(nd.getMinutes()) + ":" + pad(nd.getSeconds()) + " IST";

      sheet.appendRow([
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
      ]);

      var lastRow = sheet.getLastRow();
      return ContentService.createTextOutput(JSON.stringify({
        ok: true,
        sheetRange: "Leads!A" + lastRow + ":K" + lastRow
      })).setMimeType(ContentService.MimeType.JSON);
    }

    else if (action === "update") {
      var leadId = data.leadId;
      var sheetRange = data.sheetRange;
      var foundRow = -1;

      if (sheetRange) {
        try {
          var range = sheet.getRange(sheetRange);
          var rowNum = range.getRow();
          var checkId = sheet.getRange(rowNum, 9).getValue();
          if (checkId === leadId) {
            foundRow = rowNum;
          }
        } catch (err) {}
      }

      if (foundRow === -1 && leadId) {
        var lastRow = sheet.getLastRow();
        if (lastRow > 1) {
          var ids = sheet.getRange(2, 9, lastRow - 1, 1).getValues();
          for (var i = 0; i < ids.length; i++) {
            if (String(ids[i][0]) === String(leadId)) {
              foundRow = i + 2;
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
          leads.push({
            id: row[8] ? String(row[8]) : "row-" + (i + 2),
            name: row[1] ? String(row[1]) : "",
            email: "lead-" + i + "@nomail.local",
            phone: row[2] ? String(row[2]) : "",
            concern: row[5] ? String(row[5]) : null,
            source: JSON.stringify({
              page: row[7] || "advertorial-alphamen",
              age: Number(row[3]) || null,
              city: row[4] ? String(row[4]) : null,
              bestTime: row[6] ? String(row[6]) : null,
              herbstrixOrderId: row[9] ? String(row[9]) : null,
              herbstrixStatus: row[10] ? String(row[10]) : null
            }),
            created_at: new Date().toISOString()
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
  } finally {
    lock.releaseLock();
  }
}
